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
}
