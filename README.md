```
nvm install 12
npm start
npm run build:watch
```

ENOSPC: System limit for number of file watchers reached

```
sudo gedit /etc/sysctl.conf
fs.inotify.max_user_watches=524288
sudo sysctl -p
```