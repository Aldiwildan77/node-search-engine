FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

EXPOSE 5015
EXPOSE 9200

CMD ["npm", "start"]