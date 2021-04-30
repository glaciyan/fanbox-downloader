let dlList: {
    posts: Record<string, Readonly<{ info: string, items: DlInfo[], html: string, cover?: DlInfo }>>,
    postCount: number,
    fileCount: number,
    id: string,
} = {posts: {}, postCount: 0, fileCount: 0, id: 'undefined'};
let limit: number | null = 0;
let isIgnoreFree = false;

// 投稿の情報を個別に取得しない（基本true）
let isEco = true;

const getImageName = (img: ImageInfo, title: string, index: number) => `${title} ${index + 1}.${img.extension}`;
const getFileName = (file: FileInfo, title: string, index: number) => `${title} ${file.name}.${file.extension}`;

// メイン
export async function main() {
    if (window.location.origin === "https://downloads.fanbox.cc") {
        createDownloadUI();
        return;
    } else if (window.location.origin === "https://www.fanbox.cc") {
        const userId = window.location.href.match(/fanbox.cc\/@(.*)/)?.[1];
        const postId = window.location.href.match(/fanbox.cc\/@.*\/posts\/(\d*)/)?.[1];
        await searchBy(userId, postId);
    } else if (window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)) {
        const userId = window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)?.[1];
        const postId = window.location.href.match(/.*\.fanbox\.cc\/posts\/(\d*)/)?.[1];
        await searchBy(userId, postId);
    } else {
        alert(`ここどこですか(${window.location.href})`);
        return;
    }
    const json = JSON.stringify(dlList);
    console.log(json);
    await navigator.clipboard.writeText(json);
    alert("jsonをコピーしました。downloads.fanbox.ccで実行して貼り付けてね");
}

/**
 * 投稿情報を取得して userId に入れる
 * @param userId ユーザーID
 * @param postId 投稿ID
 */
async function searchBy(userId: string | undefined, postId: string | undefined) {
    if (!userId) {
        alert("しらないURL");
        return;
    }
    dlList.id = userId;
    if (postId) addByPostInfo(getPostInfoById(postId));
    else await getItemsById(userId);
}

/**
 * 投稿リストURLからURLリストに追加
 * @param url
 * @param eco trueならpostInfoを個別に取得しない
 */
function addByPostListUrl(url: string, eco: boolean) {
    const postList = JSON.parse(fetchUrl(url));
    const items = postList.body.items;

    console.log("投稿の数:" + items.length);
    for (let i = 0; i < items.length && limit !== 0; i++) {
        dlList.postCount++;
        if (eco) {
            console.log(items[i]);
            addByPostInfo(items[i]);
        } else {
            addByPostInfo(getPostInfoById(items[i].id));
        }
    }
    return postList.body.nextUrl;
}

/**
 * HTTP GET用
 * @param url
 */
function fetchUrl(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.withCredentials = true;
    request.send(null);
    return request.responseText;
}

/**
 * 投稿IDからitemsを得る
 * @param postId 投稿ID
 */
async function getItemsById(postId: string) {
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

/**
 * 投稿IDからpostInfoを得る
 * @param postId 投稿ID
 */
function getPostInfoById(postId: string): PostInfo | undefined {
    return JSON.parse(fetchUrl(`https://api.fanbox.cc/post.info?postId=${postId}`)).body;
}

/**
 * postInfoオブジェクトからURLリストに追加する
 * @param postInfo 投稿情報オブジェクト
 */
function addByPostInfo(postInfo: PostInfo | undefined) {
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
    } else if (postInfo.type === "file") {
        const files = postInfo.body.files;
        for (let i = 0; i < files.length; i++) {
            addUrl(title, files[i].url, getFileName(files[i], title, i));
        }
    } else if (postInfo.type === "article") {
        const images = convertImageMap(postInfo.body.imageMap, postInfo.body.blocks);
        for (let i = 0; i < images.length; i++) {
            addUrl(title, images[i].originalUrl, getImageName(images[i], title, i));
        }
        const files = convertFileMap(postInfo.body.fileMap, postInfo.body.blocks);
        for (let i = 0; i < files.length; i++) {
            addUrl(title, files[i].url, getFileName(files[i], title, i));
        }
    } else {
        console.log(`不明なタイプ\n${postInfo.type}@${postInfo.id}`);
    }
    if (limit != null) limit--;
}

/**
 * dlListの投稿情報を初期化する
 * @param postInfo 投稿情報オブジェクト
 */
function initDlList(postInfo: PostInfo): void {
    const info = createInfoFromPostInfo(postInfo);
    const coverUrl = postInfo.coverImageUrl;
    const cover = coverUrl ? {url: coverUrl, filename: `cover.${coverUrl.split('.').pop()}`} : undefined;
    const html = createPostHtmlFromPostInfo(postInfo, cover?.filename);
    dlList.posts[postInfo.title] = {info, items: [], html, cover};
}

/**
 * URLリストに追加
 * @param title 投稿のタイトル
 * @param url
 * @param filename
 */
function addUrl(title: string, url: string, filename: string) {
    dlList.fileCount++;
    dlList.posts[title].items.push({url, filename});
}

function convertImageMap(imageMap: Record<string, ImageInfo>, blocks: Block[]): ImageInfo[] {
    const imageOrder = blocks.filter((it): it is ImageBlock => it.type === "image").map(it => it.imageId);
    const imageKeyOrder = (s: string) => imageOrder.indexOf(s) ?? imageOrder.length;
    return Object.keys(imageMap).sort((a, b) => imageKeyOrder(a) - imageKeyOrder(b)).map(it => imageMap[it]);
}

function convertFileMap(fileMap: Record<string, FileInfo>, blocks: Block[]): FileInfo[] {
    const fileOrder = blocks.filter((it): it is FileBlock => it.type === 'file').map(it => it.fileId);
    const fileKeyOrder = (s: string) => fileOrder.indexOf(s) ?? fileOrder.length;
    return Object.keys(fileMap).sort((a, b) => fileKeyOrder(a) - fileKeyOrder(b)).map(it => fileMap[it]);
}

/**
 * timeoutによる疑似スリーブ
 * @param ms ミリ秒
 */
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * DOMによる外部スクリプト読み込み (importじゃだめなとき用)
 * @param url
 */
async function script(url: string) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve(script);
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
    });
}

/**
 * fetch
 * @param url
 * @param filename
 * @param limit 回数制限
 */
async function download({url, filename}: DlInfo, limit: number): Promise<Response | null> {
    if (limit < 0) return null;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`DL失敗: ${filename}, ${url}`);
            await sleep(1000);
            return await download({url, filename}, limit - 1);
        } else return response;
    } catch (_) {
        console.error(`通信エラー: ${filename}, ${url}`);
        await sleep(1000);
        return await download({url, filename}, limit - 1);
    }
}

/**
 * ZIPでダウンロード
 * @param json dlListのjson文字列
 * @param progress 進捗率出力関数
 * @param log ログ出力関数
 */
async function downloadZip(json: string, progress: (n: number) => void, log: (s: string) => void) {
    dlList = JSON.parse(json);
    await script('https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js');
    await script('https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.js');
    await script('https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/examples/zip-stream.js');

    // @ts-ignore
    const fileStream = streamSaver.createWriteStream(`${dlList.id}.zip`);
    // @ts-ignore
    const readableZipStream = new createWriter({
        async pull(ctrl: any) {
            let count = 0;
            log(`@${dlList.id} 投稿:${dlList.postCount} ファイル:${dlList.fileCount}`);
            // ルートhtml
            ctrl.enqueue(new File([createHtml(dlList.id, createRootHtmlFromPosts())], `${dlList.id}/index.html`));

            for (const [title, post] of Object.entries(dlList.posts)) {
                // 投稿情報+html
                ctrl.enqueue(new File([post.info], `${dlList.id}/${title}/info.txt`));
                ctrl.enqueue(new File([createHtml(title, post.html)], `${dlList.id}/${title}/index.html`));
                // カバー画像
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
                // ファイル処理
                let i = 1, l = post.items.length;
                for (const dl of post.items) {
                    log(`download ${dl.filename} (${i++}/${l})`);
                    const response = await download(dl, 1);
                    if (response) {
                        ctrl.enqueue({name: `${dlList.id}/${title}/${dl.filename}`, stream: () => response.body});
                    } else {
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

    // more optimized
    if (window.WritableStream && readableZipStream.pipeTo) {
        return readableZipStream.pipeTo(fileStream).then(() => console.log('done writing'));
    }

    // less optimized
    const writer = fileStream.getWriter();
    const reader = readableZipStream.getReader();
    const pump = () => reader.read().then((res: any) => res.done ? writer.close() : writer.write(res.value).then(pump));
    await pump();
}


/**
 * download 用のUIを構築する
 */
function createDownloadUI() {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.title = "fanbox-downloader";

    let bootLink = document.createElement("link");
    bootLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css";
    bootLink.rel = "stylesheet";
    bootLink.integrity = "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1";
    bootLink.crossOrigin = "anonymous";
    document.head.appendChild(bootLink);

    let bodyDiv = document.createElement("div");
    bodyDiv.style.display = "flex";
    bodyDiv.style.alignItems = "center";
    bodyDiv.style.justifyContent = "center";
    bodyDiv.style.flexDirection = "column";
    bodyDiv.style.height = "100%";
     let inputDiv = document.createElement("div");
     inputDiv.className = "input-group mb-2";
     inputDiv.style.width = "400px";
      let input = document.createElement("input");
      input.type="text"
      input.className="form-control"
      input.placeholder="ここにJSONを貼り付け"
      inputDiv.appendChild(input);
      let buttonDiv = document.createElement("div");
      buttonDiv.className = "input-group-append";
       let button = document.createElement("button");
       button.className = "btn btn-outline-secondary btn-labeled";
       button.type="button";
       button.innerText = "Download";
      buttonDiv.appendChild(button);
     inputDiv.appendChild(buttonDiv);
    bodyDiv.appendChild(inputDiv);
     let progressDiv = document.createElement("div");
     progressDiv.className = "progress mb-3";
     progressDiv.style.width = "400px";
      let progress = document.createElement("div");
      progress.className = "progress-bar";
      // @ts-ignore
      progress["role"] = "progressbar";
      // @ts-ignore
      progress["aria-valuemin"] = "0";
      // @ts-ignore
      progress["aria-valuemax"] = "100";
      // @ts-ignore
      progress["aria-valuenow"] = "0";
      progress.style.width = "0%"
      progress.innerText = "0%";
      const setProgress = (n: number) => {
          // @ts-ignore
          progress["aria-valuenow"] = `${n}`;
          progress.style.width = `${n}%`;
          progress.innerText = `${n}%`;
      };
     progressDiv.appendChild(progress);
    bodyDiv.appendChild(progressDiv);
     let textarea = document.createElement("textarea");
     textarea.className = "form-control";
     textarea.readOnly = true;
     textarea.style.resize = "both";
     textarea.style.width = "500px";
     textarea.style.height = "80px";
     const textLog = (t: string) => {
         textarea.value += `${t}\n`;
         textarea.scrollTop = textarea.scrollHeight;
     };
    bodyDiv.appendChild(textarea);
    document.body.appendChild(bodyDiv);

    let bootScript = document.createElement("script");
    bootScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js";
    bootScript.integrity = "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW";
    bootScript.crossOrigin = "anonymous";
    document.body.appendChild(bootScript);

    button.onclick = function () {
        button.disabled = true;
        downloadZip(input.value, setProgress, textLog).then(() => {
        });
    };
}

/**
 * postInfoオブジェクトから投稿情報テキストを作る
 * @param postInfo 投稿情報オブジェクト
 * @return 投稿情報テキスト
 */
function createInfoFromPostInfo(postInfo: PostInfo): string {
    const txt: string = (() => {
        switch (postInfo.type) {
            case "image":
                return `${postInfo.body.text}\n`;
            case "file":
                return `not implemented\n`;
            case "article":
                return postInfo.body.blocks
                    .filter((it): it is TextBlock => it.type === "p" || it.type === "header")
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


// postInfoオブジェクトから投稿再現htmlを作る
function createPostHtmlFromPostInfo(postInfo: PostInfo, coverFilename?: string): string {
    const header: string = (coverFilename ? createImg(coverFilename) : '') + createTitle(postInfo.title);
    const body: string = (() => {
        switch (postInfo.type) {
            case "image":
                return postInfo.body.images.map((it, i) => createImg(getImageName(it, postInfo.title, i))).join("<br>\n") +
                    postInfo.body.text.split("\n").map(it => `<span>${it}</span>`).join("<br>\n");
            case "file":
                return postInfo.body.files.map((it, i) => createFile(getFileName(it, postInfo.title, i))).join("<br>\n") +
                    postInfo.body.text?.split("\n").map(it => `<span>${it}</span>`).join("<br>\n");
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

// ルートのhtml
function createRootHtmlFromPosts(): string {
    return Object.entries(dlList.posts).map(([title, post]) => {
        return `<a class="hl" href="./${title}/index.html"><div class="root card">\n` +
            `<img class="card-img-top gray-card" ${post.cover ? `src="./${title}/${post.cover.filename}"` : ''}/>\n` +
            `<div class="card-body"><h5 class="card-title">${title}</h5></div>\n</div></a><br>\n`
    }).join('\n');
}

// タイトル
function createTitle(title: string): string {
    return `<h5>${title}</h5>\n`;
}

// 画像表示
function createImg(filename: string): string {
    return `<a class="hl" href="./${filename}"><div class="post card">\n` +
        `<img class="card-img-top" src="./${filename}"/>\n</div></a>`;
}

// ファイル表示
function createFile(filename: string): string {
    return `<span><a href="./${filename}">${filename}</a></span>`;
}

// bodyからhtmlをつくる
function createHtml(title: string, body: string): string {
    return `<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8" />\n<title>${title}</title>\n` +
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous">\n' +
        '<style>div.main{width: 600px; float: none; margin: 0 auto} a.hl,a.hl:hover {color: inherit;text-decoration: none;}div.root{width: 400px} div.post{width: 600px}div.card {float: none; margin: 0 auto;}img.gray-card {height: 210px;background-color: gray;}</style>\n' +
        `</head>\n<body>\n<div class="main">\n${body}\n</div>\n` +
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>\n' +
        '</body></html>';
}


type PostInfo = {
    title: string,
    feeRequired: number,
    id: string,
    coverImageUrl: string | null,
    excerpt: string,
    tags: string[],
    // DateはJSON.parseで文字列扱い
    publishedDatetime: string,
    updatedDatetime: string,
} & ({
    type: "image",
    body: { text: string, images: ImageInfo[] },
} | {
    type: "file",
    body: { text?: string, files: FileInfo[] }, // TODO textが存在するか要確認
} | {
    type: "article",
    body: { imageMap: Record<string, ImageInfo>, fileMap: Record<string, FileInfo>, blocks: Block[] },
} | { type: "text", body: {} });
type ImageInfo = { originalUrl: string, extension: string };
type FileInfo = { url: string, name: string, extension: string };
type ImageBlock = { type: 'image', imageId: string };
type FileBlock = { type: "file", fileId: string };
type TextBlock = { type: "p" | "header", text: string };
type UnknownBlock = { type: "unknown" };
type Block = ImageBlock | FileBlock | TextBlock | UnknownBlock;
type DlInfo = { url: string, filename: string };
