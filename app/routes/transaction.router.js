import { Router } from 'express';
import { fetchTransactionData, getTransactionsByUser, deleteTransactionHistory } from '#root/controllers/transaction.controller';

const txRouter = Router();

txRouter.post('/new', fetchTransactionData);
txRouter.get('/all', getTransactionsByUser);
txRouter.delete('/delete', deleteTransactionHistory);

export default txRouter;