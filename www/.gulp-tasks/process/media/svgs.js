// Thanks to https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md

import glob from 'glob';
import path from 'path';

const paths = {
    src: [
        'src/assets/media/svgs/**/*',
        '!src/assets/media/svgs/**/*.bkp',
        '!src/assets/media/svgs/**/{spr-*,spr-*/**/*}'
    ],
    dest: 'dist/assets/media/svgs'
};

export default (gulp, done) => {
    const sprites = glob.sync('src/assets/media/svgs/**/spr-*/');
    const tasks = sprites.map((sprite) => {
        const destpath = path.dirname(sprite).replace(/src\/assets/, 'dist/assets');

        return gulp.src([
                path.join(sprite, '/**/*.svg'),
                `!${path.join(sprite, '**/*.bkp')}`,
                `!${sprite}`
            ])
            // Fix https://github.com/w0rm/gulp-svgstore/issues/81
            .pipe($.cheerio({run: function ($) {
                    let $svg = $('svg');
                    var svg_attrs = $svg[0].attribs;

                    const svg_prez_attrs = Object.keys(svg_attrs).filter(a => /^stroke|fill/.test(a));
                    if (svg_prez_attrs.length) {
                        var g_attrs = '';

                        svg_prez_attrs.forEach(spa=>g_attrs+=` ${spa}="${svg_attrs[spa]}"`);

                        $svg.html(`<g${g_attrs}>${$svg.html()}</g>`);
                    }
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.svgstore({ inlineSvg: true }))
            .pipe(gulp.dest(destpath));
    });

    return gulp.src(paths.src)
        .pipe(gulp.dest(paths.dest));
}
