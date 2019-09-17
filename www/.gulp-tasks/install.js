import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import del from 'del';

const PACKAGE_BLACKLIST = ['@babel/polyfill', 'core-js'];

export default (gulp, done) => {
    let dir_names = glob.sync('src/assets/vendor/**/');
        dir_names = dir_names.filter(dn => path.basename(dn)!='vendor');
        dir_names = dir_names.map(dn => path.basename(dn));

    delete require.cache[require.resolve(`${process.cwd()}/package.json`)];
    let pkg = require(`${process.cwd()}/package.json`);

    let package_names = Object.keys(pkg.dependencies);
        package_names = [
            ...package_names.filter(x => !PACKAGE_BLACKLIST.includes(x)),
            ...PACKAGE_BLACKLIST.filter(x => !package_names.includes(x))
        ];

    package_names.map((pn) => {
        const chars = {'@': '', '/': '-'};
        const package_dirname = pn.replace(/^@|\//g, m => chars[m]);

        const PACKAGE_VENDOR_DIR = `${process.cwd()}/src/assets/vendor/${package_dirname}`;

        const PACKAGE_DIR = `${process.cwd()}/node_modules/${pn}`;
        const PACKAGE_INFOS = require(`${PACKAGE_DIR}/package.json`);

        if (dir_names.includes(package_dirname) && fs.existsSync(PACKAGE_VENDOR_DIR)) {
            del.sync([`${PACKAGE_VENDOR_DIR}/**`, PACKAGE_VENDOR_DIR]);
        }

        let copy = PACKAGE_INFOS.files || [];
            copy = copy.filter(c => c!='src');

        if (PACKAGE_INFOS.main/*&& PACKAGE_INFOS.main.match(/^dist/i)*/) {
            copy.push(PACKAGE_INFOS.main);
        }

        if (fs.existsSync(`${PACKAGE_DIR}/dist`)) {
            copy.push('dist');
        }

        // Specific cases
        if (pn == '@fortawesome/fontawesome-free') {
            copy.push( '' );
        }

        copy = [...new Set(copy)];

        fs.mkdirSync(PACKAGE_VENDOR_DIR);
        const copyLen = copy.length;
        copy.map((c, i) => {
            try {
                if (c.match(/dist$/gi)) {
                    fs.copySync(`${PACKAGE_DIR}/${c}`, PACKAGE_VENDOR_DIR);
                } else {
                    fs.copySync(`${PACKAGE_DIR}/${c}`, `${PACKAGE_VENDOR_DIR}/${c.replace(/^\/?dist\//gi, '')}`);
                }

                if (copyLen === i + 1) {
                    $.util.log($.util.colors['green']('✔') + ' ' + pn +': `src/assets/vendor/' + package_dirname + '`');
                }
            } catch (err) {
                console.error(err);
            }
        });
    });

    done();
}
