import emptyDir from 'empty-dir';

const paths = {
    src: [
        'src/assets/media/**/*',
        '!src/assets/media/**/*.bkp',
        '!src/assets/media/{svgs,svgs/**}'
    ],
    dest: 'dist/assets/media'
};

export default (gulp, done) => {
    return gulp.src(paths.src)
        .pipe($.filter(file => !file.isDirectory() || emptyDir.sync(file.path, (filepath) => !/(Thumbs\.db|\.DS_Store)$/i.test(filepath))))
        .pipe(gulp.dest(paths.dest));
}
