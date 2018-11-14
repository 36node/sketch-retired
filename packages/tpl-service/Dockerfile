FROM node:10-alpine AS build

# work dir
WORKDIR /build

# install tools and deps for node-gyp
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

COPY package.json yarn.lock ./
RUN yarn --prod

FROM node:10-alpine
ENV TZ Asia/Shanghai

ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=80

RUN mkdir app
WORKDIR /app
COPY --from=build /build/node_modules node_modules/
COPY ./ ./

# Start
CMD npm run server