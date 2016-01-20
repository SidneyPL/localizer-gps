var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('build', function() {
    return browserify({
            entries: './public/javascripts/src/app.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'stage-0', 'react']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/javascripts/build'));
});

gulp.task('watch', ['build'], function(){
    gulp.watch('public/javascripts/src/**/*.jsx', ['build']);
})

gulp.task('default', ['watch']);