FROM node:14 as node-14
WORKDIR /home/node/app
COPY package.json ./
RUN npm i
COPY . .
FROM node-14 as production
ENV NODE_PATH=./build
RUN npm run build