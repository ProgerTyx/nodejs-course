const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./common/logger');

const exit = process.exit;

async function start() {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    logger.error('MongoDB connection error');
    exit(1);
  }
}

start();

process.on('uncaughtException', () => {
  logger.error("[Error inside 'uncaughtException' event]");
  exit(1);
});

process.on('unhandledRejection', () => {
  logger.error("[Error inside 'unhandledRejection' event]");
  exit(1);
});
