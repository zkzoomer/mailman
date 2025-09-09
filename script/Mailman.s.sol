// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {L2Message} from "lib/era-contracts/l1-contracts/contracts/common/Messaging.sol";
import {Mailman} from "../src/Mailman.sol";

contract MailmanScript is Script {
    Mailman public mailman;

    function deploy() public {
        vm.startBroadcast();
        mailman = new Mailman();
        vm.stopBroadcast();
    }

    function sendMessage() public {
        vm.startBroadcast();
        mailman.sendMessage("Hello, world!");
        vm.stopBroadcast();
    }

    function verifyMessage(
        uint16 txNumberInBatch,
        address sender,
        string memory message,
        uint256 senderChainId,
        uint256 batchNumber,
        bytes32[] memory proof
    ) public {
        L2Message memory message = L2Message({
            txNumberInBatch: txNumberInBatch,
            sender: sender,
            data: abi.encode(keccak256(abi.encode(message)))
        });

        vm.startBroadcast();
        bool result = mailman.verifyMessage(senderChainId, batchNumber, 0, message, proof);
        console.log("Message verified:", result);
        vm.stopBroadcast();
    }
}
