# seedbox-downloader

Seedbox downloader allows you to serve a directory and it's content from a server on a beautiful web interface.

Typically, you would want to use this package to host the files downloaded by your seedbox.

Here is what it looks like

![seedbox-downloader_preview](https://raw.githubusercontent.com/Fanghornn/seedbox-downloader/master/seedbox-downloader-preview.png)
## Installation

Install the npm package globaly with your favorite package manager

```
npm install -g seedbox-downloader
```

Then you can start configuring how seedbox-downloader should behave.

```
seedbox-downloader config
```

The configuration allows you to choose on which internal port you want to use, then you have to specify which directory should be served.
(Note that you can use the `~` home alias)

Once you got everything configured, you can start it by using

```
seedbox-downloader start
```
