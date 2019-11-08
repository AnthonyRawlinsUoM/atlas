#!/usr/bin/env bash

npm version patch
ng build

docker build -t anthonyrawlinsuom/pba_web:latest .
docker push anthonyrawlinsuom/pba_web:latest
