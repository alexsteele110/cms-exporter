const express = require('express');
const app = express();

const { getHTML } = require('./htmlGrabber');
const { getScreenshots } = require('./screenshotter');
const { zipFiles } = require('./zipper');
const { createDirsIfNotExist, deleteZip } = require('./utils');

app.get('/api/export/:slug', async (req, res) => {
  const { slug } = req.params;
  const url = `https://hardcore-volhard-1376cc.netlify.com/discover/${slug}`;
  const directories = ['images'];

  console.log('screenshot called');
  await getScreenshots(url);
  console.log('createDirsIfNotExist called');
  await createDirsIfNotExist(directories);
  console.log('html called');
  await getHTML(url);
  console.log('zip called');
  await zipFiles(slug, directories);

  const file = `${__dirname}/${slug}.zip`;
  res.download(file);
  setTimeout(deleteZip(file), 5000);
  setTimeout(deleteZip(directories), 5000);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening on port 3000'));
