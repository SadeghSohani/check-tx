import log4js from 'log4js';

const logger = log4js.getLogger('BasicNetwork');
logger.level = 'debug';

function info(message){
    logger.info(message);
}

function debug(message){
    logger.debug(message);
}

function warn(message){
    logger.warn(message);
}

function error(message){
    logger.error(message);
}

const log = {
    info: info,
    debug: debug,
    warn: warn,
    error: error
}

export default log;