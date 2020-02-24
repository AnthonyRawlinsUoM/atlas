#!/usr/bin/env bash
set -ex

USERNAME=anthonyrawlinsuom
IMAGE=pba_web

OLD_PACKAGE_VERSION=`node -pe "require('./package.json').version"`
echo "previous version: $OLD_PACKAGE_VERSION"
npm version major
PACKAGE_VERSION=`node -pe "require('./package.json').version"`
echo $PACKAGE_VERSION>"VERSION"
version=`cat VERSION`
echo "build version: $version"

# run build
make build

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
# push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version
