const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = 4000;
const listRouter = require('./router/list');
// const { addHook } = require('dompurify');

app.use('/list', listRouter);

app.get('/', (req, res) => {
  res.status(200).send('to-do-list-server');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
})

const server = app.listen(port, () => {
  console.log(`[RUN] to do list server... | http://localhost:${port}`);
});

module.exports.app = app;
module.exports.server = server;
