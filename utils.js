const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const createDirsIfNotExist = (directories) => {
  return new Promise((resolve) => {
    for (dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    resolve(true)
  })
}

const deleteZip = (file) => {
  // if file is an array delete all the directories
  if (Array.isArray(file)) {
    return () => {
      for (const f of file) {
        rimraf(f, () => { })
      }
    }
  }
  // default to just deleting single file
  return () => {
    fs.unlink(file, err => {
      if (err) throw err;
      return true;
    })
  }
}

const zipDirectories = (zip, directories) => {
  for (dir of directories) {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (file of files) {
      zip.file(`${dir}/${file}`, fs.readFileSync(path.join(__dirname, dir, file)));
    }
  }
}

module.exports = {
  createDirsIfNotExist,
  deleteZip,
  zipDirectories
};