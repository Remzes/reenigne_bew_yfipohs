FROM node:8.13

WORKDIR /client

COPY package*.json /client/

RUN yarn install

COPY . /client/

EXPOSE 3000

CMD ["yarn", "start"]