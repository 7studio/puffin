import del from 'del';
import fs from 'fs';
import path from 'path';
import pugBEMify from 'pug-bemify';

const paths = {
    src: [
        'src/**/*.pug',
        '!src/assets/**/*',
        '!src/_includes/**/*'
    ],
    dest: 'dist'
};

export default (gulp, done, all = true) => {
    gulp.src('src/_data/*')
        .pipe($.if(/\.(yml)$/i, $.yaml()))
        .pipe($.if(/\.(js)$/i, $.tap(file => {
            delete require.cache[require.resolve(file.path)];

            let data = require(file.path);
                data = JSON.stringify(data);
                data = data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');

            file.contents = Buffer.from(data, 'utf-8');
        })))
        .pipe($.mergeJson({
            fileName: 'data.json',
            edit: (json, file) => {
                const key = path.basename(file.path, path.extname(file.path));

                let j = {site: {data: {}}};

                if (key == 'site') {
                    j.site.data = json;
                } else {
                    j.site.data[key] = json;
                }

                return j;
            }
        }))
        .pipe(gulp.dest('.pug-temp'))
        .on('end', () => {
            const data = JSON.parse(fs.readFileSync(`${process.cwd()}/.pug-temp/data.json`));

            return gulp.src(paths.src)
                .pipe($.if(!all, $.changedInPlace({firstPass: true})))
                .pipe($.debug({title: 'Processing'}))
                .pipe($.data(() => data))
                .pipe($.pug({
                  /*plugins: [pugBEMify()],*/
                    basedir: `${process.cwd()}/src/_includes`,
                    pretty: false,
                    locals: {
                        require: (file_path) => require(file_path),
                        size: (data) => {
                            if (Array.isArray(data) || typeof data === 'string') {
                                return data.length;
                            } else {
                                return Object.keys(data).length
                            }
                        },
                        icon_loader: (file_path, fragment) => `#${fragment}`
                    }
                }))
                .pipe($.cheerio({run: function ($) {
                        $('*').contents().map((i, el) => {
                            if (el.type === 'comment' && el.data.trim().match(/^prettier/)) {
                                el.data += ' ';
                                $(el.next).before("\n");
                            }
                        })
                    },
                    parserOptions: {
                        xmlMode: false,
                        decodeEntities: false
                    }
                }))
                .pipe($.prettier({
                    tabWidth: 4,
                    useTabs: false,
                    parser: "html",
                    htmlWhitespaceSensitivity: "css",
                    endOfLine: "lf"
                }))
                .pipe(gulp.dest(paths.dest))
                .on('end', () => {
                    del('.pug-temp');
                    done();
                });
        });
}
