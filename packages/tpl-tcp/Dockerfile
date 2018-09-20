FROM node:9-alpine

ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=9527

RUN mkdir app
WORKDIR /app
COPY . /app/

# Start
CMD npm run server