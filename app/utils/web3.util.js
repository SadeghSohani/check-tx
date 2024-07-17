import Web3 from 'web3';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const web3_provider = process.env.WEB3_PROVIDER || '';
const be_key = process.env.BE_KEY || ''

var web3 = new Web3(
    new Web3.providers.WebsocketProvider(web3_provider)
);   

export async function fetchTxDataFromWeb3(tx_hash) {
    var receipt = null;
    const tx = await web3.eth.getTransaction(tx_hash)
    if (tx.blockNumber) {
        receipt = await web3.eth.getTransactionReceipt(tx_hash)
    }
    return {
        transaction: tx,
        transactionReceipt: receipt,
        tx_summery: await getTxSummery(tx, receipt)
    };
}

export async function fetchTxDataFromBE(tx_hash) {
    var receipt = null;
    const res = await axios.get('https://api.etherscan.io/api', {
        params: {
            module: "proxy",
            action: "eth_getTransactionByHash",
            txhash: tx_hash,
            apikey: be_key
        }
    });
    const tx = res.data.result;
    if (tx.blockNumber) {
        const req_res = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: "proxy",
                action: "eth_getTransactionReceipt",
                txhash: tx_hash,
                apikey: be_key
            }
        });
        receipt = req_res.data.result;
    }
    return {
        transaction: tx,
        transactionReceipt: receipt,
        tx_summery: await getTxSummery(tx, receipt)
    };
}

async function getTxSummery(tx, receipt) {
    var tx_summery = {
        tx_hash: tx.hash,
        from: null,
        to: null,
        type: null,
        token: null,
        value: null,
        value_in_usdt: null,
        status: null
    };
    if (tx == null && receipt == null) {
        tx_summery.status = "NotFound";
    } else if (tx != null && receipt == null) {
        tx_summery.status = "Pending";
    } else {
        if (receipt.logs && receipt.logs.length === 1) {
            const decoded = parseInt(web3.eth.abi.decodeParameter("uint256", receipt.logs[0].data));
            const eth = web3.utils.fromWei(decoded, 'ether');
            var token = "TOKEN";
            if (receipt.logs[0].address === "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39") {
                token = "HEX"
            };
            tx_summery.from = receipt.logs[0].topics[1];
            tx_summery.to = receipt.logs[0].topics[2];
            tx_summery.type = "Transfer";
            tx_summery.token = token;
            tx_summery.value = eth;
        } else if (receipt.logs && receipt.logs.length > 1) {
            var token = "TOKEN";
            if (receipt.logs[0].address === "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39") {
                token = "HEX"
            };
            tx_summery.from = tx.from;
            tx_summery.to = tx.to;
            tx_summery.type = "SmartContractOperation";
            tx_summery.token = token;
            tx_summery.value = null;
        } else if (tx.value && tx.value != 0) {
            console.log(tx.value);
            var eth = web3.utils.fromWei(tx.value, 'ether');
            var token = "ETH";
            tx_summery.from = tx.from;
            tx_summery.to = tx.to;
            tx_summery.type = "Transfer";
            tx_summery.token = token;
            tx_summery.value = eth;
            tx_summery.value_in_usdt = await ethInUsdt(eth);
        }
        tx_summery.status = "Successful";
        tx_summery.date = await getDateOfTx(tx.blockNumber);;
        tx_summery.txFee = Number(receipt.gasUsed)*parseFloat(web3.utils.fromWei(tx.gasPrice, 'ether'))
    }
    return tx_summery;
}

async function ethInUsdt(eth) {
    const res = await axios.get('https://api.etherscan.io/api', {
        params: {
            module: "stats",
            action: "ethprice",
            apikey: be_key
        }
    });
    const ethPrice = res.data.result.ethusd;
    if (ethPrice) {
        return ethPrice*eth;
    } else {
        return null;
    }
}

async function getDateOfTx(blockNumber) {
    const res = await axios.get('https://api.etherscan.io/api', {
        params: {
            module: "block",
            action: "getblockreward",
            blockno: Number(blockNumber),
            apikey: be_key 
        }
    });
    const tx = res.data.result;
    var date = "";
    if (tx.timeStamp) {
        date = Date(tx.timeStamp);
    }
    return date;
}