# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14 as build

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./


RUN yarn install

# Copy local code to the container image.
COPY . ./

RUN yarn compile

FROM node:14-alpine as run

WORKDIR /app

COPY --from=build /usr/src/app/ ./

RUN yarn install --prod

# Run the web service on container startup.
CMD ["node", "dist/index.js"]
