#!/usr/bin/env bash

npm version patch

docker build -t anthonyrawlinsuom/pba_web:latest .
docker push anthonyrawlinsuom/pba_web:latest
