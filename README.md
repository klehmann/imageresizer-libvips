# Image resize server
Contains Dockerfiles to build a Node.js based image resize server which uses sharp/libvips to return a resized/cropped version of an image in the mapped filesystem.

[Libvips](https://libvips.github.io/libvips/) is a fast image processing library with low memory needs. It has a much better throughput compared to GraphicsMagick.

[Sharp](https://sharp.pixelplumbing.com/) wraps Libvips as a Node.js module.

## Installation
* follow the instructions in directory "node-bash" to build a Docker image with Node.js and bash (added for development purpose on top of Alpine)
* now build the Docker image for the image resize server in directory "resizeserver"

## Usage
Run the container with the commands/parameters listed in "resizeserver/dockerrun.sh". This mounts a local directory into the Docker container and starts the server on port 4400.

There are two types of URLs: one to resize and another one to crop the image. In the example below we use with=500px and height=400px and process the image filepath "subdir/DSC00191.JPG" within the image base directory.

* [http://localhost:4400/resize/500/400/subdir/DSC01888.JPG](http://localhost:4400/resize/500/400/subdir/DSC00191.JPG)
* [http://localhost:4400/crop/500/400/subdir/DSC01888.JPG](http://localhost:4400/crop/500/400/subdir/DSC00191.JPG)

## License
The code is available under Apache 2.0 license.

Copyright by [Mindoo GmbH](http://www.mindoo.com)

## Credits
* Node.js server idea and sourcecode are inspired by [this blog article](https://blog.campvanilla.com/nodejs-graphicsmagick-cropping-resizing-server-api-b410fe98e41)
* Performance comparison between various resize libraries (e.g. GraphicsMagick and libvips): [article link](https://sharp.pixelplumbing.com/performance)