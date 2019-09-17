import del from 'del';
import {exec, execSync} from 'child_process';
import yaml from 'js-yaml';
import fs from 'fs';

const paths = {
    src: ['**/*', '!**/*.bkp', '!_site,{,/**}', '!_assets/**', '!node_modules/**'],
    dest: '_build'
};

export default (gulp, done) => {
    // return exec('bundle exec jekyll build');

    try {
        const doc = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));

        let src = paths.src.slice(0);
            src = src.concat(doc.exclude.map(e => `!${e}`));

        return gulp.src(src)
            .pipe($.if(/\.pug$/i, $.pug({
                pretty: true,
                basedir: `${process.cwd()}/`,
                locals: {
                    require: (file_path) => require(file_path)
                }
            })))
            .pipe(gulp.dest(paths.dest))
            .on('end', () => {
                execSync(`bundle exec jekyll build -s ./${paths.dest} -d ./_site`);
                return del([ paths.dest ]);
            });
    } catch (e) {
        console.log(e);
        done();
    }
};
