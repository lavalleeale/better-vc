# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM amd64/node:14 as build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json ./
COPY yarn.lock ./


# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN yarn install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

RUN yarn compile

FROM amd64/node:14-alpine as run

WORKDIR /app

COPY --from=build /usr/src/app/ ./

RUN yarn install --prod

# Run the web service on container startup.
CMD ["node", "dist/index.js"]
