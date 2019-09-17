const paths = {
    src: 'src/assets/vendor/**/*',
    dest: 'dist/assets/vendor'
};

export default (gulp, done) => {
    return gulp.src(paths.src)
        .pipe(gulp.dest(paths.dest));
}
