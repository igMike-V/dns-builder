FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./server/package-lock.json ./

RUN npm install --verbose
COPY ./server ./

CMD ["npm", "start"]