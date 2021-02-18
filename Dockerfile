FROM node:latest as builder
RUN apt update && apt-get install -y yarn

RUN mkdir app
WORKDIR app


COPY package*.json ./

COPY . ./
RUN npm install
RUN npm run-script build


ENV NODE_ENV=production
ENV REACT_APP_HOST=0.0.0.0

ENTRYPOINT ["npm", "start"]