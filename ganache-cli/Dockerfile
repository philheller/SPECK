FROM trufflesuite/ganache-cli:v6.12.2
RUN /bin/sh -c "apk add --no-cache bash"
EXPOSE 8545
ENTRYPOINT node /app/ganache-core.docker.cli.js --networkId 57771 --mnemonic "zebra erase plunge"