const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// public 폴더의 파일들을 root에서 접근 가능하도록
app.use('/', express.static(path.join(__dirname, 'public')));

const port = 4000;
const listRouter = require('./router/list');
// const { addHook } = require('dompurify');

app.use('/list', listRouter);

// 이게 가로채고 있음
// app.get('/', (req, res) => {
//   res.status(200).send('to-do-list-server');
// });
console.log(path.join(__dirname, "./public", "index.html"))

// * => 모든 요청 -> 맨 밑에 놔두는 게 맞다. -> 어떤 요청이든 여기로 오기 때문에
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

const server = app.listen(port, () => {
  console.log(`[RUN] to do list server... | http://localhost:${port}`);
});

module.exports.app = app;
module.exports.server = server;
