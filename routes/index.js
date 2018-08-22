// Loading Modules
const fs = require('fs');
const graph = require('fbgraph');

// Facebook Graph API Access_Token
graph.setAccessToken('EAAPSuFQJhfYBAI9RwzOvLE8qompAVTt0kQBexGyrZCEN5cN9VJBHZA28dLJ7vjRi5x27qDn1hE7ZAXfhFhN8RgNyJtf3QqQ5AKgX1tQ3h3lF5FSllgNxgv8Gi79q41JIANFoEC1lZAHLj9GD8gnoZApEmACspMQcwPeovhUWpFXZAChD9J5ZBJ0');


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

  // Post Style
  const Post = `
  #Nodejs-Facebook-Anonymous-Post${tag} \r\n\r\n
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
