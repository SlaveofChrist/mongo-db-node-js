# mongo-db-node-js/Dockerfile
FROM node:18
WORKDIR /server
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "node","server.js" ]