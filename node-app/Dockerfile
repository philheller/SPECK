FROM node:latest

# install dependencies first for better caching
WORKDIR /opt/node_app/
COPY app/client/package.json .
RUN npm install

# copy all other files
COPY app/client .

EXPOSE 3000