FROM trufflesuite/ganache-cli:latest

RUN /bin/sh -c "apk add --no-cache bash"
EXPOSE 8545

ENTRYPOINT node /app/ganache-core.docker.cli.js --networkId 1337 --mnemonic "zebra erase plunge"