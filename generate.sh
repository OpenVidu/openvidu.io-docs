#!/bin/bash

mkdocs build --clean -f mkdocs-web.yml 
git clone https://github.com/OpenVidu/openvidu.io.git openvidu.io
rsync -av site/ openvidu.io/docs/
cd openvidu.io/docs
git config user.name "pabloFuente"
git config user.email "openvidu@gmail.com"
git remote rm origin
git remote add origin https://pabloFuente:${GH_TOKEN}@github.com/openvidu/openvidu.io.git

if [[ -z $(git status -s) ]]
then
  echo "Nothing to commit"
else
  git add .
  git commit -m "Deploy from Travis CI"
  git pull origin master
  git push origin master
  echo "Changes has been commited to openvidu.io/docs"
fi
