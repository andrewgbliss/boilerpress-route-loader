const glob = require('glob');
const express = require('express');
const path = require('path');

const router = express.Router();

module.exports = (cwd) => {
  const options = {
    cwd,
  };
  const files = glob.sync('**/*.js', options);
  files
    .filter(file => file.indexOf('index.js') === -1)
    .forEach((file) => {
      const name = file.substring(0, file.length - 3);
      router.use(`/${name}`, require(path.join(cwd, file)));
    });
  return router;
};
