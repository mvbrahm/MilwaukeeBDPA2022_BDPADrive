var express = require('express');
var router = express.Router();
var apiParameters = require('../configs/api');

router.get('/', function (req, res, next) {
  res.render('apitest', { title: 'API Test', nodeData: null });
});

const httpRequest = require('https');

router.get('/ListNodes', function (req, res, next) {
  let myURL = apiParameters.baseurl + "filesystem/User1/search?";
  let options = {
    method: 'GET',
    headers: apiParameters.headers
  };
  const request = httpRequest.request(myURL, options, response => {
    console.log('Status', response.statusCode);
    console.log('Headers', response.headers);
    let responseData = '';
    response.on('data', (dataChunk) => {
      responseData += dataChunk;
    });
    response.on('end', () => {
      console.log('Response: ', responseData)
      res.render('apitest', { title: 'API Test', nodeData: JSON.parse(responseData).nodes });
    });
  });
  request.on('error', error => console.log('ERROR', error));
  request.end();
});

// router.get('/AddUser', function (req, res, next) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Authorization': 'bearer playkey-61a29b89-2719-49bf-b475-933db60bad4e',
//       'content-type': 'application/json'
//     },
//   };

//   const data = {
//     'username': 'MKEbdpa',  //note: MKEbdpa already added
//     'email': 'mkebdpa@gmail.com',
//     'salt': 'f503128b98fcd17cc967350702b82bea',
//     'key': 'd26239edf0b83471083525fd35ecf34157c2b3e5a2b305116d3269775c0d48e1cd3e8f6128e4cf787b6614770bba021ec92d9b01134b984bbf43a25525b0b272'
//   };
//   console.log('options ', options);
//   const request = httpRequest.request('https://drive.api.hscc.bdpa.org/v1/users', options, response => {
//     console.log('Status', response.statusCode);
//     console.log('Headers', response.headers);
//     let responseData = '';

//     response.on('data', (dataChunk) => {
//       responseData += dataChunk;
//     });
//     response.on('end', () => {
//       console.log('Response: ', responseData)
//     });
//   });

//   request.on('error', error => console.log('ERROR', error));

//   request.write(data);
//   request.end();
// });

module.exports = router;