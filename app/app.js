import dotenv from 'dotenv';
import log from '#root/utils/logger.util';
import express from 'express';
import bodyParser from 'body-parser';
import { expressjwt as expressJWT } from 'express-jwt';
import jwt from 'jsonwebtoken';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import util from 'util';
import authRouter from '#root/routes/authentication.router';
import txRouter from '#root/routes/transaction.router';
import userRouter from '#root/routes/user.router';
import response from '#root/utils/response.util';

dotenv.config();
const secret = process.env.JWT_SECRET || 'thisismysecret';
const app = express(); 

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('secret', secret);
app.use(expressJWT({ 
    secret: secret, 
    algorithms: ['HS256']
}).unless({path: [/^\/auth\/.*/]}));
app.use(bearerToken());
app.use((req, res, next) => {
    log.debug(`New req for ${req.originalUrl}`);
    if (
            req.originalUrl.indexOf('/auth') >= 0
        ) {
        return next();
    }
    const token = req.token;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            log.error(err);
            res.json(response.failure(
                403,
                "Jwt Authentication failed.",
                'Failed to authenticate token. Make sure to include the ' +
                'token returned from /auth call in the authorization header ' +
                'as a Bearer token'
            ));

        } else {
            req.email = decoded.email;
            log.debug(util.format('Decoded from JWT token: username(email) - %s.', decoded.email));
            return next();
        }
    });
});
app.use('/auth', authRouter);
app.use('/tx', txRouter);
app.use('/user', userRouter);

export default app;
