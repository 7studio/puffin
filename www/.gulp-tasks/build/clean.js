import del from 'del';

export default (gulp, done) => {
    return del([
        'dist/assets/{styles,scripts}/**/*.+(map|css|js)',
        '!dist/assets/{styles,scripts}/**/*.min.+(css|js)'
    ]);
}
