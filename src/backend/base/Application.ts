import Config from '../config';
import ApiRoutes from '../routes/ApiRoutes';
import registrationRoute from '../routes/Registration';
import loginRoute from '../routes/Login';
import logoutRoute from '../routes/Logout';
import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';

export default class App {

    public app: express.Application;

    private initRoutes(mode?: string): void {

        let router: express.Router = express.Router();

        router.get('/', (req, res) => {
            res.sendFile(`${Config.basic.backendPath}/public/index.html`)
        });

        // cookie-body-parser
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // express sessions
        this.app.use(expressSession({
            secret: '12345',
            resave: true,
            saveUninitialized: true
        }));

        // init passport and sessions support
        this.app.use(passport.initialize());
        this.app.use(passport.session());


        // react hot-reloader
        if (mode && mode === 'develop') {
            let webpack,
                webpackDevMiddleware,
                webpackHotMiddleware,
                webpackconfig,
                webpackcompiler;

            webpack = require('webpack');
            webpackDevMiddleware = require('webpack-dev-middleware');
            webpackHotMiddleware = require('webpack-hot-middleware');
            webpackconfig = require('../../webpack.config');
            webpackcompiler = webpack(webpackconfig);

            console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
            this.app.use(webpackDevMiddleware(webpackcompiler, {
                publicPath: webpackconfig.output.publicPath,
                stats: {
                    colors: true,
                    chunks: false // this reduces the amount of stuff I see in my terminal; configure to your needs
                }
            }));
            this.app.use(webpackHotMiddleware(webpackcompiler, {
                log: console.log
            }));
        }

        // init root route
        this.app.use('/', router);

        // registration route
        this.app.use('/registration', registrationRoute);

        // login route
        this.app.use('/login', loginRoute);

        // logout route
        this.app.use('/logout', logoutRoute);

        // static resources
        this.app.use('/js', express.static(`${Config.basic.backendPath}/public/js`));

        // init api routes
        this.app.use('/api', ApiRoutes);

        // 404 error
        this.app.use((req,res) => {
            res.sendFile(`${Config.basic.backendPath}/public/404.html`)
        });
    }

    public run(): void {
        this.app.listen(Config.basic.server.port, () => {
            console.log(`Express server on port ${Config.basic.server.port}`);
        });
    }

    constructor(mode?: string) {
        this.app = express();

        if (mode && mode === 'develop') {
            this.initRoutes('develop');
        } else {
            this.initRoutes();
        }
    }
}