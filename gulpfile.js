var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    rimraf = require('rimraf'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    browsersync = require('browser-sync').create(),
    minify = require('gulp-minify'),
    reload = browsersync.reload;

var path = {
	src: {
		html: 'src/**/*.html',
		css: 'src/css/main.scss',
        scss: 'src/css/*.scss',
		cssInclude: 'src/css/include/*.css',
		js: 'src/js/common.js',
		jsInclude: 'src/js/include/*.js',
		img: 'src/img/*.*',
		images: 'src/images/*.*',
		fonts: 'src/fonts/*.*'
	},
	dist: {
		html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/',
        images: 'dist/images/',
        fonts: 'dist/fonts/',
	},

	srcMain: './src',
	distMain: './dist'
};

gulp.task('html-build', function(){
    return gulp.src(path.src.html)
        .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browsersync.stream());
});

gulp.task('js-build', function(){
    return gulp.src(path.src.js)
        .pipe(minify({noSource: true, ext:{
            min:'.min.js'
        }}))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browsersync.stream());
});

gulp.task('js-build-include', function(){
    return gulp.src(path.src.jsInclude)
        .pipe(minify({
            noSource: true,
            ext:{
                min:'.min.js'
            },
            ignoreFiles: ['*.min.js']
        }))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browsersync.stream());
});

gulp.task('css-build', function(){
    return gulp.src(path.src.css)
        .pipe(sass({includePaths: require('node-normalize-scss').includePaths, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefixer({overrideBrowserslist: ['last 5 versions'],}))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browsersync.stream());
});

gulp.task('css-build-include', function(){
    return gulp.src(path.src.cssInclude)
        .pipe(gulp.dest(path.dist.css))
        .pipe(browsersync.stream());
});

gulp.task('img-build', function(){
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(browsersync.stream());
});

gulp.task('images-build', function(){
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.dist.images))
        .pipe(browsersync.stream());
});

gulp.task('fonts-build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('clean-dist', function (cb) {
    console.log('Cleaning project..');
    rimraf(path.distMain, cb);
    setTimeout(function(){
    mkdirp('./'+path.dist.html);
    mkdirp('./'+path.dist.js);
    mkdirp('./'+path.dist.css);
    mkdirp('./'+path.dist.img);
    mkdirp('./'+path.dist.fonts);
    mkdirp('./'+path.dist.images);
    },1000);
    console.log('Compile last build..');
    setTimeout(function(){
        gulp.start(['build']);
    },2000);

    return 1;
});

gulp.task('clean-src', function (cb) {
    console.log('Cleaning project build..');
    rimraf(path.srcMain, cb);
    setTimeout(function(){
    mkdirp('./src/');
    mkdirp('./src/js');
    mkdirp('./src/js/include/');
    mkdirp('./src/css');
    mkdirp('./src/css/include/');
    mkdirp('./src/img/');
    mkdirp('./src/images/');
    mkdirp('./src/fonts');
    },1000);
    setTimeout(function(){
        fs.writeFile('./src/js/common.js', '//wright code here', function(err) {
            if(err) {
                return console.log(err);
            }
        });
        fs.writeFile('./src/css/main.scss', '//wright code here', function(err) {
            if(err) {
                return console.log(err);
            }
        });
        fs.writeFile('./src/index.html', '//wright code here', function(err) {
            if(err) {
                return console.log(err);
            }
        });
    },3000);
    console.log('Complete..');

    return 1;
});

gulp.task('watch', gulp.series(['html-build', 'css-build', 'css-build-include', 'js-build', 'js-build-include', 'img-build', 'images-build', 'fonts-build'], function(){

    gulp.watch([path.src.html], gulp.series(['html-build']));
    gulp.watch([path.src.scss], gulp.series(['css-build']));
    gulp.watch([path.src.cssInclude], gulp.series(['css-build-include']));
    gulp.watch([path.src.js], gulp.series(['js-build']));
    gulp.watch([path.src.jsInclude], gulp.series(['js-build-include']));
    gulp.watch([path.src.img], gulp.series(['img-build']));
    gulp.watch([path.src.images], gulp.series(['images-build']));
    gulp.watch([path.src.fonts], gulp.series(['fonts-build']));

    browsersync.init({
        server: path.distMain,
        open: false
    });
}));


gulp.task('default', gulp.series(['watch']));
