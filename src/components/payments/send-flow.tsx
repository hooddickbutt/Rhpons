"use client";

import { useEffect, useMemo, useState } from "react";
import { erc20Abi, parseEther, parseUnits } from "viem";
import {
  useAccount,
  useEstimateFeesPerGas,
  useEstimateGas,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { StatusPill } from "@/components/ui/status-pill";
import { SuccessMark, TxStages, type TxState } from "@/components/payments/tx-stages";
import { useSession } from "@/components/session/session-provider";
import { assetById, getAssets, type AssetId } from "@/lib/assets";
import { publicConfig } from "@/lib/config";
import { explorerFor } from "@/lib/config";
import { formatUnits, isPositiveDecimal, shortAddress } from "@/lib/format";
import { previewProfiles } from "@/lib/preview";
import { buildPaymentPath, resolveRecipient } from "@/lib/payments";

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function safeParseEther(value: string) {
  try {
    return parseEther(value);
  } catch {
    return undefined;
  }
}

export function SendFlow({
  initialTo = "",
  initialAmount = "",
  initialAsset = "eth",
  initialNote = "",
}: {
  initialTo?: string;
  initialAmount?: string;
  initialAsset?: string;
  initialNote?: string;
}) {
  const assets = getAssets();
  const [step, setStep] = useState(initialTo && initialAmount ? 3 : initialTo ? 1 : 0);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState(initialAmount);
  const [assetId, setAssetId] = useState<AssetId>(assetById(initialAsset).id);
  const [note, setNote] = useState(initialNote);
  const [broadcast, setBroadcast] = useState(false);
  const [txState, setTxState] = useState<TxState>("preparing");
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [failure, setFailure] = useState("");
  const [saved, setSaved] = useState(false);
  const { addRecord } = useSession();
  const { address, isConnected, chainId } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const asset = assetById(assetId);
  const recipient = resolveRecipient(to);
  const amountOk = isPositiveDecimal(amount);
  const targetChain = publicConfig.chainId;
  const canBroadcast =
    broadcast &&
    isConnected &&
    recipient.payable &&
    recipient.address &&
    amountOk &&
    (asset.native || asset.configured);

  const value = asset.native && amountOk ? safeParseEther(amount) : undefined;
  const { data: gas } = useEstimateGas({
    to: recipient.payable && recipient.address ? recipient.address : undefined,
    value,
    query: { enabled: Boolean(isConnected && value && recipient.payable) },
  });
  const { data: fees } = useEstimateFeesPerGas({
    chainId: targetChain,
    query: { enabled: Boolean(isConnected && value) },
  });
  const estimatedFee =
    gas && fees?.maxFeePerGas ? formatUnits(gas * fees.maxFeePerGas, 18, 6) : null;

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  useEffect(() => {
    if (!hash || saved) return;
    if (!receipt.isSuccess && !receipt.isError) return;
    const timer = window.setTimeout(() => {
      if (receipt.isSuccess) {
        setTxState("confirmed");
        addRecord({
          id: hash,
          kind: "payment",
          title: "Payment sent",
          amount,
          asset: asset.symbol,
          counterparty: recipient.name,
          status: "confirmed",
          simulated: false,
          hash,
          createdAt: new Date().toISOString(),
          filter: "payments",
        });
        setSaved(true);
      } else {
        setTxState("failed");
        setFailure("The network did not confirm this transaction.");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [addRecord, amount, asset.symbol, hash, receipt.isError, receipt.isSuccess, recipient.name, saved]);

  const origin = typeof window === "undefined" ? publicConfig.appUrl : window.location.origin;
  const sharePath =
    recipient.handle && recipient.kind !== "unknown"
      ? buildPaymentPath({
          handle: recipient.kind === "address" ? recipient.address : recipient.handle,
          amount,
          asset: asset.id,
          note,
        })
      : "";

  const steps = ["Recipient", "Amount", "Note", "Review"];
  const reviewReady = recipient.kind !== "unknown" && amountOk;

  async function simulate() {
    setFailure("");
    setHash(undefined);
    setSaved(false);
    const sequence: TxState[] = [
      "preparing",
      "awaiting_wallet",
      "submitting",
      "pending",
      "confirmed",
    ];
    for (const state of sequence) {
      setTxState(state);
      await wait(state === "pending" ? 800 : 420);
    }
    addRecord({
      id: crypto.randomUUID(),
      kind: "payment",
      title: "Payment sent",
      amount,
      asset: asset.symbol,
      counterparty: recipient.name,
      status: "confirmed",
      simulated: true,
      createdAt: new Date().toISOString(),
      filter: "payments",
    });
    setSaved(true);
  }

  async function confirm() {
    setStep(4);
    if (!canBroadcast || !recipient.address) {
      await simulate();
      return;
    }
    try {
      setFailure("");
      setTxState("preparing");
      setTxState("awaiting_wallet");
      if (chainId !== targetChain) {
        await switchChainAsync({ chainId: targetChain });
      }
      setTxState("submitting");
      const nextHash = asset.native
        ? await sendTransactionAsync({
            to: recipient.address,
            value: parseEther(amount),
            chainId: targetChain,
          })
        : await writeContractAsync({
            address: asset.address as `0x${string}`,
            abi: erc20Abi,
            functionName: "transfer",
            args: [recipient.address, parseUnits(amount, asset.decimals)],
            chainId: targetChain,
          });
      setHash(nextHash);
      setTxState("pending");
    } catch (error) {
      setTxState("failed");
      setFailure(
        error instanceof Error
          ? error.message
          : "The wallet did not confirm this transaction.",
      );
      addRecord({
        id: crypto.randomUUID(),
        kind: "payment",
        title: "Payment failed",
        amount,
        asset: asset.symbol,
        counterparty: recipient.name,
        status: "failed",
        simulated: false,
        createdAt: new Date().toISOString(),
        filter: "payments",
      });
    }
  }

  const explorer = hash ? `${explorerFor(targetChain)}/tx/${hash}` : "";
  const done = txState === "confirmed" && step === 4;

  const summary = useMemo(
    () => [
      ["To", recipient.kind === "unknown" ? "—" : recipient.preview ? `@${recipient.handle}` : shortAddress(recipient.address)],
      ["Amount", amountOk ? `${amount} ${asset.symbol}` : "—"],
      ["Network", targetChain === 46630 ? "Robinhood Chain Testnet" : "Robinhood Chain"],
      ["Note", note || "None"],
    ],
    [amount, amountOk, asset.symbol, note, recipient, targetChain],
  );

  if (step === 4) {
    return (
      <section className="surface mx-auto max-w-xl p-6 md:p-8">
        {done ? (
          <div className="text-center">
            <div className="mx-auto w-fit">
              <SuccessMark />
            </div>
            <h1 className="serif mt-4 text-4xl">Payment sent</h1>
            <p className="mt-2 text-lg">
              {amount} {asset.symbol}
            </p>
            <p className="text-muted">to {recipient.preview ? `@${recipient.handle}` : recipient.name}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted">Transaction</p>
            <h1 className="serif mt-1 text-4xl">
              {txState === "failed" ? "Not completed" : "Sending"}
            </h1>
            <div className="mt-6">
              <TxStages state={txState} />
            </div>
          </>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {canBroadcast ? <StatusPill>Live</StatusPill> : <StatusPill>Demo</StatusPill>}
          {!canBroadcast ? (
            <p className="w-full text-sm leading-6 text-muted">
              Simulation. Nothing was broadcast to Robinhood Chain.
            </p>
          ) : null}
        </div>
        {failure ? (
          <p className="mt-4 text-sm leading-6 text-danger" role="alert">
            {failure}
          </p>
        ) : null}
        {hash ? (
          <div className="mt-5 rounded-2xl bg-sunken p-4">
            <p className="text-xs uppercase tracking-wide text-faint">Transaction hash</p>
            <p className="mt-2 break-all font-mono text-sm">{hash}</p>
            <a className="mt-3 inline-flex text-sm underline" href={explorer} target="_blank" rel="noreferrer">
              View on explorer
            </a>
          </div>
        ) : done ? (
          <p className="mt-5 text-sm text-muted">No transaction hash. This was a simulation.</p>
        ) : null}
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => {
            setStep(0);
            setTxState("preparing");
            setHash(undefined);
            setFailure("");
            setSaved(false);
          }}
        >
          New payment
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Step {step + 1} of {steps.length}
          </p>
          <StatusPill>{canBroadcast ? "Live" : "Demo"}</StatusPill>
        </div>
        <h1 className="serif mt-3 text-4xl md:text-5xl">{steps[step]}</h1>
        {step === 0 ? (
          <div className="mt-6 space-y-4">
            <Field label="Recipient" hint="@name or 0x address">
              <TextInput
                value={to}
                onChange={(event) => setTo(event.target.value)}
                placeholder="@alex or 0x…"
                autoComplete="off"
              />
            </Field>
            <div className="flex flex-wrap gap-2">
              {previewProfiles.map((profile) => (
                <button
                  key={profile.handle}
                  type="button"
                  onClick={() => setTo(`@${profile.handle}`)}
                  className="rounded-full border border-line px-3 py-1.5 text-sm hover:bg-sunken"
                >
                  @{profile.handle}
                </button>
              ))}
            </div>
            {to && recipient.kind === "unknown" ? (
              <p className="text-sm text-danger" role="alert">
                That name is not in the preview directory and is not a wallet address.
              </p>
            ) : null}
            {recipient.preview ? (
              <p className="text-sm leading-6 text-muted">
                @{recipient.handle} is an example profile. You can simulate a payment. A real
                transfer requires a wallet address.
              </p>
            ) : null}
          </div>
        ) : null}
        {step === 1 ? (
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="sr-only">Amount</span>
              <input
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                className="serif w-full bg-transparent text-6xl outline-none placeholder:text-faint"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {assets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAssetId(item.id)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    item.id === assetId ? "bg-primary text-primary-fg" : "border border-line"
                  }`}
                >
                  {item.symbol}
                  {item.configured ? "" : " · not configured"}
                </button>
              ))}
            </div>
            {!asset.native && !asset.configured ? (
              <p className="text-sm leading-6 text-muted">
                {asset.symbol} has no contract address in this environment, so it can only be used
                in a simulation.
              </p>
            ) : null}
            {amount && !amountOk ? (
              <p className="text-sm text-danger" role="alert">
                Enter an amount greater than zero.
              </p>
            ) : null}
          </div>
        ) : null}
        {step === 2 ? (
          <div className="mt-6">
            <Field label="Note" hint="Optional, stored in the payment link">
              <TextArea
                value={note}
                maxLength={140}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Dinner, invoice, thank you"
              />
            </Field>
          </div>
        ) : null}
        {step === 3 ? (
          <div className="mt-6 space-y-4">
            <dl className="space-y-3">
              {summary.map(([label, valueText]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="text-right text-sm">{valueText}</dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4">
                <dt className="text-sm text-muted">Network fee</dt>
                <dd className="text-right text-sm">
                  {estimatedFee ? (
                    <>
                      <StatusPill>Estimated</StatusPill>
                      <span className="mt-1 block">{estimatedFee} ETH</span>
                    </>
                  ) : (
                    "Shown in your wallet before you sign"
                  )}
                </dd>
              </div>
            </dl>
            <p className="text-sm leading-6 text-muted">
              Estimated values can change before a transaction is confirmed. A confirmed result is
              the receipt on Robinhood Chain.
            </p>
            <label className="flex items-start gap-3 rounded-2xl bg-sunken p-4 text-sm leading-6">
              <input
                type="checkbox"
                className="mt-1"
                checked={broadcast}
                disabled={!recipient.payable || (!asset.native && !asset.configured)}
                onChange={(event) => setBroadcast(event.target.checked)}
              />
              <span>
                Broadcast a real transfer from my wallet. Vire does not receive the funds. Leave
                this off to run a simulation.
                {address ? ` Connected as ${shortAddress(address)}.` : " Connect a wallet first."}
              </span>
            </label>
          </div>
        ) : null}
        <div className="mt-8 flex gap-2">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((valueStep) => valueStep - 1)}>
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              onClick={() => setStep((valueStep) => valueStep + 1)}
              disabled={(step === 0 && recipient.kind === "unknown") || (step === 1 && !amountOk) || (step === 0 && !to)}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={confirm} disabled={!reviewReady}>
              {broadcast ? "Confirm transaction" : "Simulate payment"}
            </Button>
          )}
        </div>
      </div>
      <aside className="surface-flat p-6">
        <p className="text-sm text-muted">Payment link</p>
        <p className="mt-2 break-all font-mono text-sm">
          {sharePath ? `pay/vire/${sharePath.split("/").pop()}` : "pay/vire/name"}
        </p>
        <div className="mt-5 grid place-items-center rounded-3xl bg-white p-4">
          <QRCodeSVG
            value={sharePath ? `${origin}${sharePath}` : publicConfig.appUrl}
            size={180}
            bgColor="#ffffff"
            fgColor="#16181d"
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          The link carries the recipient, amount, asset, and note. It does not move funds by
          itself.
        </p>
      </aside>
    </section>
  );
}
