import del from 'del';

export default (gulp, done) => {
    return del('dist');
}
