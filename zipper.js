const fs = require('fs');
const path = require('path');
const { zipDirectories } = require('./utils');

module.exports = {
  zipFiles: function (slug, directories) {
    // The zip library needs to be instantiated:
    const zip = new require('node-zip')();


    // You can add multiple files by performing subsequent calls to zip.file();
    // the first argument is how you want the file to be named inside your zip,
    // the second is the actual data:
    zip.file(
      'content.html',
      fs.readFileSync(path.join(__dirname, 'content.html'))
    );
    zip.file(
      'desktop-screenshot.png',
      fs.readFileSync(
        path.join(__dirname, 'desktop-screenshot.png')
      )
    );
    zip.file(
      'mobile-screenshot.png',
      fs.readFileSync(path.join(__dirname, 'mobile-screenshot.png'))
    );

    // function that zips all the images file in images folder
    zipDirectories(zip, directories);

    const data = zip.generate({ base64: false, compression: 'DEFLATE' });

    // it's important to use *binary* encode
    fs.writeFileSync(`${slug}.zip`, data, 'binary');
  }
};
