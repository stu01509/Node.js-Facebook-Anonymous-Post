// Loading Modules
const fs = require('fs-extra');
const graph = require('fbgraph');

exports.index = (req, res) => {
  res.render('index', {});
};
exports.submitted = (req, res) => {
  res.render('submitted', {});
};
exports.bye = (req, res) => {
  res.render('bye', {});
};
exports.submit = (req, res) => {
  // Facebook Graph API Access_Token
  graph.setAccessToken('EAAPSuFQJhfYBAMxguiRmM24QUfOawiU96QEeoyRqWYodTGGQwbLmkK1ukUZAEYfIX0NOb1rdj56zCSgLl4rcPV4zYty7kxNWZBwQIq1dNBrYvRZAZB0UTwdcRNPi9eyynLojviwJSyUNDKlcPZAA0Pbhoo8nmGN8EJZCMO72QZCaFatnOAkn6Wl');

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
  let By = '';
  if (nickName !== '') By = 'By:';

  //  Read POST #Tag
  const dataTag = fs.readFileSync('tag.txt', 'utf8');
  const tag = parseInt(dataTag, 10);
  const addTag = tag + 1;
  fs.writeFile('tag.txt', addTag, () => {});
  console.log(`貼文#  ${tag}`);

  // Post Content
  const Post = `
  #告白陽中 ${tag} \r\n\r\n
  ${comment} \r\n\r\n
  ${By} ${nickName} \r\n
  投稿日期: ${nowTime}`;

  // Post Log
  const Log = `
  ${comment} \r\n\r\n
  ${By} ${nickName} \r\n\r\n
  IP: ${ip} \r\n\r\n
  UserAgent: ${userAgent}\r\n
  投稿日期: ${nowTime}`;

  // Write Log Data to Logs Folder
  fs.writeFile(`Logs/${tag}.txt`, Log, () => {});

  const wallPost = {
    message: Post,
  };
  const wallPostPhoto = {
    message: Post,
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
  res.redirect('./submitted');
};
