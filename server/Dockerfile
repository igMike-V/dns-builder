FROM node
WORKDIR /usr/src/app
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
COPY ./server ./

RUN npm ci --only-production

RUN npm start