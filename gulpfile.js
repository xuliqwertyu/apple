//引入gulp
var gulp=require('gulp');
//引入gulp-stylus插件
var stylus=require('gulp-stylus')
//创建一个编译stylus的任务
gulp.task('stylus',function(){
	//获取要编译的文件
	//指定一个文件
	//gulp.src('./stylus/index.styl')
	//指定多个文件
	//gulp.src(['./stylus/index.styl','./stylus/css.styl'])
	//指定一个目录下所有(不包含子目录)
	//gulp.src('./stylus/*.styl')
	//指定一个目录及所有子目录下的文件
	return gulp.src('./stylus/**/*.styl')
		//执行stylus编译
		.pipe(stylus())
		//输出编译后的文件
		.pipe(gulp.dest('./public/css'))
})
//创建一个default任务
gulp.task('logs',function(){
	console.log('this is log')
})
gulp.task('default',function(){
	console.log('this default')
});
gulp.task('es6',function(){
	console.log('this es6')
});
gulp.task('css',function(){
	console.log('this css')
});
gulp.task('all',['logs','es6','css'],function(){
	console.log('this is all')
});

gulp.task('minijs',['es6'],function(){
	console.log('this is minijs')
})	
//先执行es6，后执行minijs
//
var minifycss=require('gulp-minify-css')

gulp.task('minifycss',['stylus'],function(){
	return gulp.src('./public/css/**/*.css')
			.pipe(minifycss())
			.pipe(gulp.dest('./public/mincss'))
})
var uglify=require('gulp-uglify')
gulp.task('uglify',function(){
	return gulp.src('./public/js/**/*.js')
			.pipe(minifycss())
			.pipe(gulp.dest('./public/minjs'))
})

gulp.task('watcher',['stylus', 'browserSync'],function(){
	 gulp.watch('./public/js/**/*.js',['uglify']);
	 gulp.watch('./stylus/**/*.styl',['stylus']);
	 gulp.watch([
	 		'./public/css/**/*.css',
	 		'./public/minjs/**/*.js'
	 ]).on('change',function(){
	 		reload();
	 })
})

var nodemon=require('gulp-nodemon')
	gulp.task('nodemon',function(ab){
	var ft=false;
	return nodemon({
	script:'./app.js'
	}).on('start',function(){
		if(!ft){
			ab();
			ft=true;
		}
	})
	})
	var browserSync=require('browser-sync').create()
	var reload=browserSync.reload

	gulp.task('browserSync',['nodemon'],function(){
		browserSync.init({
		proxy:{
			target:'http://127.0.0.1:9999'
		},
		files:['*'],
		port:9888,
		open:false
		})
	})