FROM node:8.13

WORKDIR /server/

COPY package*.json /server/

RUN yarn install

COPY . /server/

EXPOSE 3001

CMD ["yarn", "dev"]
