const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', () => {
  const exit = process.exit;
  logger.error("[Error inside 'uncaughtException' event]");
  exit(1);
});

process.on('unhandledRejection', () => {
  const exit = process.exit;
  logger.error("[Error inside 'unhandledRejection' event]");
  exit(1);
});
