const fse = require('fs-extra');
const path = require('path');
fse.copySync(
  path.join('node_modules', '@psu-online-education'),
  'upstream-components',
  { overwrite: true }
);