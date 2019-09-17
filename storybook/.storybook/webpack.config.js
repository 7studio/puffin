const path = require('path');
const glob = require('glob');
const Fiber = require('fibers');
const globImporter = require('node-sass-glob-importer');
const pugBEMify = require('pug-bemify');
const Color = require('color');
const feather = require('feather-icons')



let feater_icon_ids = Object.keys(feather.icons);

let app_icon_ids = glob.sync(path.join(__dirname, '../../www/src/assets/media/svgs/spr-icons/*.svg'));
    app_icon_ids = app_icon_ids.map(aii => path.relative(path.join(__dirname, '../../www/src/assets/media/svgs/spr-icons/'), aii).replace(/\.svg$/, ''));

let pug_data = require('./data/app-custom-name.json');
    pug_data.styles.icons = app_icon_ids.filter(x => feater_icon_ids.includes(x));
    pug_data.styles['custom-icons'] = app_icon_ids.filter(x => !pug_data.styles.icons.includes(x));



// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  config.module.rules = config.module.rules.filter(rule => !/\.html/.test(rule.test));

  config.module.rules.push({
    test: /\.html$/,
    use: [{
        loader: 'html-loader',
        options: {
            minimize: false,
            interpolate: true,
            root: path.join(__dirname, '../../www/src/assets'),
        }
    }]
  });

  config.module.rules.push({
    test: /\.pug$/,
    use: [{
        loader: 'html-loader',
        options: {
            minimize: false,
            interpolate: 'require',
            root: path.join(__dirname, '../../www/src/assets'),
        }
    },
    {
        loader: 'pug-html-loader',
        options: {
            basedir: path.join(__dirname, '../../www/src/_includes'),
          /*plugins: [pugBEMify()],*/
            pretty: false,
            data: {
                isLightColor: (string) => Color(string).luminosity() > .66667,
                require: (file_path) => require(file_path),
                size: (data) => {
                    if (Array.isArray(data) || typeof data === 'string') {
                        return data.length;
                    } else {
                        return Object.keys(data).length
                    }
                },
                icon_loader: (file_path, fragment) => `\${require(\`${file_path}\`)}#${fragment}`,
                ...(pug_data)
            }
        },
    }
    ]
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
    },
    {
        loader: 'css-loader',
        options: {
            url: true,
            sourceMap: true,
            importLoaders: 2
        }
    },
    {
        loader: "resolve-url-loader",
        options: {
            keepQuery: true,
            sourceMap: true,
            debug: false
        }
    },
    {
        loader: 'postcss-loader',
        options: { 
            ident: 'postcss',
            parser: 'postcss-scss',
            syntax: 'postcss-scss',
            sourceMap: true,
            plugins: (loader) => [
                require('postcss-import')({
                    filter: url => /^(?!~).*\.css$/.test(url), 
                    root: loader.resourcePath,
                    path: [path.join(__dirname, '../../www/src/assets/styles')],
                }),
                require('postcss-media-minmax')(),
                require('postcss-color-rgb')(),
                require('autoprefixer')({grid: 'autoplace'}),
                require('postcss-reporter')({clearReportedMessages: true})
            ]
        }
    },
    {
        loader: 'sass-loader',
        options: {
          //implementation: require("sass"),
          //fiber: Fiber,
            sassOptions: {
                indentWidth: 2,
                importer: globImporter(),
                includePaths: [path.join(__dirname, '../../www/src/assets/styles')],
            },
            sourceMap: true
        }
    }]
  });
  
  config.resolve.alias['svgs'] = path.join(__dirname, '../../www/dist/assets/media/svgs');
  config.resolve.extensions.push('.css', '.svg', '.html', '.pug');

  // Return the altered config
  return config;
};