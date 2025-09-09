# Validating v29 Interop Features

To validate interop features on testnet, we deployed a simple messaging contract on both [Era testnet](https://sepolia.explorer.zksync.io/address/0xaf1E4adf15767F0C556BD414628Ff22f08cf8C68#contract#contract-info) and [Abstract testnet](https://explorer.testnet.abs.xyz/address/0xaf1E4adf15767F0C556BD414628Ff22f08cf8C68#contract#contract-info). We then sent a message from each of them with the intention of validating it from the other ([Era -> Abstract](https://sepolia.explorer.zksync.io/tx/0x600c0495531b763a95892aa8df5183f582309944aebc55cebfb182df54a51041#overview), [Abstract -> Era](https://explorer.testnet.abs.xyz/tx/0x221a31b4ad823b61b2f07f61c725c7eeea728c25030bab6a38809de362ba488e#overview)). Only after each of the containing batches gets executed on Gateway can we validate interop features. 

The related parameters are defined inside [`interop.test.ts`](./test/interop.test.ts) file. To validate the interop features simply run:

```shell
yarn install
yarn test
```
