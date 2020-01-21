#!/bin/sh
echo Starting resize server on port 4400
docker run --rm -it -v $PWD/files:/files -v $PWD/tmp:/tmp/tmpimages -p 4400:4000 mindoo/image-resize-server:sharp-1.0.0

