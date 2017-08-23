import Application from './base/Application';

let app;

// develop hot-reload middlewar
if (process.env.NODE_ENV !== 'production') {
    app = new Application('develop');
} else {
    app = new Application();
}

app.run();