let dlList = { posts: {}, postCount: 0, fileCount: 0, id: 'undefined' };
let limit = 0;
let isIgnoreFree = false;
let isEco = true;
const getImageName = (img, title, index) => `${title} ${index + 1}.${img.extension}`;
const getFileName = (file, title, index) => `${title} ${file.name}.${file.extension}`;
export async function main() {
    var _a, _b, _c, _d;
    if (window.location.origin === "https://downloads.fanbox.cc") {
        createDownloadUI();
        return;
    }
    else if (window.location.origin === "https://www.fanbox.cc") {
        const userId = (_a = window.location.href.match(/fanbox.cc\/@(.*)/)) === null || _a === void 0 ? void 0 : _a[1];
        const postId = (_b = window.location.href.match(/fanbox.cc\/@.*\/posts\/(\d*)/)) === null || _b === void 0 ? void 0 : _b[1];
        await searchBy(userId, postId);
    }
    else if (window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)) {
        const userId = (_c = window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)) === null || _c === void 0 ? void 0 : _c[1];
        const postId = (_d = window.location.href.match(/.*\.fanbox\.cc\/posts\/(\d*)/)) === null || _d === void 0 ? void 0 : _d[1];
        await searchBy(userId, postId);
    }
    else {
        alert(`ここどこですか(${window.location.href})`);
        return;
    }
    console.log(dlList);
    const json = JSON.stringify(dlList);
    await navigator.clipboard.writeText(json);
    alert("jsonをコピーしました。downloads.fanbox.ccで実行して貼り付けてね");
}
function createDownloadUI() {
    document.body.innerHTML = "";
    let tb = document.createElement("input");
    tb.type = "text";
    let bt = document.createElement("input");
    bt.type = "button";
    bt.value = "ok";
    let pr = document.createElement("progress");
    pr.max = 100;
    pr.value = 0;
    let br = document.createElement("br");
    let tx = document.createElement("textarea");
    tx.value = "";
    tx.cols = 40;
    tx.readOnly = true;
    document.body.appendChild(tb);
    document.body.appendChild(bt);
    document.body.appendChild(pr);
    document.body.appendChild(br);
    document.body.appendChild(tx);
    const progress = (v) => pr.value = v;
    const textLog = (t) => {
        tx.value += `${t}\n`;
        tx.scrollTop = tx.scrollHeight;
    };
    bt.onclick = function () {
        downloadZip(tb.value, progress, textLog).then(() => {
        });
    };
}
async function searchBy(userId, postId) {
    if (!userId) {
        alert("しらないURL");
        return;
    }
    dlList.id = userId;
    if (postId)
        addByPostInfo(getPostInfoById(postId));
    else
        await getItemsById(userId);
}
function addByPostListUrl(url, eco) {
    const postList = JSON.parse(fetchUrl(url));
    const items = postList.body.items;
    console.log("投稿の数:" + items.length);
    for (let i = 0; i < items.length && limit !== 0; i++) {
        dlList.postCount++;
        if (eco) {
            console.log(items[i]);
            addByPostInfo(items[i]);
        }
        else {
            addByPostInfo(getPostInfoById(items[i].id));
        }
    }
    return postList.body.nextUrl;
}
function fetchUrl(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.withCredentials = true;
    request.send(null);
    return request.responseText;
}
async function getItemsById(postId) {
    isIgnoreFree = confirm("無料コンテンツを省く？");
    const limitBase = prompt("取得制限数を入力 キャンセルで全て取得");
    limit = limitBase ? Number.parseInt(limitBase) : null;
    let count = 1, nextUrl = `https://api.fanbox.cc/post.listCreator?creatorId=${postId}&limit=100`;
    for (; nextUrl != null; count++) {
        console.log(count + "回目");
        nextUrl = addByPostListUrl(nextUrl, isEco);
        await sleep(100);
    }
}
function getPostInfoById(postId) {
    return JSON.parse(fetchUrl(`https://api.fanbox.cc/post.info?postId=${postId}`)).body;
}
function addByPostInfo(postInfo) {
    if (!postInfo || (isIgnoreFree && (postInfo.feeRequired === 0))) {
        return;
    }
    if (!postInfo.body) {
        console.log(`取得できませんでした(支援がたりない？)\nfeeRequired: ${postInfo.feeRequired}@${postInfo.id}`);
        return;
    }
    initDlList(postInfo);
    const title = postInfo.title;
    if (postInfo.type === "image") {
        const images = postInfo.body.images;
        for (let i = 0; i < images.length; i++) {
            addUrl(title, images[i].originalUrl, getImageName(images[i], title, i));
        }
    }
    else if (postInfo.type === "file") {
        const files = postInfo.body.files;
        for (let i = 0; i < files.length; i++) {
            addUrl(title, files[i].url, getFileName(files[i], title, i));
        }
    }
    else if (postInfo.type === "article") {
        const images = convertImageMap(postInfo.body.imageMap, postInfo.body.blocks);
        for (let i = 0; i < images.length; i++) {
            addUrl(title, images[i].originalUrl, getImageName(images[i], title, i));
        }
        const files = convertFileMap(postInfo.body.fileMap, postInfo.body.blocks);
        for (let i = 0; i < files.length; i++) {
            addUrl(title, files[i].url, getFileName(files[i], title, i));
        }
    }
    else {
        console.log(`不明なタイプ\n${postInfo.type}@${postInfo.id}`);
    }
    if (limit != null)
        limit--;
}
function initDlList(postInfo) {
    const info = createInfoFromPostInfo(postInfo);
    const coverUrl = postInfo.coverImageUrl;
    const cover = coverUrl ? { url: coverUrl, filename: `cover.${coverUrl.split('.').pop()}` } : undefined;
    const html = createPostHtmlFromPostInfo(postInfo, cover === null || cover === void 0 ? void 0 : cover.filename);
    dlList.posts[postInfo.title] = { info, items: [], html, cover };
}
function addUrl(title, url, filename) {
    dlList.fileCount++;
    dlList.posts[title].items.push({ url, filename });
}
function convertImageMap(imageMap, blocks) {
    const imageOrder = blocks.filter((it) => it.type === "image").map(it => it.imageId);
    const imageKeyOrder = (s) => { var _a; return (_a = imageOrder.indexOf(s)) !== null && _a !== void 0 ? _a : imageOrder.length; };
    return Object.keys(imageMap).sort((a, b) => imageKeyOrder(a) - imageKeyOrder(b)).map(it => imageMap[it]);
}
function convertFileMap(fileMap, blocks) {
    const fileOrder = blocks.filter((it) => it.type === 'file').map(it => it.fileId);
    const fileKeyOrder = (s) => { var _a; return (_a = fileOrder.indexOf(s)) !== null && _a !== void 0 ? _a : fileOrder.length; };
    return Object.keys(fileMap).sort((a, b) => fileKeyOrder(a) - fileKeyOrder(b)).map(it => fileMap[it]);
}
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function script(url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve(script);
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
    });
}
async function download({ url, filename }, limit) {
    if (limit < 0)
        return null;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`DL失敗: ${filename}, ${url}`);
            await sleep(1000);
            return await download({ url, filename }, limit - 1);
        }
        else
            return response;
    }
    catch (_) {
        console.error(`通信エラー: ${filename}, ${url}`);
        await sleep(1000);
        return await download({ url, filename }, limit - 1);
    }
}
async function downloadZip(json, progress, log) {
    dlList = JSON.parse(json);
    await script('https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js');
    await script('https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.js');
    await script('https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/examples/zip-stream.js');
    const fileStream = streamSaver.createWriteStream(`${dlList.id}.zip`);
    const readableZipStream = new createWriter({
        async pull(ctrl) {
            let count = 0;
            log(`@${dlList.id} 投稿:${dlList.postCount} ファイル:${dlList.fileCount}`);
            ctrl.enqueue(new File([createHtml(dlList.id, createRootHtmlFromPosts())], `${dlList.id}/index.html`));
            for (const [title, post] of Object.entries(dlList.posts)) {
                ctrl.enqueue(new File([post.info], `${dlList.id}/${title}/info.txt`));
                ctrl.enqueue(new File([createHtml(title, post.html)], `${dlList.id}/${title}/index.html`));
                if (post.cover) {
                    log(`download ${post.cover.filename}`);
                    const response = await download(post.cover, 1);
                    if (response) {
                        ctrl.enqueue({
                            name: `${dlList.id}/${title}/${post.cover.filename}`,
                            stream: () => response.body
                        });
                    }
                }
                let i = 1, l = post.items.length;
                for (const dl of post.items) {
                    log(`download ${dl.filename} (${i++}/${l})`);
                    const response = await download(dl, 1);
                    if (response) {
                        ctrl.enqueue({ name: `${dlList.id}/${title}/${dl.filename}`, stream: () => response.body });
                    }
                    else {
                        console.error(`${dl.filename}(${dl.url})のダウンロードに失敗、読み飛ばすよ`);
                        log(`${dl.filename}のダウンロードに失敗`);
                    }
                    count++;
                    await setTimeout(() => progress(count * 100 / dlList.fileCount | 0), 0);
                    await sleep(100);
                }
                log(`${count * 100 / dlList.fileCount | 0}% (${count}/${dlList.fileCount})`);
            }
            ctrl.close();
        }
    });
    if (window.WritableStream && readableZipStream.pipeTo) {
        return readableZipStream.pipeTo(fileStream).then(() => console.log('done writing'));
    }
    const writer = fileStream.getWriter();
    const reader = readableZipStream.getReader();
    const pump = () => reader.read().then((res) => res.done ? writer.close() : writer.write(res.value).then(pump));
    await pump();
}
function createInfoFromPostInfo(postInfo) {
    const txt = (() => {
        switch (postInfo.type) {
            case "image":
                return `${postInfo.body.text}\n`;
            case "file":
                return `not implemented\n`;
            case "article":
                return postInfo.body.blocks
                    .filter((it) => it.type === "p" || it.type === "header")
                    .map(it => it.text)
                    .join("\n");
            default:
                return `undefined type\n`;
        }
    })();
    return `id: ${postInfo.id}\ntitle: ${postInfo.title}\nfee: ${postInfo.feeRequired}\n` +
        `publishedDatetime: ${postInfo.publishedDatetime}\nupdatedDatetime: ${postInfo.updatedDatetime}\n` +
        `tags: ${postInfo.tags.join(', ')}\nexcerpt:\n${postInfo.excerpt}\ntxt:\n${txt}\n`;
}
function createPostHtmlFromPostInfo(postInfo, coverFilename) {
    const header = (coverFilename ? createImg(coverFilename) : '') + createTitle(postInfo.title);
    const body = (() => {
        var _a;
        switch (postInfo.type) {
            case "image":
                return postInfo.body.images.map((it, i) => createImg(getImageName(it, postInfo.title, i))).join("<br>\n") +
                    postInfo.body.text.split("\n").map(it => `<span>${it}</span>`).join("<br>\n");
            case "file":
                return postInfo.body.files.map((it, i) => createFile(getFileName(it, postInfo.title, i))).join("<br>\n") + ((_a = postInfo.body.text) === null || _a === void 0 ? void 0 : _a.split("\n").map(it => `<span>${it}</span>`).join("<br>\n"));
            case "article":
                let cntImg = 0, cntFile = 0;
                const files = convertFileMap(postInfo.body.fileMap, postInfo.body.blocks);
                const images = convertImageMap(postInfo.body.imageMap, postInfo.body.blocks);
                return postInfo.body.blocks.map(it => {
                    switch (it.type) {
                        case 'p':
                            return `<span>${it.text}</span>`;
                        case 'header':
                            return `<h2><span>${it.text}</span></h2>`;
                        case 'file':
                            const filename = getFileName(files[cntFile], postInfo.title, cntFile);
                            cntFile++;
                            return createFile(filename);
                        case 'image':
                            const imgName = getImageName(images[cntImg], postInfo.title, cntImg);
                            cntImg++;
                            return createImg(imgName);
                        default:
                            return console.error(`unknown block type: ${it.type}`);
                    }
                }).join("<br>\n");
            default:
                return `undefined type\n`;
        }
    })();
    return header + body;
}
function createRootHtmlFromPosts() {
    return Object.entries(dlList.posts).map(([title, post]) => {
        return `<a class="hl" href="./${title}/index.html"><div class="root card">\n` +
            `<img class="card-img-top gray-card" ${post.cover ? `src="./${title}/${post.cover.filename}"` : ''}/>\n` +
            `<div class="card-body"><h5 class="card-title">${title}</h5></div>\n</div></a><br>\n`;
    }).join('\n');
}
function createTitle(title) {
    return `<h5>${title}</h5>\n`;
}
function createImg(filename) {
    return `<a class="hl" href="./${filename}"><div class="post card">\n` +
        `<img class="card-img-top" src="./${filename}"/>\n</div></a>`;
}
function createFile(filename) {
    return `<span><a href="./${filename}">${filename}</a></span>`;
}
function createHtml(title, body) {
    return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8" />\n<title>${title}</title>\n` +
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous">\n' +
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>\n' +
        '<style>div.main{width: 600px; float: none; margin: 0 auto} a.hl,a.hl:hover {color: inherit;text-decoration: none;}div.root{width: 400px} div.post{width: 600px}div.card {float: none; margin: 0 auto;}img.gray-card {height: 210px;background-color: gray;}</style>\n' +
        `</head>\n<body>\n<div class="main">\n${body}\n</div>\n</body></html>`;
}