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

Then you can start the seedbox-downloader by using the command:

```
seedbox-downloader start
```

The configuration asked first allows you to choose on which internal port you want to use, then you have to specify which directory should be served.
(Note that you can use the `~` home alias)

## Contribute

  If you want to work on the project, you need to use `seedbox-downloader start-dev` instead of the `seedbox-downloader start` command, then, you need to start webpack bundler watcher by using `yarn start`.
