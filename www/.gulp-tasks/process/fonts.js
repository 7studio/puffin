const paths = {
    src: [
        'src/assets/fonts/**/*',
        '!src/assets/fonts/generator_config.txt'
    ],
    dest: 'dist/assets/fonts'
};

export default (gulp, done) => {
    return gulp.src(paths.src)
        .pipe(gulp.dest(paths.dest));
}
