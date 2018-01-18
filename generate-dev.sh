sudo mkdocs build --clean -f mkdocs-web.yml
cd ../openvidu.io
rm -rf docs
cd ../openvidu.io-docs
rsync -av site/ ../openvidu.io/docs/
