#!/bin/sh
echo Running mindoo/node-bash-alpine with mounted app directory
docker run --rm -it -v $PWD/app:/app -v $PWD/files:/files -v $PWD/tmp:/tmp/tmpimages -p 4400:4000 mindoo/node-bash-alpine:13-3.10 bash

