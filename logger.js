import winston from 'winston';
import { format } from 'logform';

const consoleLevel = 'debug';

const generalLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
    debug: 'white',
  },
};

// log to file everything over level
const logger = winston.createLogger({
  level: 'debug',
  levels: generalLevels.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/error.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/warn.log',
      level: 'warn',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/info.log',
      level: 'info',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/verbose.log',
      level: 'verbose',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/debug.log',
      level: 'debug',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.File({
      timestamp: true,
      colorize: true,
      filename: './logs/combined.log',
      handleExceptions: true,
      json: true,
      maxsize: 52428800,
      maxFiles: 10,
    }),
    new winston.transports.Console({
      level: consoleLevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
  ],
});

export const stream = {
  write(message, encoding) {
    logger.info(`${message}, ${encoding}`);
  },
};

export default logger;
