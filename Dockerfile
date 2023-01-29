
FROM node:18

WORKDIR /home/app

COPY package.*json ./
RUN npm install

COPY . .

ENV $(cat .env | xargs)

EXPOSE 5000

CMD ["node","app.js"]
