module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var getFileAbsPath = function(fileDir){
    var rootPath="";
    var dir = fileDir.replace('dist\/html\/','');
    var len = dir.split('\/').length;
    for(var i=0;i<len;i++){
      rootPath = rootPath + "../";
    }
    return rootPath;
  }

  //读取配置
  var cfg = {};

  grunt.initConfig({

    clean: {
      before:['dist/html/**'],
      after:["dist/html/blog/home/*.js"]
    },

    //复制图片
    copy: {
      src: {
        files: [
          {
            expand: true, cwd: 'src', src: [
            '**', '!**/**.md'
          ], dest: 'dist/html'
          }
        ]
      },
      css: {
        files: [
          {expand: true, cwd: 'src', src: ['css/*.css'], dest: 'dist/html'}
        ]
      },
      image: {
        files: [
          {
            expand: true,
            cwd: 'images',
            src: [
              'images/*.{png,jpg,jpeg,gif}'
            ],
            dest: 'dist/html'
          }
        ]
      }
    },

    includereplace: {
      html: {
        files: [
          {
            expand: true,
            src: "dist/html/blog/home/*.html"
          }]
      }
    },

    inline: {
      dist: {
        src: 'dist/html/blog/home/index.html',
        dest: 'dist/html/blog/home/index.html'
      }
    },

    useminPrepare: {
      options: {
        staging: 'dist/.tmp',
        dest: 'dist/html',
        flow: {
          prod:{
            steps: {'js' : ['concat'] , 'css':['concat']},
            post: {}
          }
        }
      },
      prod: {
        files: [{expand: true, cwd: 'src', src: ['template/artTemplate/*.html',
          'blog/**/*.html'], dest: 'dist/html'}]
      }
    },

    // 修改grunt-usemin-fix 插件 fileprocessor.js 方法 FileProcessor.prototype.replaceBlocks, 为block增加属性dir
    //file.blocks.forEach(function (block) {
    //  block.dir = file.dir;  增加这一行
    //  var blockLine = block.raw.join(linefeed);
    //  result = result.replace(blockLine, this.replaceWith(block));
    //}, this);
    usemin: {
      options: {
        root: 'dist/html/',
        blockReplacements: {
          css: function (block) {
            return '<link rel="stylesheet" href="' + getFileAbsPath(block.dir)  + block.dest + '"/>';
          },
          js: function (block) {
            return '<script src="' + getFileAbsPath(block.dir) + block.dest + '"></script>';
          }
        }
      },
      html: 'dist/html/blog/home/*.html'
    }
  });

  grunt.registerTask('js-css-concat', [
    'useminPrepare',
    'concat:generated',
    'usemin'
  ]);

  grunt.registerTask('dev', ['clean:before', 'copy', 'includereplace:html']);

  grunt.registerTask('publish', ['clean:before', 'copy', 'includereplace:html', 'js-css-concat','inline','clean:after']);

};
