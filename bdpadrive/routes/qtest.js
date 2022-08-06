var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');
var marked = require('marked');
// to use marked, you need to do 'npm install marked' in the bdpadrive folder
// there also seemed to be a bug in the marked code that you can fix in the following file:
// node_modules/marked/lib/marked.cjs
// in that file, search for var l = tokens.length; on line 2360, comment out that line and replace with   
    // if (undefined != tokens) {
    //   var l = tokens.length;
    // } else {
    //   var l =0;
    // }

// this gets executed whenever localhost:3000/qtest is opened
router.get('/', function (req, res, next) {
  res.render('qtest', { title: 'Q Test', questionData: null });
});

// this gets executed whenever localhost:3000/qtest/ListQuestions is opened
router.get('/ListQuestions', async (req,res,next) => {
  const baseurl = apiParameters.baseurl;
  const fetch = require('node-fetch');
  let myURL = baseurl + "questions/search";
  const result = await fetch(myURL, {
    method: 'GET',
    headers: apiParameters.headers
  });
  const responseData = await result.json();
  console.log(responseData);
  res.render('qtest', { marked: marked, title: 'Q Test', questionData: responseData.questions});
});


module.exports = router;