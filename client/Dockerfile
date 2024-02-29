FROM node:18-alpine3.18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY  . .

EXPOSE 1234

CMD ["yarn", "start"]
