const fs = require('fs');
const path = require('path');

module.exports = {
  zipFiles: function() {
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
      fs.readFileSync(path.join(__dirname, 'desktop-screenshot.png'))
    );
    zip.file(
      'mobile-screenshot.png',
      fs.readFileSync(path.join(__dirname, 'mobile-screenshot.png'))
    );

    const data = zip.generate({ base64: false, compression: 'DEFLATE' });

    // it's important to use *binary* encode
    fs.writeFileSync('test.zip', data, 'binary');
  }
};
