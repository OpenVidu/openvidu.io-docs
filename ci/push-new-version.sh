#!/bin/bash

if [[ -z "$VERSION" ]]; then
    echo "Example of use: \"VERSION=2.13.0 ${0}\"" 1>&2
    exit 1
fi

echo "Building docs for version ${VERSION}" 1>&2

git clone git@github.com:OpenVidu/openvidu.io-docs.git
cd openvidu.io-docs
git branch $VERSION
git push origin $VERSION
cd ..
rm -rf openvidu.io-docs