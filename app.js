const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());

const userRouter = require('./routers/userRouter');
const passwordRouter = require('./routers/passwordRouter');

const {log} = require('./middlewares/log');

app.use('/users', userRouter);
app.use('/passwords', passwordRouter);

app.get('/', log, (req, res) => {
    res.send({message: 'ok'});
});

app.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
});
