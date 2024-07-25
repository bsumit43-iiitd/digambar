FROM node:alpine


WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app



EXPOSE 3016


CMD [ "npm","run","start" ]