import test from 'node:test';
import log from '#root/utils/logger.util';
import { fetchTxDataFromWeb3, fetchTxDataFromBE } from '#root/utils/web3.util';

test('Test 1 -> API: etherscan, TX type: eth transfer.', async (t) => {
    const result = await fetchTxDataFromBE('0xa7a1094af80821a7be134f6c1d40877163cd6e1f934b7c60c4fefb9fe3c1b56e');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});

test('Test 2 -> API: etherscan, TX type: smart contract operation.', async (t) => {
    const result = await fetchTxDataFromBE('0x0a6b1a20a942f6af03b0233ffc351d71ad4a48c6c01276e95c5c3e2b76b812d8');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});

test('Test 3 -> API: etherscan, TX type: token transfer.', async (t) => {
    const result = await fetchTxDataFromBE('0x304bc7b4c903e1762ac971ceb95845ea4bd2d7f72622d48a6424352f1c9aee97');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});

test('Test 4 -> API: alchemy, TX type: eth transfer.', async (t) => {
    const result = await fetchTxDataFromWeb3('0xa7a1094af80821a7be134f6c1d40877163cd6e1f934b7c60c4fefb9fe3c1b56e');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});

test('Test 5 -> API: alchemy, TX type: smart contract operation.', async (t) => {
    const result = await fetchTxDataFromWeb3('0x0a6b1a20a942f6af03b0233ffc351d71ad4a48c6c01276e95c5c3e2b76b812d8');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});

test('Test 6 -> API: alchemy, TX type: token transfer.', async (t) => {
    const result = await fetchTxDataFromWeb3('0x304bc7b4c903e1762ac971ceb95845ea4bd2d7f72622d48a6424352f1c9aee97');
    if (result.tx_summery.status !== 'Successful') {
        throw new Error("Transaction status is not successful.");
    } else {
        log.info(result.tx_summery);
    }
});