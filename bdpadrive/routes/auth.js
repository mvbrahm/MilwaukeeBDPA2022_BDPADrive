var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');

// this gets executed whenever localhost:3000/auth is opened
router.get('/', function (req, res, next) {
  res.render('auth', { title: 'Authorization' });
});

const user = 'MKEbdpa';

// this gets executed whenever localhost:3000/auth/AddNodes is opened
router.post('/login', async (req,res,next)=>{
  let username = req.body.uname;
	let password = req.body.psw;
  const fetch = require('node-fetch');
  // enter MKEbdpa as the username and the long key below as the password for a condition that works
  let myURL = apiParameters.baseurl + "users/" + username + "/auth";
  const result = await fetch(myURL, {
    method: 'POST',
    headers: apiParameters.headers,
    body: JSON.stringify({
      key: password
      // key: 'd26239edf0b83471083525fd35ecf34157c2b3e5a2b305116d3269775c0d48e1cd3e8f6128e4cf787b6614770bba021ec92d9b01134b984bbf43a25525b0b272'
    })
  });
  console.log(await result.json());
  console.log('username = ', username, ", password = ", password)
});

module.exports = router;