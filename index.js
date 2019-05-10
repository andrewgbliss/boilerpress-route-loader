const glob = require('glob');
const express = require('express');
const path = require('path');

const router = express.Router();

module.exports = (cwd) => {
  const options = {
    cwd,
    ignore: [
      'index.js',
      '__tests__/**/*',
      '**/__tests__/**/*',
      'test/**/*',
      '**/test/**/*',
      '__test__/**/*',
      '**/__test__/**/*',
      'node_modules/**/*',
      '**/node_modules/**/*'
    ]
  };
  const files = glob.sync('**/*.js', options);
  files
    .forEach((file) => {
      const name = file.substring(0, file.length - 3);
      router.use(`/${name}`, require(path.join(cwd, file)));
    });
  return router;
};
