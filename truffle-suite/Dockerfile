FROM node:lts-bullseye-slim

# Install truffle and dependencies
RUN npm install -g truffle@latest

# install dependencies first for better caching
WORKDIR /opt/node_app/client
COPY app/client/package.json .
RUN npm install

# copy all files
WORKDIR /opt/node_app/
COPY app .

EXPOSE 3000