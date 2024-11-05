# fanbox-downloader

Bookmarklet to batch download pixiv FANBOX posts as ZIP.

Translated into English (DeepL).

### 使い方

- https://narazaka.github.io/fanbox-downloader/

Bookmarklet:

```
javascript:import("https://fbdl.glaciyan.cc/fanbox-downloader.min.js").then(m=>m.main()).catch(e=>alert(`Error: (${e})`));
```

### Known Issues

- Some tools may not be able to unzip files over 4GB
- Unable to restore the original file names in some cases.
