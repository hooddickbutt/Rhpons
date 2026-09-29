// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

/// @title VirePaymentRouter
/// @notice Reference router for direct payments. NOT AUDITED. NOT DEPLOYED.
contract VirePaymentRouter {
    address public owner;
    address public feeRecipient;
    uint16 public feeBps;
    uint16 public constant MAX_FEE_BPS = 100;
    uint256 private locked;

    event PaymentSent(
        address indexed from,
        address indexed to,
        address indexed token,
        uint256 amount,
        uint256 fee,
        bytes32 requestId,
        string note
    );
    event PaymentReceived(address indexed to, address indexed from, uint256 amount, bytes32 requestId);
    event PaymentRequested(address indexed by, bytes32 indexed requestId, address token, uint256 amount, string note);
    event MerchantRegistered(address indexed merchant, string name);

    error NotOwner();
    error FeeTooHigh();
    error ZeroAddress();
    error TransferFailed();
    error Reentered();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier nonReentrant() {
        if (locked == 1) revert Reentered();
        locked = 1;
        _;
        locked = 0;
    }

    constructor(address feeRecipient_) {
        owner = msg.sender;
        feeRecipient = feeRecipient_;
    }

    function setFee(address recipient, uint16 bps) external onlyOwner {
        if (bps > MAX_FEE_BPS) revert FeeTooHigh();
        if (bps != 0 && recipient == address(0)) revert ZeroAddress();
        feeRecipient = recipient;
        feeBps = bps;
    }

    function registerMerchant(string calldata name) external {
        emit MerchantRegistered(msg.sender, name);
    }

    function request(address token, uint256 amount, string calldata note) external returns (bytes32 requestId) {
        requestId = keccak256(abi.encode(msg.sender, token, amount, note, block.timestamp));
        emit PaymentRequested(msg.sender, requestId, token, amount, note);
    }

    function payEth(address to, bytes32 requestId, string calldata note) external payable nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        uint256 fee = (msg.value * feeBps) / 10_000;
        uint256 payout = msg.value - fee;
        _send(to, payout);
        if (fee > 0) _send(feeRecipient, fee);
        emit PaymentSent(msg.sender, to, address(0), msg.value, fee, requestId, note);
        emit PaymentReceived(to, msg.sender, payout, requestId);
    }

    function payToken(
        address token,
        address to,
        uint256 amount,
        bytes32 requestId,
        string calldata note
    ) external nonReentrant {
        if (to == address(0) || token == address(0)) revert ZeroAddress();
        uint256 fee = (amount * feeBps) / 10_000;
        _pull(token, msg.sender, to, amount - fee);
        if (fee > 0) _pull(token, msg.sender, feeRecipient, fee);
        emit PaymentSent(msg.sender, to, token, amount, fee, requestId, note);
        emit PaymentReceived(to, msg.sender, amount - fee, requestId);
    }

    function _send(address to, uint256 amount) internal {
        (bool ok, ) = to.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }

    function _pull(address token, address from, address to, uint256 amount) internal {
        bool ok = IERC20(token).transferFrom(from, to, amount);
        if (!ok) revert TransferFailed();
    }
}
