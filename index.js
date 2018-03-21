const express = require('express');
const app = express();

const { getHTML } = require('./htmlGrabber');
const { getScreenshots } = require('./screenshotter');
const { zipFiles } = require('./zipper');

app.get('/api/screenshot/desktop/:slug', async (req, res) => {
  const { slug } = req.params;
  const url = `https://hardcore-volhard-1376cc.netlify.com/discover/${slug}`;

  await getScreenshots(url);
  await getHTML(url);
  await zipFiles();

  const file = `${__dirname}/test.zip`;

  res.download(file);
});

app.listen(3000, () => console.log('Listening on port 3000'));
