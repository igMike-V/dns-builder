FROM node AS BUILDER
WORKDIR /usr/src/app
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
COPY ./frontend ./

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=BUILDER /usr/src/app/dist /usr/share/nginx/html