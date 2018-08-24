// Loading Modules
const fs = require('fs');
const graph = require('fbgraph');

// Loading Config
require('dotenv').config();
const env = process.env;

// Facebook Graph API Access_Token
graph.setAccessToken(env.Facebook_Access_Token);

// Read Default Tag
const defaultTag  = parseInt(env.tag, 10);
let tag = defaultTag;

exports.index = (req, res) => {
  res.render('index', {
    // Render Firebase config
    apiKey:  env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
  });
};
exports.submitted = (req, res) => {
  res.render('submitted', {});
};
exports.bye = (req, res) => {
  res.render('bye', {});
};
exports.submit = (req, res) => {

  // Get Submit Time
  const nowTime = new Date();

  // Get Remote Post Data
  const comment = req.body.comment;
  const nickName = req.body.NickName;
  const postImgUrl = req.body.PicImg;

  // Get User IP and UserAgent
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];

  // Check Form NickName Hava a Value
  let by = '';
  if (nickName !== '') by = 'By:';

  // Post Style
  const post = `
  #Nodejs-Facebook-Anonymous-Post${tag} \r\n\r\n
  ${comment} \r\n\r\n
  ${by} ${nickName} \r\n
  投稿日期: ${nowTime}`;

  // Post Log
  const log = `
  ${comment} \r\n\r\n
  ${by} ${nickName} \r\n\r\n
  IP: ${ip} \r\n\r\n
  UserAgent: ${userAgent}\r\n
  投稿日期: ${nowTime}`;

  // Write Log Data to Logs Folder
  fs.writeFile(`Logs/${tag}.txt`, log, () => {});

  const wallPost = {
    message: post,
  };
  const wallPostPhoto = {
    message: post,
    url: postImgUrl,
  };

  // Check Post to feed or photos
  if (postImgUrl) {
    graph.post('/me/photos', wallPostPhoto, (err, res) => {
      console.log(res);
      if (err) {
        console.log('\x1b[41m', 'Facebook Post Error');
      } else {
        console.log('\x1b[42m', 'Facebook Post Complete.');
      }
    });
  } else {
    graph.post('/me/feed', wallPost, (err, res) => {
      console.log(res);
      if (err) {
        console.log('\x1b[41m', 'Facebook Post Error');
      } else {
        console.log('\x1b[42m', 'Facebook Post Complete.');
      }
    });
  }
  // Add Tag
  tag = tag+1;

  res.redirect('./submitted');
};
