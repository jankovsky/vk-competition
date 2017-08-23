import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

let webpackconfig,
    webpackcompiler;

webpackconfig = require('../../webpack.config.js');
webpackcompiler = webpack(webpackconfig);

//enable webpack middleware for hot-reloads in development

class WebpackDevHelper {
    static UseWebpackMiddleware(app): Express.Application {
        app.use(webpackDevMiddleware(webpackcompiler, {
            publicPath: webpackconfig.output.publicPath,
            stats: {
                colors: true,
                chunks: false // this reduces the amount of stuff I see in my terminal; configure to your needs
            }
        }));
        app.use(webpackHotMiddleware(webpackcompiler, {
            log: console.log
        }));

        return app;
    }
}

export default WebpackDevHelper;