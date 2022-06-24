var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');

// this gets executed whenever localhost:3000/apitest is opened
router.get('/', function (req, res, next) {
  res.render('apitest', { title: 'API Test', nodeData: null });
});

const user = 'MKEbdpa';

// this gets executed whenever localhost:3000/apitest/ListNodes is opened
router.get('/ListNodes', async (req,res,next) => {
  const fetch = require('node-fetch');
  let myURL = apiParameters.baseurl + "filesystem/" + user + "/search?";
  const result = await fetch(myURL, {
    method: 'GET',
    headers: apiParameters.headers
  });
  const responseData = await result.json();
  console.log(responseData);
  res.render('apitest', { title: 'API Test', nodeData: responseData.nodes});
});


module.exports = router;