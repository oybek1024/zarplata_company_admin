FROM node:latest as builder
RUN apt update && apt-get install -y yarn

RUN mkdir app
WORKDIR app


COPY package*.json ./
RUN npm install

COPY . ./
RUN npm install
RUN npm build


FROM node:10.16.3-alpine
RUN mkdir app
WORKDIR app

COPY --from=builder /app/ /app/
ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 3000
ENTRYPOINT ["npm", "start"]