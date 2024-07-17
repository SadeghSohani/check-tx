import dotenv from 'dotenv';
import app from '#root/app';
import http from 'http';
import log from '#root/utils/logger.util';

dotenv.config();
const port = process.env.PORT || 3001;
const host = process.env.HOST || '127.0.0.1';

const server = http.createServer(app).listen(port, function () {
    log.info('****************** SERVER STARTED ************************');
    log.info(`***************  http://${host}:${port}  ******************`);
});
server.timeout = 240000;