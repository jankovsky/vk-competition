# Install node-typings
node_modules/.bin/typings install dt~node --global --save

# Build client code
npm run frontend

# Start server
npm run server

# Copy files on server

scp distr/index.js user@185.68.93.36:/var/www/html/js/index.js