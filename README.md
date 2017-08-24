# Install node-typings
node_modules/.bin/typings install dt~node --global --save

# Build client code
npm run frontend

# Start server
npm run server

# Copy files on server
scp distr/index.js user@185.68.93.36:/var/www/html/js/index.js

# Deploy static
Just copy static files in /var/www/static

# Deploy nodejs-app
Stop nodejs-app on server. 
Pull branch origin/master. 
Npm run build-backend, npm run dev-server.