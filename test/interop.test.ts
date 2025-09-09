import * as zksync from 'zksync-ethers';

// Import the Mailman ABI
import MailmanABI from '../out/Mailman.sol/Mailman.json';

// Mailman contract addresses on Era and Abstract testnets
// https://sepolia.explorer.zksync.io/address/0xaf1E4adf15767F0C556BD414628Ff22f08cf8C68
// https://explorer.testnet.abs.xyz/address/0xaf1E4adf15767F0C556BD414628Ff22f08cf8C68
const MAILMAN_ADDRESS = '0xaf1E4adf15767F0C556BD414628Ff22f08cf8C68';
const ERA_CHAIN_ID = 300;
const ABS_CHAIN_ID = 11124;

// Tx hashes of the messages sent
// https://sepolia.explorer.zksync.io/tx/0x600c0495531b763a95892aa8df5183f582309944aebc55cebfb182df54a51041#overview
const ERA_TO_ABS_TX_HASH = '0x600c0495531b763a95892aa8df5183f582309944aebc55cebfb182df54a51041';
// https://explorer.testnet.abs.xyz/tx/0x221a31b4ad823b61b2f07f61c725c7eeea728c25030bab6a38809de362ba488e#overview
const ABS_TO_ERA_TX_HASH = '0x221a31b4ad823b61b2f07f61c725c7eeea728c25030bab6a38809de362ba488e';

// Vitalik hates this trick: DO use this in production!
const PRIVATE_KEY = '0x00000000000000000000000000000000000000000000000000000000feed5eed';

describe('Integration', () => {
    let alice_era: zksync.Wallet;
    let alice_abstract: zksync.Wallet;
    let mailman_era: zksync.Contract;
    let mailman_abstract: zksync.Contract;

    beforeAll(async () => {
        const era_provider = new zksync.Provider(
            'https://sepolia.era.zksync.dev',
            undefined,
        );
        const abstract_provider = new zksync.Provider(
            'https://api.testnet.abs.xyz',
            undefined,
        );

        alice_era = new zksync.Wallet(PRIVATE_KEY, era_provider);
        alice_abstract = new zksync.Wallet(PRIVATE_KEY, abstract_provider);

        mailman_era = new zksync.Contract(
            MAILMAN_ADDRESS,
            MailmanABI.abi,
            era_provider,
        );
        mailman_abstract = new zksync.Contract(
            MAILMAN_ADDRESS,
            MailmanABI.abi,
            abstract_provider,
        );
    });

    it('should validate the message sent by Era from Abstract', async () => {
        const params = await alice_era.getFinalizeWithdrawalParams(ERA_TO_ABS_TX_HASH, undefined, "proof_based_gw");

        const included = await mailman_abstract.verifyMessage(
            ERA_CHAIN_ID,
            params.l1BatchNumber,
            params.l2MessageIndex,
            { txNumberInBatch: params.l2TxNumberInBlock, sender: params.sender, data: params.message },
            params.proof
        );
        expect(included).toBe(true);
    });

    it('should validate the message sent by Abstract from Era', async () => {
        const params = await alice_abstract.getFinalizeWithdrawalParams(ABS_TO_ERA_TX_HASH, undefined, "proof_based_gw");

        const included = await mailman_era.verifyMessage(
            ABS_CHAIN_ID,
            params.l1BatchNumber,
            params.l2MessageIndex,
            { txNumberInBatch: params.l2TxNumberInBlock, sender: params.sender, data: params.message },
            params.proof
        );
        expect(included).toBe(true);
    });
});
