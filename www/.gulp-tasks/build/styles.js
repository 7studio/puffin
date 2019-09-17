import prettyBytes from 'pretty-bytes';

const paths = {
    src: [
        'dist/assets/styles/**/*.css',
        '!dist/assets/styles/**/debug.css',
    ],
    dest: 'dist/assets/styles'
};
const CSSNANO = {
    autoprefixer: false,
    calc: false,
    colormin: true,
    convertValues: false,
    discardComments: true,
    discardDuplicates: false,
    discardEmpty: true,
    discardUnused: false,
    filterPlugins: false,
    mergeIdents: false,
    mergeLonghand: false,
    mergeRules: false,
    minifyFontValues: true,
    minifyGradients: false,
    minifySelectors: true,
    normalizeCharset: false,
    normalizeUrl: false,
    orderedValues: false,
    reduceIdents: false,
    reduceTransforms: false,
    svgo: true,
    uniqueSelectors: false,
    zindex: false
};

export default (gulp, done) => {
    const processors = [
        require('cssnano')(CSSNANO),
        require('postcss-reporter')({clearReportedMessages: true})
    ];

    return gulp.src(paths.src)
        .pipe($.bytediff.start())
        .pipe($.postcss(processors))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.bytediff.stop((data) => {
            const savedMsg = `saved ${prettyBytes(data.savings)} - ${(data.percent * 100).toFixed(1).replace(/\.0$/, '')}%`;
            const msg = data.savings > 0 ? savedMsg : 'already optimized';

            return `cssnano: ${$.util.colors['green']('✔')} ${data.fileName} ` + $.util.colors['grey'](`(${msg})`);
        }))
        .pipe(gulp.dest(paths.dest));
}
