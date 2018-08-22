<p align=center>
<img src="https://i.imgur.com/zy3X2wS.png">
</p>
<p align=center>

<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

</p>

## Node.js-Facebook-Anonymous-Post

Simple Facebook anonymous post to fan page timeline system, Fast to submit user post content, And using Firebase authentication to identify.

## Features

* ** 🕑 Real time to submit user post.
* ** 🖼️ Support user submit post with picture.
* ** 🧖 Firebase authentication to avoid spamming.
* ** 📝 Record remote user submit content, IP and User-Agent.

## Install 

```Shell
$ git clone git@github.com:stu01509/Node.js-Facebook-Anonymous-Post.git
$ cd Node.js-Facebook-Anonymous-Post
$ npm install 

```

## Setting 

1. Setting Facebook Graph API Access Token.

   📌Note: Post to fan page require publish_pages and manage_pages [permission](https://developers.facebook.com/docs/facebook-login/permissions).

```Shell
  1. Open routes/index.js

  2. Find graph.setAccessToken('Access_Token') #6;

  3. Paste your Facebook Graph API Token.

```
<img src="https://i.imgur.com/D4pEuDu.png">

2. Setting Firebase confing.

Go to [Firebase](https://console.firebase.google.com/u/0/) cretae a new project, And add Firebase config, Then go to Firebase create a new project, And add Firebase config, Then click authentication enable sign-in method.

```Shell
  1. Open views/index.ejs

  2. Find const config  #64;

  3. Paste your Firebase config.

```
<img src="https://i.imgur.com/RM6ne8K.png">

## Usage

In project directory using node index.js, The app will listen on 3000 port, Running in localhost:3000

```Shell
$ node index.js

```
<img src="https://i.imgur.com/5Er18jy.gif">

## Demo

This project deploy on Azure free plan, Need a some time to wake up the app.
🌐[Demo](https://nodejs-facebook-anonymous-post.azurewebsites.net/)

### Text Post

<img src="https://i.imgur.com/7DU6R7P.gif">

### Text and Picture Post

<img src="https://i.imgur.com/Jpr1uZ1.gif">

## Lisense
MIT
