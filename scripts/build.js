const fs = require('fs');
const sass = require('sass');
const uglify = require('uglify-js');

let components_dir = 'components'

fs.readdirSync(components_dir).forEach(component => {
  const component_dir = components_dir + '/' + component;
  const src_dir = component_dir + '/src';

  const scss_src = src_dir + '/styles.scss';
  const js_src = src_dir + '/scripts.js';

  const dist_dir = component_dir + '/dist';

  // Compile and minify SCSS.
  if (fs.existsSync(scss_src)) {
    fs.mkdirSync(dist_dir, {
      recursive: true,
    });
    const result = sass.compile(scss_src, {
      style: 'compressed',
    });
    fs.writeFileSync(dist_dir + '/styles.css', result.css);
  }

  // Minify JS.
  if (fs.existsSync(js_src)) {
    fs.mkdirSync(dist_dir, {
      recursive: true
    });
    const input_code = fs.readFileSync(js_src).toString('utf-8');
    const result = uglify.minify(input_code, {
      compress: {
        inline: false,
      },
    });
    fs.writeFileSync(dist_dir + '/scripts.js', result.code);
  }
});
