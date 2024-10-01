#!/bin/bash

npm install
npm run build
sudo npm install -g serve
sudo serve -p 80 -s build