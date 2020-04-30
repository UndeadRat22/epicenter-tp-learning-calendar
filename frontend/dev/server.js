/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const session = require('express-session');
const renderVM = require('./vm');

const app = express();

// Register an express middleware. Learn more: http://expressjs.com/en/guide/using-middleware.html.
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use('/', (req, res) => {
  const html = renderVM();
  res.send(html);
});

app.listen(process.env.PORT, () => {
  console.info(`Frontend server is running on port ${process.env.PORT}`);
});
