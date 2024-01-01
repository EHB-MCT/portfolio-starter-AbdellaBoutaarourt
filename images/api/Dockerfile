
FROM node:16

WORKDIR /usr/app

COPY package*.json .

RUN npm install -g nodemon
RUN npm install

COPY ./src ./src


EXPOSE 3000

CMD [ "npm","run", "start", "src/index.js"]