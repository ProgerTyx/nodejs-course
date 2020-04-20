const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({ level: 'info', filename: 'info.log' }),
    new transports.File({ level: 'error', filename: 'error.log' })
  ]
});

module.exports = logger;
