const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const port = 4000;
const imagesDirIn = '/files';
const tmpImagesDirPathOut = '/tmp/tmpimages';

const app = express();

const createTmpFile = (fileType) => {
  const tmpFileName = 'img_' + new Date().getTime() + '_' + crypto.randomBytes(4).readUInt32LE(0) + '.' + fileType;
  const tmpFilePath = tmpImagesDirPathOut + '/' + tmpFileName;
  return tmpFilePath;
}

if (!fs.existsSync(tmpImagesDirPathOut)) {
  fs.mkdirSync(tmpImagesDirPathOut);
}

app.get('/ping', (request, response) => {
  response.send('Pong!');
});

app.get('/resize/:width/:height/:filename*', (request, response) => {
  const { width , height } = request.params;
  const iWidth = parseInt(width);
  const iHeight = parseInt(height);

  let filename = request.params.filename;

  if (!filename) {
    return response.status(400).send({
      message: 'Filename parameter is missing'
    });
  }

  if (request.params.hasOwnProperty('0')) {
    filename = filename + request.params['0'];
  }

  if (filename.indexOf("..") !== -1 || filename.indexOf(":") !== -1) {
    return response.status(403).send({
      message: 'Invalid filename: ' + filename
    });
  }

  const imgFilePath = path.join(imagesDirIn, filename);

  if (!fs.existsSync(imgFilePath)) {
    return response.status(400).send({
      message: 'Image file not found: ' + filename
    });
  }

  let fileType = request.query.targetformat;
  if (!fileType) {
    const iPos = filename.lastIndexOf('.');
    fileType = iPos==-1 ? "png" : filename.substring(iPos+1).toLowerCase();
  }
  
  const tmpFilePath = createTmpFile(fileType);

  sharp(imgFilePath)
    .resize(iWidth, iHeight, { fit: 'inside' })
    .toFormat(fileType)
    .toFile(tmpFilePath, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        response.sendFile(tmpFilePath, () => { fs.unlinkSync(tmpFilePath); });
      }
    })
});

app.get('/crop/:width/:height/:filename*', (request, response) => {
  const { width , height } = request.params;
  const iWidth = parseInt(width);
  const iHeight = parseInt(height);

  let filename = request.params.filename;

  if (!filename) {
    return response.status(400).send({
      message: 'Filename parameter is missing'
    });
  }

  if (request.params.hasOwnProperty('0')) {
    filename = filename + request.params['0'];
  }

  if (filename.indexOf("..") !== -1 || filename.indexOf(":") !== -1) {
    return response.status(403).send({
      message: 'Invalid filename: ' + filename
    });
  }

  let fileType = request.query.targetformat;
  if (!fileType) {
    const iPos = filename.lastIndexOf('.');
    fileType = iPos==-1 ? "png" : filename.substring(iPos+1).toLowerCase();
  }

  const imgFilePath = path.join(imagesDirIn, filename);

  const tmpFilePath = createTmpFile(fileType);

  sharp(imgFilePath)
  .extract({ left: 0, top: 0, width: iWidth, height: iHeight })
  .toFormat(fileType)
  .toFile(tmpFilePath, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      response.sendFile(tmpFilePath, () => { fs.unlinkSync(tmpFilePath); });
    }
  });

});

app.listen(port, () => {
  console.log(`Image resize server is running...`);
});
