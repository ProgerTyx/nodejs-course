const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const handleError = require('./middleware/error-handler-middleware');
const loggerMiddleware = require('./middleware/logger-middleware');
const authorizationChecker = require('./middleware/authorizationChecker');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', authorizationChecker, userRouter);
app.use('/boards', authorizationChecker, boardRouter);
app.use('/boards/:id/tasks', authorizationChecker, taskRouter);

// app.use(loggerMiddleware);
app.use(handleError);

module.exports = app;
