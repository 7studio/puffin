
var rollup = require('rollup');

import glob from 'glob';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default async (gulp, done) => {
    const files = glob.sync('src/assets/scripts/**/*', {ignore: ['**/*.bkp', 'src/assets/scripts/{partials,wrappers}/**']});

    for (const file of files) {
        const bundle = await rollup.rollup({
            //input: `src/assets/scripts/${path.basename(file)}`,
            input: file,
            plugins: [
                babel(),
                nodeResolve(),
                commonjs(),
                sourcemaps()
            ]
        });

        await bundle.write({
            //file: `dist/assets/scripts/${path.basename(file)}`,
            file: file.replace(/^src\//, 'dist/'),
            format: 'iife',
            name: path.basename(file, path.extname(file)),
            //name: 'window',
            extend: true,
            sourcemap: true
        });

        $.util.log(`rollup.js: ${$.util.colors['green']('✔')} ${path.basename(file)}`);
    }

    done();
}



// Thanks to https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md

// import browserify from 'browserify';
// import babelify from 'babelify';

// const paths = {
//     src: [
//         'src/scripts/**/*.js',
//         '!src/scripts/**/*.bkp',
//         '!src/scripts/{partials,partials/**}'
//     ],
//     dest: 'public/scripts'
// };

// export default (gulp, done) => {
//     return gulp.src(paths.src, {read: false})
//         .pipe($.if(!args.all, $.changed(paths.dest)))
//         .pipe($.tap((file) => {
//             file.contents = browserify(file.path, {debug: true})
//                 .transform(babelify.configure(project.babel))
//                 .bundle();

//             $.util.log(`browserify: ${$.util.colors['green']('✔')} ${file.relative}`);
//         }))
//         .pipe($.buffer())
//         .pipe($.sourcemaps.init({loadMaps: true}))
//         .pipe($.sourcemaps.write('.'))
//         .pipe(gulp.dest(paths.dest));
// }
