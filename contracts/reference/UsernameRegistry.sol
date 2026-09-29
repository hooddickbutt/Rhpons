// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title VireUsernameRegistry
/// @notice Maps a lowercase name to one address. NOT AUDITED. NOT DEPLOYED.
/// A registered name is not identity verification.
contract VireUsernameRegistry {
    mapping(string => address) public resolve;
    mapping(address => string) public nameOf;

    event NameSet(address indexed user, string name);
    event NameCleared(address indexed user, string name);

    error InvalidName();
    error NameTaken();

    function setName(string calldata name) external {
        bytes memory raw = bytes(name);
        if (raw.length < 3 || raw.length > 20) revert InvalidName();
        for (uint256 i = 0; i < raw.length; i++) {
            bytes1 char = raw[i];
            bool ok = (char >= 0x30 && char <= 0x39) || (char >= 0x61 && char <= 0x7a) || char == 0x5f;
            if (!ok) revert InvalidName();
        }
        address current = resolve[name];
        if (current != address(0) && current != msg.sender) revert NameTaken();

        string memory previous = nameOf[msg.sender];
        if (bytes(previous).length != 0) {
            delete resolve[previous];
            emit NameCleared(msg.sender, previous);
        }
        resolve[name] = msg.sender;
        nameOf[msg.sender] = name;
        emit NameSet(msg.sender, name);
    }
}
