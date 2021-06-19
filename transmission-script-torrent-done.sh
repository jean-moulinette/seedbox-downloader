#!/bin/bash

# transmission-daemon useful settings :
# {
#   "download-dir": "/path/to/seedbox/user/downloading",
#   "rpc-username": "", // set user name here to access the web client
#   "rpc-password": "", // set encoded password here to access the web client
#   "script-torrent-done-enabled": true, // will trigger this script on torrent download complete
#   "script-torrent-done-filename": "/path/to/transmission-script-torrent-done.sh",
# }


# You can use this script when having transmission-daemon as torrent client
# As transmission will perform a copy paste when moving files from downloading folder
# to the path configured in "download-dir" set in the settings.json this script
# will perform a move instead to avoid triggering seedbox-downloader directory
# watcher while the directory is not completely pasted

destinationPath="/path/to/seedbox/directory/download"
mv "${TR_TORRENT_DIR}"/"${TR_TORRENT_NAME}" "${destinationPath}"