#!/bin/bash

if [[ -z "$VERSION" ]]; then
    echo "Example of use: \"VERSION=2.13.0 ${0}\"" 1>&2
    exit 1
fi

echo "Building docs for version ${VERSION}" 1>&2

git clone git@github.com:OpenVidu/openvidu.io-docs.git
cd openvidu.io-docs
git branch $VERSION
git checkout $VERSION
# Overwrite base href from "/" to "/en/VERSION/"
sed -i -e 's|<base href="/">|<base href="/en/'${VERSION}'/">|g' custom_theme/base.html
git add custom_theme/base.html
git commit -m "Updated base href element"
git checkout master
git push origin $VERSION