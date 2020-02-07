#!/bin/bash
mkdocs build --clean -f mkdocs.yml
rm -rf ../openvidu.io/docs
rsync -av site/ ../openvidu.io/docs/