import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  primary:
    "bg-primary text-primary-fg shadow-[0_14px_30px_rgba(18,16,12,0.18)] hover:-translate-y-0.5 hover:opacity-95",
  brass:
    "bg-[#e7c98a] text-[#1a140c] shadow-[0_14px_34px_rgba(180,140,70,0.35)] hover:-translate-y-0.5 hover:bg-[#f0d7a2]",
  inverse:
    "border border-white/30 bg-white/5 text-[#f7f1e6] hover:bg-white/10",
  secondary: "bg-elev text-fg border border-line hover:-translate-y-0.5 hover:bg-sunken",
  ghost: "bg-transparent text-fg hover:bg-sunken",
  danger: "bg-transparent text-danger border border-line hover:bg-sunken",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
} as const;

type Props = {
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-150 disabled:cursor-not-allowed disabled:opacity-45",
    styles[variant],
    sizes[size],
    className,
  );
  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
