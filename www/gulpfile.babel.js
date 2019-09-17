import pkg from './package.json';
import path from 'path';
import del from 'del';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import tasksLoader from 'gulp-require-tasks';
import minimist from 'minimist';
import browserSync from 'browser-sync';

global.package = pkg;
global.args = minimist(process.argv.slice(2), {
    string: ['env'],
    boolean: ['all'], // obsolete since browserify was deprecated in flavour of rollup
    default: { all: false, env: 'development' }
});
global.$ = plugins();

function reload(done) {
  browserSync.reload();
  done();
}



/**
 *
 *
 */
tasksLoader({
    path: process.cwd() + '/.gulp-tasks',
    gulp: gulp
});



/**
 *
 *
 */
const processTask = gulp.series('process:fonts', 'process:media', 'process:vendor', 'process:styles', 'process:scripts', 'process:views-pug:changed');
      processTask.description = 'Process all files to build the website (scss, pug, etc).';
      processTask.displayName = 'process';

gulp.task(processTask);



/**
 *
 *
 */
const buildTask = gulp.series('build:media', 'build:styles', 'build:scripts', 'build:clean');
      buildTask.description = 'Build final assets version with minification, optimization.';
      buildTask.displayName = 'build';

gulp.task(buildTask);



/**
 *
 *
 */
function watchTask(done) {
    let watchers = {};

    //gulp.watch(['**/*.{pug,html,markdown,md,yml,json,xml}', '!dist/**/**'], gulp.series('process:jekyll', reload));
    gulp.watch(['src/_includes/**/*', 'src/_data/*.+(json|js|yml)'], gulp.series('process:views-pug:all', reload));
    watchers['views'] = gulp.watch(['src/**/*.pug', '!src/assets/**/*', '!src/_includes/**/*'], gulp.series('process:views-pug:changed', reload));
    watchers['styles'] = gulp.watch(['src/assets/styles/**/*.+(css|scss)'], gulp.series('process:styles', reload));
    watchers['scripts'] = gulp.watch(['src/assets/scripts/**/*.js'], gulp.series('process:scripts', reload));
    watchers['media:others'] = gulp.watch(['src/assets/media/**/*', '!src/assets/media/{svgs,svgs/**}'], gulp.series('process:media:others', reload));
    watchers['media:svgs'] = gulp.watch(['src/assets/media/{svgs,svgs/**}'], gulp.series('process:media:svgs', 'process:views-pug:all', reload));
    watchers['vendor'] = gulp.watch(['src/assets/vendor/**/*'], gulp.series('process:vendor', reload));
    watchers['fonts'] = gulp.watch(['src/assets/fonts/**/*'], gulp.series('process:fonts', reload));
    gulp.watch(['package.json'], gulp.series('install'));

    Object.values(watchers).forEach(watcher => {
        watcher.on('unlink', _unlinkSync);
        watcher.on('unlinkDir', _unlinkSync);
    });

    done();
}
function _unlinkSync(pathname) {
    const linkedExtnames = {'.pug':'.html', '.scss':'.css'};
    const extname = path.extname(pathname);
    let extindex = Object.keys(linkedExtnames).indexOf(extname);
    let destPathname = pathname.replace(/^src\//, 'dist/');

    if (extindex !== -1) {
        destPathname = destPathname.replace(new RegExp(`${extname}$`), linkedExtnames[extname]);
    }

    del.sync(destPathname);
}
watchTask.description = '…';
//watchTask.flags = {'-e': 'An example flag'};
watchTask.displayName = 'watch';

gulp.task(watchTask);



/**
 *
 *
 */
function browseTask(done) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        port: 4000
    });

    done();
}
browseTask.description = 'Start web server and serve `dist` folder.';
//browseTask.flags = {'-e': 'An example flag'};
browseTask.displayName = 'browse';

gulp.task(browseTask);



/**
 *
 *
 */
const serveTask = gulp.series('process', 'browse', 'watch');
      serveTask.description = '…';
      serveTask.displayName = 'serve';

gulp.task(serveTask);



/**
 *
 *
 */
gulp.task('default', gulp.series('clean', 'install', 'serve'));
