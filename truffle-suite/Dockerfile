FROM node:lts-bullseye-slim

WORKDIR /opt/node_app/app/client

# Install truffle and dependencies
RUN npm install -g truffle@latest

# Install frontend dependencies
COPY app/client/package.json .
RUN npm install

# Change entrypoint script in order to call npm install after volume is mounted
RUN mv /usr/local/bin/docker-entrypoint.sh /usr/local/bin/default-docker-entrypoint.sh
COPY truffle-suite/scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod 775 /usr/local/bin/docker-entrypoint.sh
EXPOSE 3000

ENTRYPOINT [ "docker-entrypoint.sh" ]