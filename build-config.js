const host = 'https://demo.test/'
const dest = './dist'

function getCopyConfig (source) {
  return {
    from: source,
    to: './',
    noErrorOnMissing: true,
    globOptions: {
      ignore: [
        '**/*.js',
        '**/*.scss',
        '**/*.php',
        '**/*.twig',
        '**/screenshot.png',
        '**/README.md'
      ]
    }
  }
}

module.exports = {
  webpack: {
    entry: {
      'assets/main': './assets/main.js',
      'assets/admin': './assets/admin.js'
    },
    copy: {
      patterns: [
        getCopyConfig('./Components/**/*'),
        getCopyConfig('./assets/**/*')
      ]
    }
    // purgeCss: {
    //   usePurgeCss: false,
    //   options: {
    //     paths: [
    //       require('path').join(__dirname, '*.php'),
    //       require('path').join(__dirname, 'templates/**/*'),
    //       require('path').join(__dirname, './Components/**/*.{php,twig}'),
    //       require('path').join(__dirname, './assets/**/*.js')
    //     ],
    //     only: ['main']
    //   }
    // }
  },
  browserSync: {
    ghostMode: false,
    open: false,
    proxy: {
      target: host,
      ws: false
    },
    watchOptions: {
      ignoreInitial: true
    },
    injectChanges: true,
    reloadDebounce: 1000,
    ui: false,
    files: [
      '*.php',
      'templates/**/*',
      'lib/**/*',
      'inc/**/*',
      './Components/**/*.{php,twig}'
    ],
    watch: true,
    https: true
  },
  webpackDevMiddleware: {
    stats: false,
    writeToDisk: true
  },
  gulp: {
    dest: dest,
    rev: {
      src: dest + '/**/*.*',
      srcRevved: [dest + '/**/*.{js,css}', '!' + dest + '/style.css'],
      srcStatic: dest + '/**/*.{html,php,twig}',
      assetSrc: [
        dest + '/**/*',
        '!' + dest + '/**/*+(css|js|json|html|php|twig|pot|md|htc|swf|xap)',
        '!' + dest + '/style.css',
        '!' + dest + '/screenshot.png',
        '!' + dest + '/favicon.ico',
        '!' + dest + '/favicon.png',
        '!' + dest + '/apple-touch-icon-180x180.png',
        '!' + dest + '/apple-touch-icon.png',
        '!' + dest + '/**/screenshot.png'
      ],
      revvedFileExtensions: ['.js', '.css'],
      staticFileExtensions: ['.html', '.php', '.twig']
    },
    replaceVersion: {
      wordpress: {
        files: './style.css',
        from: /Version: (.*)/gi,
        to: 'Version: '
      },
      php: {
        files: '!(node_modules|dist)/**/*.php',
        from: '%%NEXT_VERSION%%'
      },
      js: {
        files: '!(node_modules|dist)/**/*.js',
        from: '%%NEXT_VERSION%%'
      }
    }
  }
}
