parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fss1":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(s,a)}c((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.DownloadHelper=void 0;var n=function(){function n(){this.bootCSS={href:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",integrity:"sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"},this.bootJS={src:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",integrity:"sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"}}return n.prototype.createDownloadUI=function(n){return e(this,void 0,void 0,function(){var e,r,o,i,s,a,c,l,u,d,p,m,h,f;return t(this,function(t){return document.head.innerHTML="",document.body.innerHTML="",document.getElementsByTagName("html")[0].style.height="100%",document.body.style.height="100%",document.body.style.margin="0",document.title=n,(e=document.createElement("link")).href=this.bootCSS.href,e.rel="stylesheet",e.integrity=this.bootCSS.integrity,e.crossOrigin="anonymous",document.head.appendChild(e),(r=document.createElement("div")).style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.flexDirection="column",r.style.height="100%",(o=document.createElement("div")).className="input-group mb-2",o.style.width="400px",(i=document.createElement("input")).type="text",i.className="form-control",i.placeholder="ここにJSONを貼り付け",o.appendChild(i),(s=document.createElement("div")).className="input-group-append",(a=document.createElement("button")).className="btn btn-outline-secondary btn-labeled",a.type="button",a.innerText="Download",s.appendChild(a),o.appendChild(s),r.appendChild(o),(c=document.createElement("div")).className="progress mb-3",c.style.width="400px",(l=document.createElement("div")).className="progress-bar",l.role="progressbar",l["aria-valuemin"]="0",l["aria-valuemax"]="100",l["aria-valuenow"]="0",l.style.width="0%",l.innerText="0%",u=function(e){l["aria-valuenow"]=""+e,l.style.width=e+"%",l.innerText=e+"%"},c.appendChild(l),r.appendChild(c),(d=document.createElement("textarea")).className="form-control",d.readOnly=!0,d.style.resize="both",d.style.width="500px",d.style.height="80px",p=function(e){d.value+=e+"\n",d.scrollTop=d.scrollHeight},r.appendChild(d),document.body.appendChild(r),(m=document.createElement("script")).src=this.bootJS.src,m.integrity=this.bootJS.integrity,m.crossOrigin="anonymous",document.body.appendChild(m),h=function(e){return e.returnValue="downloading"},f=this.downloadZip.bind(this),a.onclick=function(){a.disabled=!0,window.addEventListener("beforeunload",h),f(JSON.parse(i.value),u,p).then(function(){return window.removeEventListener("beforeunload",h)})},[2]})})},n.prototype.downloadZip=function(n,r,o){return e(this,void 0,void 0,function(){var i,s,a,c,l,u,d;return t(this,function(p){switch(p.label){case 0:if(!this.isDownloadObj(n))throw new Error("ダウンロード対象オブジェクトの型が不正");return[4,this.script("https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js")];case 1:return p.sent(),[4,this.script("https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.js")];case 2:return p.sent(),[4,this.script("https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/examples/zip-stream.js")];case 3:return p.sent(),i=this,s=this.encodeFileName(n.id),a=streamSaver.createWriteStream(s+".zip"),c=new createWriter({pull:function(a){return e(this,void 0,void 0,function(){var e,c,l,u,d,p,m,h,f,y,v,b,g,w;return t(this,function(t){switch(t.label){case 0:e=0,c=function(e,t){return a.enqueue(new File(e,i.encodePath(t)))},o("@"+n.id+" 投稿:"+n.postCount+" ファイル:"+n.fileCount),c([i.createHtmlFromBody(n.id,i.createRootHtmlFromPosts(n.posts))],s+"/index.html"),l=0,u=Object.entries(n.posts),t.label=1;case 1:return l<u.length?(d=u[l],p=d[0],(m=d[1])?(h=s+"/"+p,c([m.info],h+"/info.txt"),c([i.createHtmlFromBody(p,m.html)],h+"/index.html"),m.cover?(o("download "+m.cover.filename),[4,i.download(m.cover,1)]):[3,3]):[3,10]):[3,11];case 2:(w=t.sent())&&c([w],h+"/"+m.cover.filename),t.label=3;case 3:f=1,y=m.items.length,v=0,b=m.items,t.label=4;case 4:return v<b.length?(g=b[v],o("download "+g.filename+" ("+f+++"/"+y+")"),[4,i.download(g,1)]):[3,9];case 5:return(w=t.sent())?c([w],h+"/"+g.filename):(console.error(g.filename+"("+g.url+")のダウンロードに失敗、読み飛ばすよ"),o(g.filename+"のダウンロードに失敗")),e++,[4,setTimeout(function(){return r(100*e/n.fileCount|0)},0)];case 6:return t.sent(),[4,i.sleep(100)];case 7:t.sent(),t.label=8;case 8:return v++,[3,4];case 9:o((100*e/n.fileCount|0)+"% ("+e+"/"+n.fileCount+")"),t.label=10;case 10:return l++,[3,1];case 11:return a.close(),[2]}})})}}),window.WritableStream&&c.pipeTo?[2,c.pipeTo(a).then(function(){return console.log("done writing")})]:(l=a.getWriter(),u=c.getReader(),[4,(d=function(){return u.read().then(function(e){return e.done?l.close():l.write(e.value).then(d)})})()]);case 4:return p.sent(),[2]}})})},n.prototype.sleep=function(n){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,new Promise(function(e){return setTimeout(e,n)})]})})},n.prototype.script=function(n){return e(this,void 0,void 0,function(){return t(this,function(e){return[2,new Promise(function(e,t){var r=document.createElement("script");r.src=n,r.onload=function(){return e(r)},r.onerror=function(e){return t(e)},document.head.appendChild(r)})]})})},n.prototype.download=function(n,r){var o=n.url,i=n.filename;return e(this,void 0,Promise,function(){var e,n;return t(this,function(t){switch(t.label){case 0:if(r<0)return[2,null];t.label=1;case 1:return t.trys.push([1,6,,9]),[4,fetch(o).catch(function(e){throw new Error(e)}).then(function(e){return e.ok?e.blob():null})];case 2:return(e=t.sent())?(n=e,[3,5]):[3,3];case 3:return[4,this.download({url:o,filename:i},r-1)];case 4:n=t.sent(),t.label=5;case 5:return[2,n];case 6:return t.sent(),console.error("通信エラー: "+i+", "+o),[4,this.sleep(1e3)];case 7:return t.sent(),[4,this.download({url:o,filename:i},r-1)];case 8:return[2,t.sent()];case 9:return[2]}})})},n.prototype.encodeFileName=function(e){return e.replace(/\//g,"／").replace(/\\/g,"＼").replace(/,/g,"，").replace(/:/g,"：").replace(/\*/g,"＊").replace(/"/g,"“").replace(/</g,"＜").replace(/>/g,"＞").replace(/\|/g,"｜")},n.prototype.encodePath=function(e){var t=this;return e.split("/").map(function(e){return t.encodeFileName(e)}).join("/")},n.prototype.encodeLink=function(e){var t=this;return e.split("/").map(function(e){return t.encodeFileName(e).replaceAll(/[;,/?:@&=+$#]/g,encodeURIComponent)}).join("/")},n.prototype.isDownloadObj=function(e){switch(!0){case"object"!=typeof e:return console.error("ダウンロード用オブジェクトの型が不正(対象がobjectでない)",e),!1;case"object"!=typeof e.posts:return console.error("ダウンロード用オブジェクトの型が不正(postsがobjectでない)",e.posts),!1;case"number"!=typeof e.postCount:return console.error("ダウンロード用オブジェクトの型が不正(postCountが数値でない)",e.postCount),!1;case"number"!=typeof e.fileCount:return console.error("ダウンロード用オブジェクトの型が不正(fileCountが数値でない)",e.fileCount),!1;case"string"!=typeof e.id:return console.error("ダウンロード用オブジェクトの型が不正(idが文字列でない)",e.id),!1;case Object.keys(e.posts).some(function(e){return!e}):return console.error("ダウンロード用オブジェクトの型が不正(postsのキーに空文字が含まれる)",e.posts),!1}return!Object.values(e.posts).some(function(t){switch(!0){case"object"!=typeof t:return console.error("ダウンロード用オブジェクトの型が不正(postsの値にobjectでないものが含まれる)",t,e.posts),!0;case"string"!=typeof t.info:return console.error("ダウンロード用オブジェクトの型が不正(postsの値にinfoが文字列でないものが含まれる)",t.info,e.posts),!0;case"string"!=typeof t.html:return console.error("ダウンロード用オブジェクトの型が不正(postsの値にhtmlが文字列でないものが含まれる)",t.html,e.posts),!0;case!Array.isArray(t.items):return console.error("ダウンロード用オブジェクトの型が不正(postsの値にitemsが配列でないものが含まれる)",t.items,e.posts),!0;case t.items.some(function(n){switch(!0){case"object"!=typeof n:return console.error("ダウンロード用オブジェクトの型が不正(postsのitemsの値にオブジェクトでないものが含まれる)",n,t.items),!0;case"string"!=typeof n.url:return console.error("ダウンロード用オブジェクトの型が不正(postsのitemsの値にurlが文字列でないものが含まれる)",n.url,t.items),!0;case"string"!=typeof n.filename:return console.error("ダウンロード用オブジェクトの型が不正(postsのitemsの値にfilenameが文字列でないものが含まれる)",n.filename,t.items),!0;case void 0===t.cover:return!1;case"object"!=typeof t.cover:return console.error("ダウンロード用オブジェクトの型が不正(postsの値にcoverがobjectでないものが含まれる)",t.cover,e.posts),!0;case"string"!=typeof t.cover.url:return console.error("ダウンロード用オブジェクトの型が不正(postsのcoverの値にurlが文字列でないものが含まれる)",t.cover.url,t.cover),!0;case"string"!=typeof t.cover.filename:return console.error("ダウンロード用オブジェクトの型が不正(postsのcoverの値にfilenameが文字列でないものが含まれる)",t.cover.filename,t.cover),!0;default:return!1}}):return!0;default:return!1}})},n.prototype.createRootHtmlFromPosts=function(e){var t=this;return Object.entries(e).map(function(e){var n=e[0],r=e[1],o=t.encodeFileName(n);return'<a class="hl" href="'+t.encodeLink("./"+o+"/index.html")+'"><div class="root card">\n'+t.createCoverHtmlFromPost(o,r)+'<div class="card-body"><h5 class="card-title">'+n+"</h5></div>\n</div></a><br>\n"}).join("\n")},n.prototype.createCoverHtmlFromPost=function(e,t){var n=this;return t.cover?'<img class="card-img-top gray-card" src="'+this.encodeLink("./"+e+"/"+t.cover.filename)+'"/>\n':t.items.length>0?'<div class="carousel slide" data-bs-ride="carousel" data-interval="1000"><div class="carousel-inner">\n<div class="carousel-item active">'+t.items.map(function(t){return'<div class="d-flex justify-content-center gray-carousel"><img src="'+n.encodeLink("./"+e+"/"+t.filename)+'" class="d-block pd-carousel" height="180px"/></div>'}).join('</div>\n<div class="carousel-item">')+"</div>\n</div></div>\n":'<img class="card-img-top gray-card" />\n'},n.prototype.createHtmlFromBody=function(e,t){return'<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8" />\n<title>'+e+'</title>\n<link href="'+this.bootCSS.href+'" rel="stylesheet" integrity="'+this.bootCSS.integrity+'" crossOrigin="anonymous">\n<style>div.main{width: 600px; float: none; margin: 0 auto}div.root{width: 400px}div.post{width: 600px}a.hl,a.hl:hover{color: inherit;text-decoration: none;}div.card{float: none; margin: 0 auto;}img.gray-card{height: 210px;background-color: gray;}div.gray-carousel{height: 210px; width: 400px;background-color: gray;}img.pd-carousel{height: 210px; padding: 15px;}</style>\n</head>\n<body>\n<div class="main">\n'+t+'\n</div>\n<script src="'+this.bootJS.src+'" integrity="'+this.bootJS.integrity+'" crossOrigin="anonymous"><\/script>\n</body></html>'},n}();exports.DownloadHelper=n;
},{}],"O6Jz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.main=l;var n=require("download-helper/download-helper");function t(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(s){return void e(s)}i.done?t(u):Promise.resolve(u).then(r,o)}function e(n){return function(){var e=this,r=arguments;return new Promise(function(o,a){var c=n.apply(e,r);function i(n){t(c,o,a,i,u,"next",n)}function u(n){t(c,o,a,i,u,"throw",n)}i(void 0)})}}var r={posts:{},postCount:0,fileCount:0,id:"undefined"},o=0,a=!1,c=!0,i=function(n,t,e){return"".concat(t," ").concat(e+1,".").concat(n.extension)},u=function(n,t,e){return"".concat(t," ").concat(n.name,".").concat(n.extension)},s=new n.DownloadHelper;function l(){return f.apply(this,arguments)}function f(){return(f=e(regeneratorRuntime.mark(function n(){var t,e,o,a,c,i,u,l,f;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("https://downloads.fanbox.cc"!==window.location.origin){n.next=6;break}return n.next=3,s.createDownloadUI("fanbox-downloader");case 3:return n.abrupt("return");case 6:if("https://www.fanbox.cc"!==window.location.origin){n.next=13;break}return c=null===(t=window.location.href.match(/fanbox.cc\/@([^\/]*)/))||void 0===t?void 0:t[1],i=null===(e=window.location.href.match(/fanbox.cc\/@.*\/posts\/(\d*)/))||void 0===e?void 0:e[1],n.next=11,p(c,i);case 11:n.next=22;break;case 13:if(!window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)){n.next=20;break}return u=null===(o=window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//))||void 0===o?void 0:o[1],l=null===(a=window.location.href.match(/.*\.fanbox\.cc\/posts\/(\d*)/))||void 0===a?void 0:a[1],n.next=18,p(u,l);case 18:n.next=22;break;case 20:return alert("ここどこですか(".concat(window.location.href,")")),n.abrupt("return");case 22:return f=JSON.stringify(r),console.log(f),n.next=26,navigator.clipboard.writeText(f);case 26:alert("jsonをコピーしました。downloads.fanbox.ccで実行して貼り付けてね"),confirm("downloads.fanbox.ccに遷移する？")&&(document.location.href="https://downloads.fanbox.cc");case 28:case"end":return n.stop()}},n)}))).apply(this,arguments)}function p(n,t){return d.apply(this,arguments)}function d(){return(d=e(regeneratorRuntime.mark(function n(t,e){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=3;break}return alert("しらないURL"),n.abrupt("return");case 3:if(r.id=t,!e){n.next=8;break}v(x(e)),n.next=10;break;case 8:return n.next=10,h(t);case 10:case"end":return n.stop()}},n)}))).apply(this,arguments)}function b(n,t){var e=JSON.parse(m(n)),a=e.body.items;console.log("投稿の数:"+a.length);for(var c=0;c<a.length&&0!==o;c++)r.postCount++,t?(console.log(a[c]),v(a[c])):v(x(a[c].id));return e.body.nextUrl}function m(n){var t=new XMLHttpRequest;return t.open("GET",n,!1),t.withCredentials=!0,t.send(null),t.responseText}function h(n){return y.apply(this,arguments)}function y(){return(y=e(regeneratorRuntime.mark(function n(t){var e,r,i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a=confirm("無料コンテンツを省く？"),e=prompt("取得制限数を入力 キャンセルで全て取得"),o=e?Number.parseInt(e):null,r=1,i="https://api.fanbox.cc/post.listCreator?creatorId=".concat(t,"&limit=100");case 4:if(null==i){n.next=12;break}return console.log(r+"回目"),i=b(i,c),n.next=9,O(100);case 9:r++,n.next=4;break;case 12:case"end":return n.stop()}},n)}))).apply(this,arguments)}function x(n){return JSON.parse(m("https://api.fanbox.cc/post.info?postId=".concat(n))).body}function v(n){if(n&&(!a||0!==n.feeRequired))if(n.body){var t=w(n),e=n.title;if("image"===n.type)for(var r=n.body.images,c=0;c<r.length;c++)g(t,r[c].originalUrl,i(r[c],e,c));else if("file"===n.type)for(var s=n.body.files,l=0;l<s.length;l++)g(t,s[l].url,u(s[l],e,l));else if("article"===n.type){for(var f=k(n.body.imageMap,n.body.blocks),p=0;p<f.length;p++)g(t,f[p].originalUrl,i(f[p],e,p));for(var d=j(n.body.fileMap,n.body.blocks),b=0;b<d.length;b++)g(t,d[b].url,u(d[b],e,b))}else console.log("不明なタイプ\n".concat(n.type,"@").concat(n.id));null!=o&&o--}else console.log("取得できませんでした(支援がたりない？)\nfeeRequired: ".concat(n.feeRequired,"@").concat(n.id))}function w(n){var t=M(n),e=n.coverImageUrl,o=e?{url:e,filename:"cover.".concat(e.split(".").pop())}:void 0,a={info:t,items:[],html:q(n,null==o?void 0:o.filename),cover:o},c=n.title;if(r.posts[c]){for(var i=2;r.posts["".concat(c,"_").concat(i)];)i++;c="".concat(c,"_").concat(i)}return r.posts[c]=a,a}function g(n,t,e){r.fileCount++,n.items.push({url:t,filename:e})}function k(n,t){var e=t.filter(function(n){return"image"===n.type}).map(function(n){return n.imageId}),r=function(n){var t;return null!==(t=e.indexOf(n))&&void 0!==t?t:e.length};return Object.keys(n).sort(function(n,t){return r(n)-r(t)}).map(function(t){return n[t]})}function j(n,t){var e=t.filter(function(n){return"file"===n.type}).map(function(n){return n.fileId}),r=function(n){var t;return null!==(t=e.indexOf(n))&&void 0!==t?t:e.length};return Object.keys(n).sort(function(n,t){return r(n)-r(t)}).map(function(t){return n[t]})}function R(n,t){var e=t.filter(function(n){return"embed"===n.type}).map(function(n){return n.embedId}),r=function(n){var t;return null!==(t=e.indexOf(n))&&void 0!==t?t:e.length};return Object.keys(n).sort(function(n,t){return r(n)-r(t)}).map(function(t){return n[t]})}function O(n){return I.apply(this,arguments)}function I(){return(I=e(regeneratorRuntime.mark(function n(t){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise(function(n){return setTimeout(n,t)}));case 1:case"end":return n.stop()}},n)}))).apply(this,arguments)}function M(n){var t=function(){switch(n.type){case"image":return"".concat(n.body.text,"\n");case"file":return"not implemented\n";case"article":return n.body.blocks.filter(function(n){return"p"===n.type||"header"===n.type}).map(function(n){return n.text}).join("\n");default:return"undefined type\n"}}();return"id: ".concat(n.id,"\ntitle: ").concat(n.title,"\nfee: ").concat(n.feeRequired,"\n")+"publishedDatetime: ".concat(n.publishedDatetime,"\nupdatedDatetime: ").concat(n.updatedDatetime,"\n")+"tags: ".concat(n.tags.join(", "),"\nexcerpt:\n").concat(n.excerpt,"\ntxt:\n").concat(t,"\n")}function q(n,t){return(t?D(t):"")+C(n.title)+function(){switch(n.type){case"image":return n.body.images.map(function(t,e){return D(i(t,n.title,e))}).join("<br>\n")+n.body.text.split("\n").map(function(n){return"<span>".concat(n,"</span>")}).join("<br>\n");case"file":return n.body.files.map(function(t,e){return U(u(t,n.title,e))}).join("<br>\n")+n.body.text.split("\n").map(function(n){return"<span>".concat(n,"</span>")}).join("<br>\n");case"article":var t=0,e=0,r=0,o=j(n.body.fileMap,n.body.blocks),a=k(n.body.imageMap,n.body.blocks),c=R(n.body.embedMap,n.body.blocks);return n.body.blocks.map(function(s){switch(s.type){case"p":return"<span>".concat(s.text,"</span>");case"header":return"<h2><span>".concat(s.text,"</span></h2>");case"file":var l=u(o[e],n.title,e);return e++,U(l);case"image":var f=i(a[t],n.title,t);return t++,D(f);case"embed":return"<span>".concat(c[r++],"</span>");default:return console.error("unknown block type: ".concat(s.type))}}).join("<br>\n");case"text":return n.body.text?n.body.text.split("\n").map(function(n){return"<span>".concat(n,"</span>")}).join("<br>\n"):n.body.blocks?n.body.blocks.map(function(n){switch(n.type){case"header":return"<h2><span>".concat(n.text,"</span></h2>");case"p":return"<span>".concat(n.text,"</span>");default:return""}}).join("<br>\n"):"";default:return"undefined type\n"}}()}function C(n){return"<h5>".concat(n,"</h5>\n")}function D(n){return'<a class="hl" href="'.concat(s.encodeLink("./".concat(n,'"><div class="post card')),'">\n')+'<img class="card-img-top" src="'.concat(s.encodeLink("./".concat(n)),'"/>\n</div></a>')}function U(n){return'<span><a href="'.concat(s.encodeLink("./".concat(n)),'">').concat(n,"</a></span>")}
},{"download-helper/download-helper":"fss1"}]},{},["O6Jz"], null)