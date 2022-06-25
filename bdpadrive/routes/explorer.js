var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');

// this gets executed whenever localhost:3000/explorer is opened
router.get('/', function (req, res, next) {
  res.render('explorer', { title: 'Explorer', nodeData: null });
});

const user = 'MKEbdpa';

// this gets executed whenever localhost:3000/explorer/ListNodes is opened
router.post('/addfile', async (req, res, next) => {
  let filename = req.body.fname;
  let tags = req.body.tags;
  if (tags.trim() == '') {
    tags = [];
  } else {
    tags = [tags]
  }
  let content = req.body.content;
  const fetch = require('node-fetch');
  let myURL = apiParameters.baseurl + "filesystem/" + user;
  const result = await fetch(myURL, {
    method: 'POST',
    headers: apiParameters.headers,
    body: JSON.stringify({
      type: 'file',
      name: filename,
      text: content,
      tags: tags,
      lock: null
    })
  });
  const responseData = await result.json();
  console.log(responseData);
  res.render('./explorer', { title: 'Explorer' });
});


module.exports = router;