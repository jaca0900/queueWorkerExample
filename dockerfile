from node:13.12.0

ADD . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]