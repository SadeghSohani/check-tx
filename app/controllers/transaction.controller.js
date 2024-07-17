import Transaction from '#root/models/transaction.model';
import log from '#root/utils/logger.util';
import { fetchTxDataFromWeb3, fetchTxDataFromBE } from '#root/utils/web3.util';
import response from '#root/utils/response.util';

export async function fetchTransactionData(req, res) {
    const tx_hash = req.body.tx_hash;
    const email = req.email;
    const provider = req.body.provider;
    try {
        var result = null;
        if (provider === 0) {
            result = await fetchTxDataFromWeb3(tx_hash);
        } else if (provider === 1) {
            result = await fetchTxDataFromBE(tx_hash);
        }
        const tx = await Transaction.create({ 
            from: result.tx_summery.from,
            to: result.tx_summery.to,
            type: result.tx_summery.type,
            value: result.tx_summery.value,
            userEmail: email,
        });
        log.info(result)
        res.json(response.success("Transaction data retrieved successfully.", result.tx_summery));
    } catch (err) {
        log.error(err);
        res.json(response.failure(500, "Transaction retrieve failed.", err));
    }
}

export async function getTransactionsByUser(req, res) {
    try {
        const result = await Transaction.findAll({where: {userEmail: req.email}});
        res.json(response.success("Transaction data retrieved successfully.", result));
    } catch (err) {
        res.json(response.failure(500, "Something wrong.", err));
    }
}

export async function deleteTransactionHistory(req, res) {
    try {
        const result = await Transaction.destroy({where: {userEmail: req.email}});
        res.json(response.success("Transaction history deleted successfully.", result));
    } catch (err) {
        res.json(response.failure(500, "Something wrong.", err));
    }
}