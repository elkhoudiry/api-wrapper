import dotenv from 'dotenv';
dotenv.config();

const getTimestamp = (): string => {
    return new Date().toISOString();
};
const mode = process.env.NODE_ENV;
const logging_modes = process.env.SHOW_LOGGING_MODES?.split('|') ?? ['development'];
const showLog = mode && logging_modes.indexOf(mode) !== -1 ? true : false;

const info = (namespace: String, message: String, object?: any) => {
    if (showLog) console.info(`[${getTimestamp()}] [INFO] [${namespace}] ${message}`, object ? object : '');
};

const warn = (namespace: String, message: String, object?: any) => {
    if (showLog) console.warn(`[${getTimestamp()}] [WARN] [${namespace}] ${message}`, object ? object : '');
};

const error = (namespace: String, message: String, object?: any) => {
    if (showLog) console.error(`[${getTimestamp()}] [ERROR] [${namespace}] ${message}`, object ? object : '');
};

const debug = (namespace: String, message: String, object?: any) => {
    if (showLog) console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message}`, object ? object : '');
};

export default {
    info,
    warn,
    error,
    debug
};
