FROM node:latest

# Install truffle and dependencies
RUN npm install -g truffle@latest

# install dependencies first for better caching
WORKDIR /opt/truffle
# copy all files
COPY app .