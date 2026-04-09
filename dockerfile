FROM node:20-slim as base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as development
RUN npm install
COPY . .
CMD ["node", "--watch", "server.js"]

FROM base as production
RUN npm install --production
COPY . .
CMD ["node", "server.js"]