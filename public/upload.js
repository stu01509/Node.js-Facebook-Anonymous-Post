 var feedback = function (res) {
     if (res.success === true) {
         var wahaha = res.data.link.replace("http", "http");
         console.log(wahaha);
         document.querySelector('.status').classList.add('text-success');
         document.querySelector('.status').innerHTML =
             '上傳成功! : ' + '<br><input class="image-url" name="PicImg" readonly="readonly" value=' + wahaha + '/>' + '<br><img src="' + wahaha + '" class="img-fluid">';
     } else {
         var wahaha = res.data.link.replace("http", "http");
         console.log(wahaha);
         document.querySelector('.status').classList.add('text-success');
         document.querySelector('.status').innerHTML =
             'Image : ' + '<br><input class="image-url" name="PicImg" value=' + '圖片上傳失敗' + '/>';

     }
 };

 new Imgur({
     clientid: '4409588f10776f7', //You can change this ClientID
     callback: feedback
 });