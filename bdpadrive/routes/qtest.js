var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');

// this gets executed whenever localhost:3000/qtest is opened
router.get('/', function (req, res, next) {
  res.render('qtest', { title: 'Q Test', questionData: null });
});

// this gets executed whenever localhost:3000/qtest/ListQuestions is opened
router.get('/ListQuestions', async (req,res,next) => {
  const baseurl = "https://qoverflow.api.hscc.bdpa.org/V1/"
  const fetch = require('node-fetch');
  const header = {
		'Authorization': 'bearer c9db0c13-8bd9-43d0-adfe-c930ee7052e6',
		'content-type': 'application/json'
	}
  let myURL = baseurl + "questions/search";
  const result = await fetch(myURL, {
    method: 'GET',
    headers: header
  });
  const responseData = await result.json();
  console.log(responseData);
  res.render('qtest', { title: 'Q Test', questionData: responseData.questions});
});


module.exports = router;