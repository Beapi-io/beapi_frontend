# ORP-scheduler (frontend)

## ENVIRONMENT SETUP
1. Make sure you are using a version of Node.js greater than 6.X
2. Install PM2 to allow us to start/stop Node as a service.
```
sudo npm install pm2 -g
```

2. change the port that node listens on
```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/bin/nodejs
```

## INSTALLATION (this can all be an install script in future)
1. add 'orp' user
```
useradd orp -d /home/beapi
```
2. move application to /usr/share
```
sudo mkdir /usr/share/beapi
mv orp_frontend /usr/share/beapi/frontend
```
3. Copy your service file into the /etc/systemd/system.
4. Start it with:
```
systemctl start beapi_frontend
```
Enable it to run on boot with:
```
systemctl enable beapi_frontend
```

Pulling new changes on the server currently rtequires:
```
sudo git -c http.sslVerify=false pull
```
