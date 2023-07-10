FROM node:18

# Install truffle and dependencies
RUN npm install -g truffle@5.9.0

# install dependencies first for better caching
WORKDIR /opt/truffle

COPY app/package*.json .
RUN npm install

# copy all files
COPY app .