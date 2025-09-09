// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {
    L2_TO_L1_MESSENGER_SYSTEM_CONTRACT,
    L2_MESSAGE_VERIFICATION
} from "lib/era-contracts/l1-contracts/contracts/common/l2-helpers/L2ContractAddresses.sol";
import {L2Message} from "lib/era-contracts/l1-contracts/contracts/common/Messaging.sol";

contract Mailman {
    function sendMessage(string memory message) external {
        bytes32 messageHash = keccak256(abi.encode(message));
        L2_TO_L1_MESSENGER_SYSTEM_CONTRACT.sendToL1(abi.encode(messageHash));
    }

    function verifyMessage(
        uint256 senderChainId,
        uint256 batchNumber,
        uint256 index,
        L2Message calldata message,
        bytes32[] memory proof
    ) external view returns (bool) {
        return L2_MESSAGE_VERIFICATION.proveL2MessageInclusionShared(senderChainId, batchNumber, index, message, proof);
    }
}
