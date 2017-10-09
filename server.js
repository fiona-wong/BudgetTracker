const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/client'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const SynapsePay = require('synapsepay');
const Clients = SynapsePay.Clients;
const Helpers = SynapsePay.Helpers;

const client = new Clients(
  // client id should be stored as an environment variable
  process.env.CLIENT_ID,
  // client secret should be stored as an environment variable
  process.env.CLIENT_SECRET,
  // is_production boolean determines sandbox or production endpoints used
  false
);

let user;
let savingNode;
let transaction;

app.post('/createuser', (req, res) => {
  const Users = SynapsePay.Users;
  const createPayload = {
    logins: [
      {
        email: req.body.email,
        password: req.body.password,
        read_only: false
      }
    ],
    phone_numbers: [
      req.body.phone
    ],
    legal_names: [
      req.body.name
    ],
    extra: {
      note: req.body.name,
      is_business: false
    }
  };

  Users.create(
    client,
    process.env.FINGERPRINT,
    Helpers.getUserIP(),
    createPayload,
    function(err, userResponse) {
      user = userResponse;
      if (err) {
        res.sendStatus(400);
      }
      res.sendStatus(200);
    }
  );

})

app.post('/createnode', (req, res) => {
  const Nodes = SynapsePay.Nodes;
  const savingPayload = {
    type: 'ACH-US',
    info: {
      nickname: 'Saving Account',
      name_on_account: req.body.name,
      account_num: req.body.savingAcc,
      routing_num: req.body.savingRou,
      type: 'PERSONAL',
      class: 'SAVINGS'
    }
  };

  Nodes.create(
    user,
    savingPayload,
    function(err, nodesResponse) {
      // error or node object
      // node will only have RECEIVE permission until verified with micro-deposit
      savingNode = nodesResponse;
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.post('/createtransaction', (req, res) => {
  const Transactions = SynapsePay.Transactions;
  const createPay = {
    to: {
      type: 'PERSONAL',
      id: savingNode[0].json._id
    },
    amount: {
      amount: Number(req.body.amount),
      currency: 'USD'
    },
    extra: {
      ip: Helpers.getUserIP()
    }
  };
  Transactions.create(
    savingNode[0],
    createPay,
    function(err, transactionResp) {
      // error or transaction object
      transaction = transactionResp;
      if (!err) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  );
});

let PORT = process.env.PORT || 3000


const server = app.listen(PORT, function() {
  console.log(`Example app listening at ${PORT}`);
});
