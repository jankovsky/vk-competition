#Install node-typings
node_modules/.bin/typings install dt~node --global --save

#Build client code
npm run frontend

#Start server
npm run server