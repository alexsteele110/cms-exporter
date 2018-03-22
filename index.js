const express = require('express');
const app = express();

const { getHTML } = require('./htmlGrabber');
const { getScreenshots } = require('./screenshotter');
const { zipFiles } = require('./zipper');

app.get('/api/export/:slug', async (req, res) => {
  const { slug } = req.params;
  const url = `https://hardcore-volhard-1376cc.netlify.com/discover/${slug}`;

  console.log('screenshot called');
  await getScreenshots(url);
  console.log('html called');
  await getHTML(url);
  console.log('zip called');
  await zipFiles();

  const file = `${__dirname}/test.zip`;

  res.download(file);
});

app.listen(3000, () => console.log('Listening on port 3000'));
