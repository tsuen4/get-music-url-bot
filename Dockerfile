FROM node:12

RUN mkdir /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD ["node", "app.js"]

