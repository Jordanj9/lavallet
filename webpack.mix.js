const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.ts('resources/js/app.tsx', 'public/js')
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
        require("autoprefixer")
    ]).webpackConfig({
    module: {
        rules: [
            {
                test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
                loaders: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]',
                        context: 'resources/assets',
                    }
                },
            }
        ]
   }
});

mix.browserSync({
    proxy: 'http://127.0.0.1:8000/',
});

mix.disableNotifications();
