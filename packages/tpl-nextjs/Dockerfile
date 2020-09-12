FROM zzswang/docker-nginx-react:v0.10.7

# ENV DEBUG=off \
#   NODE_ENV=production \
#   APP_PORT=80

# COPY . /app

# FROM mhart/alpine-node:base
# WORKDIR /app
# EXPOSE 80
# CMD ["node_modules/.bin/next", "start"]

# Do the npm install or yarn install in the full image
FROM mhart/alpine-node AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build && yarn --production

# # And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
EXPOSE 80
CMD ["node_modules/.bin/next", "start", "-p", "80"]
