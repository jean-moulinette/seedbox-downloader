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
  // for starting the project in dev
  seedbox-downloader start --dev -p 1337 -d ~/Downloads -a ~/.htpasswd

  options :
    -p : port number
    -d : seedbox directory path
    -a : htpasswd file path (optional)
    --dev : dev mode (optional)
```

## Contribute

  If you want to work on the project, run `npm run dev` to start.
