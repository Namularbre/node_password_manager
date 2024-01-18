const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const {log} = require('./middlewares/log');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());

if (process.env.ENV !== 'prod') {
    app.use(log);
}

const userRouter = require('./routers/userRouter');
const passwordRouter = require('./routers/passwordRouter');
const categoryRouter = require('./routers/categoryRouter');

app.use('/users', userRouter);
app.use('/passwords', passwordRouter);
app.use('/categories', categoryRouter);

app.get('/', log, (req, res) => {
    res.send({message: 'ok'});
});

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`listening on http://localhost:3000`);
});
