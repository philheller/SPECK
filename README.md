<!-- ABOUT THE PROJECT -->

## Dockerized Truffle Suite

Example project that demonstrates Ethereum smart-contract programming based on frameworks and programming tools widely used in industry.

<!-- GETTING STARTED -->

## Getting Started

For easier setup you can use Docker. Alternatively, you can also manually install all needed tools.

## Setup with Docker

### Prerequisites

- Git – https://git-scm.com/
- Docker – https://docs.docker.com/get-docker/
  - Additionally on Windows: Install Windows Subsystem for Linux (WSL2) - https://docs.microsoft.com/en-us/windows/wsl/install. Here a concrete example for Ubuntu: https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview
- Docker Compose - https://docs.docker.com/compose/install/

### Installation

1. Clone the repo
   ```shell
   git clone https://git.scc.kit.edu/tf2000/drizzle-with-events.git
   ```
2. Change to the `drizzle-with-events/` directory and create the file `.env` by copying `example.env`. There, the variable `APP_HOME` should contain the path to the project directory
   ```shell
   cd drizzle-with-events/
   cp example.env .env
   # Edit file
   nano .env
   ```
3. Build and run the Docker container
   ```shell
   docker-compose build
   # To terminate the container use 'down' instead of 'up'
   docker-compose up
   ```
4. Open a console in the Docker container
   ```shell
   docker exec -it truffle_suite bash
   ```

## Manual Setup

Follow the steps below to setup up the project.

### Prerequisites

- Node.js – https://nodejs.org/en/
- Git – https://git-scm.com/
- Ganache – https://www.trufflesuite.com/ganache
- MetaMask – https://metamask.io/
- Visual Studio Code (optional) – https://code.visualstudio.com/
- VS Code extension for Solidity (optional) – https://github.com/juanfranblanco/vscode-solidity

### Installation

1. Open a console (e.g., Git bash) and install Truffle
   ```shell
   npm install -g truffle
   ```
2. Clone the repo
   ```shell
   git clone https://git.scc.kit.edu/tf2000/drizzle-with-events.git
   ```
3. Change to the `drizzle-with-events/app/client/` directory and install all NPM packages
   ```shell
   cd drizzle-with-events/app/client/
   npm install
   ```

## Configuration

1. Open `app/truffle-config.js` and change `host` in line 50 to `"127.0.0.1"`, since we are not using Docker.

2. Open Ganache and create a new workspace; thereby, add your Truffle project to Ganache by selecting the `truffle-config.js`. Don't forget to save your workspace!

3. Compile and migrate your contracts to your local Ganache Blockchain

```shell
# The contracts are compiled before they are migrated. Use `truffle compile` for explicit compilation
truffle migrate
```

4. Configure the MetaMask browser plugin. Therefore, add your local Blockchain to MetaMask as custom network. The URL is displayed in Ganache. The default should be `http://127.0.0.1:7545`. Give the network a name and specify `0x539`as chain ID. Then, import an Ethereum account from Ganach to your MetaMask wallet. This is done by importing the corresponding private key. You can find all private keys in the account tab of Ganache when you click on the key symbol positioned on the right of each row. After visiting a site that supports MetaMask, you need to specify which account you want to use, by connecting the account to the site.
   If MetaMask is not present, the application will directly connect to Ganache. This is due to the definition of a fallback in `client/src/drizzleOptions.js`

```javascript
    web3: {
      fallback: {
        type: "ws",
        url: "ws://127.0.0.1:7545",
      },
```
