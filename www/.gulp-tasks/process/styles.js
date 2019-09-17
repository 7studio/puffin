import Fiber from 'fibers';
import sass from 'gulp-sass';
/*
import glob from 'glob';
import path from 'path';
*/

//sass.compiler = require('sass');

const paths = {
    src: [
        'src/assets/styles/**/*.+(scss|css)',
        '!src/assets/styles/{abstracts,base,components,layout}/**',
        '!src/assets/styles/**/_*',
        '!src/assets/styles/**/*.bkp'
    ],
    dest: 'dist/assets/styles'
};

export default (gulp, done) => {
    const processors = [
    /*
        require('postcss-import')({
            resolve: (id, base) => { return glob.sync(path.join(base, `${id}.+(scss|css)`)) },
        }),
        require('postcss-url')({url: 'rebase'}),
        require('postcss-custom-properties')(),
        require('postcss-custom-media')(),
    */
        require('postcss-import')({filter: url => /^(?!~).*\.css$/.test(url) }),
        require('postcss-url')({url: 'rebase'}),
        require('postcss-media-minmax')(),
        require('postcss-color-rgb')(),
        require('autoprefixer')({grid: 'autoplace'}),
        require('postcss-reporter')({clearReportedMessages: true})
    ];

    const importers = [
        require('node-sass-package-importer')(),
        require('node-sass-glob-importer')()
    ];

    return gulp.src(paths.src)
        .pipe($.debug({title: 'Processing'}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            importer: importers,
            fiber: Fiber,
            outputStyle: 'expanded'
        }).on('error', $.sass.logError))
        .pipe($.postcss(processors, {syntax: require('postcss-scss')}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
}
