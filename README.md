<!-- ABOUT THE PROJECT -->

- [SPECK Hackathon](#speck-hackathon)
  - [First steps](#first-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning the repository](#cloning-the-repository)
  - [Setting up Wallet](#setting-up-wallet)
    - [Prerequisites](#prerequisites-1)
    - [Configuring MetaMask](#configuring-metamask)
  - [Dockerized](#dockerized)
    - [Prerequisites](#prerequisites-2)
    - [Installation](#installation)
    - [Development](#development)
  - [Local (Manual setup)](#local-manual-setup)
    - [Ganache locally](#ganache-locally)
      - [Prerequisites](#prerequisites-3)
      - [Installation](#installation-1)
      - [Configuration](#configuration)
      - [Development](#development-1)
    - [Frontend (NextJS) locally](#frontend-nextjs-locally)
      - [Prerequisites](#prerequisites-4)
      - [Installation](#installation-2)
      - [Configuration](#configuration-1)
      - [Development](#development-2)
    - [Entire project locally](#entire-project-locally)
      - [Prerequisites](#prerequisites-5)
      - [Installation](#installation-3)
      - [Configuration](#configuration-2)
      - [Development](#development-3)

# SPECK Hackathon

This repository contains the code for the SPECK Hackathon. It is fully dockerized but can also be used to develop locally. The dockerized version is preferrable to avoid issues with versions of tooling, different OS, etc. Local development to be done at user's own discretion.

## First steps

### Prerequisites

- Git – [https://git-scm.com/](https://git-scm.com/)
- Wallet (we use Metamask here) – [https://metamask.io/](https://metamask.io/)
- Visual Studio Code (optional) – [https://code.visualstudio.com/](https://code.visualstudio.com/)
- VS Code extension for Solidity (optional) – [https://github.com/juanfranblanco/vscode-solidity](https://github.com/juanfranblanco/vscode-solidity)

### Cloning the repository

1. Clone the repo from [https://git.scc.kit.edu/uzmzu/speck-hackathon.git](https://git.scc.kit.edu/uzmzu/speck-hackathon.git)
   ```bash
   git clone https://git.scc.kit.edu/uzmzu/speck-hackathon.git
   ```
2. Change to the `speck-hackathon/` directory.
   ```bash
   cd speck-hackathon/
   ```

## Setting up Wallet

In this README, we will use MetaMask as our wallet. Using other wallets works as well but the configuration steps may look different.

### Prerequisites

- Installation of MetaMask – [https://metamask.io/](https://metamask.io/)
  - [Firefox](https://addons.mozilla.org/de/firefox/addon/ether-metamask)
  - [Chromium based browsers](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)

### Configuring MetaMask

1. Open MetaMask and create a new wallet if you don't have one already.
2. In `Settings`>`Advanced` enable `show/hide testnetworks` to show the test networks.
3. Configure a localhost network in `Settings`>`Networks`:
   - `Network Name`: `Localhost Ganache` (or any other name)
   - `New RPC URL`: `http://127.0.0.1:8545`
   - `Chain ID`: `1337`
   - `Symbol`: `ETH`
   - `Block Explorer URL`: _`leave empty`_
4. As soon as Ganache is running, add one or multiple of the test accounts:
   1. Copy a/multiple private key(s) from Ganache
      If you are using the [dockerized](#dockerized) version, use a new terminal in the repository and run `docker logs ganache-cli | head -n 40` to get the private keys of the test accounts. If you are using the [local](#local-manual-setup) version, you can copy the private keys from the GUI.
   2. Import the account(s) in MetaMask

## Dockerized

This dockerized version contains three services:

- `ganache-cli`: run a local blockchain
- `truffle`: compile and deploy the smart contracts (development purposes)
- `node-app`: the frontend (nextjs with wagmi)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
  - Additionally on Windows:
    Install [Windows Subsystem for Linux (WSL2)](https://docs.microsoft.com/en-us/windows/wsl/install). See [this](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) concrete example for Ubuntu.
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

After cloning the repository and changing to the `speck-hackathon/` (see [First steps](#first-steps)), follow the steps below to setup up the project.

1.  Build the Docker container:

    ```bash
    docker-compose build

    # ... wait for the build to finish ...

    ```

### Development

1. Run the Docker container:

   ```bash
   # -d runs the containers in the background
   docker-compose up

   # ... develop and interact with container ...

   ```

   You can now interact with the containers. For example, you can open a bash session in the `truffle` container and run truffle commands (see next step). The frontend in the `node-app` container is running on [http://localhost:3000](http://localhost:3000).

2. To interact with truffle, start a bash session in the `truffle` container (in a new terminal session):

   ```bash
   docker exec -it truffle bash
   ```

   Now, a bash instance is running in the container. Here, you can run any of the truffle commands (like for example a migration):

   ```bash
   truffle migrate
   ```

3. Stop the container:

   ```bash
   # -v removes the volumes
   docker-compose down
   ```

   Consider using the `-v` flag to remove the volumes. This will remove the blockchain data and the compiled contracts. This is useful if you want to start from scratch.

## Local (Manual setup)

There is the option to run the project or parts of the project locally (while keeping other parts containerized). Here is an overview of what is covered in this README. Other configurations are possible, but to be used at your own risk. Generally, it is _recommended_ to use the dockerized version.

Run modules dockerized with the following modules locally:

1. [Ganache](#ganache-locally)
2. [Frontend (NextJS)](#frontend-nextjs-locally)

Run all modules locally:

3. [Entire project](#entire-project-locally)

### Ganache locally

#### Prerequisites

- Ganache – [https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache)

#### Installation

None, if prerequisites are met.

#### Configuration

1. In [`app/truffle-config.js`](./app/truffle-config.js) under `networks` > `development` > `host`: change value to `"host.docker.internal"` (comments to untoggle are in the file):

   ```diff
      development: {
   -     host: "ganache-cli",
   +     host: "host.docker.internal",
         port: 8545, // Standard Ethereum port (default: none)
         network_id: "*", // Any network (default: none)
      },
   ```

   Make sure the port set next to the host matches the one configured in Ganache & your wallet.

2. Open Ganache and create a new workspace. Add your Truffle project to Ganache by selecting the [`truffle-config.js`](./app/truffle-config.js). If you want to use the local ganache instance and the dockerized one interchangeably, use the following values:
   **Server** (see [`truffle-config.js`](./app/truffle-config.js)):

   - RPC URL: `http://127.0.0.1`
   - Port: `8545`
   - Network ID: `1337`

   **Accounts & Keys**:

   - Mnemonic (see [`docker-compose.yml`](./docker-compose.yml))

3. Configure the MetaMask browser plugin (see [#4 in the Configuring MetaMask](#configuring-metamask)).

4. [Optional] The container for the `ganache-cli` can be deactivated. By commenting it out in the [`docker-compose.yml`](./docker-compose.yml) file. This will spin up the containers faster.

#### Development

1. Start Ganache locally. In your workspace you can see transactions, blocks, and accounts.
2. For all other operations, proceed as described in the [Development](#development) section of the dockerized project.

### Frontend (NextJS) locally

#### Prerequisites

- Node.js – [https://nodejs.org/en/](https://nodejs.org/en/)

#### Installation

After cloning the repository and changing to the `speck-hackathon/` (see [First steps](#first-steps)), follow the steps below to setup up the project.

1. Navigate to the `app/client/` directory.

   ```bash
   cd app/client/
   ```

2. Install the dependencies.

   ```bash
   # shorthand: npm i
   npm install
   ```

#### Configuration

1. Docker utilizes polling for hot reloading. Since this is not necessary for local development, the option can be commented out as shown below in the [`app/client/next.config.json`](./app/client/next.config.js) file. This will improve the performance during development.

   ```js
   const nextConfig = {
   reactStrictMode: true,
     // if developping next locally, comment out the webpack config
     //   webpack: (config, context) => {
     //     config.watchOptions = {
     //       poll: 1000,
     //       aggregateTimeout: 300,
     //     };
     return config;
   },
   ```

2. The container for the `node-app` can be deactivated. Comment it out in the [`docker-compose.yml`](./docker-compose.yml) file. This will save on ressources.

#### Development

1. Navigate to the `app/client/` directory.

   ```bash
   cd app/client/
   ```

2. Start the development server.

   ```bash
   npm run dev
   ```

You can now access the frontend at [http://localhost:3000](http://localhost:3000). For all other operations, proceed as described in the [Development](#development) section of the dockerized project.

### Entire project locally

#### Prerequisites

- Node.js – [https://nodejs.org/en/](https://nodejs.org/en/)
- Ganache – [https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache)

#### Installation

After cloning the repository and changing to the `speck-hackathon/` (see [First steps](#first-steps)), follow the steps below to setup up the project.

Open a console (e.g., Git bash) and install Truffle:

```bash
npm install -g truffle
```

#### Configuration

1. In [`app/truffle-config.js`](./app/truffle-config.js) under `networks` > `development` > `host`: change value to `"127.0.0.1"` (comments to untoggle are in the file):

   ```diff
      development: {
   -     host: "ganache-cli",
   +     host: "127.0.0.1",
         port: 8545, // Standard Ethereum port (default: none)
         network_id: "*", // Any network (default: none)
      },
   ```

   Make sure the port set next to the host matches the one configured in Ganache & your wallet.

2. Open Ganache and create a new workspace. Add your Truffle project to Ganache by selecting the [`truffle-config.js`](./app/truffle-config.js). If you want to use the local ganache instance and the dockerized one interchangeably, use the following values:
   **Server** (see [`truffle-config.js`](./app/truffle-config.js)):

   - RPC URL: `http://127.0.0.1`
   - Port: `8545`
   - Network ID: `1337`

   **Accounts & Keys**:

   - Mnemonic (see [`docker-compose.yml`](./docker-compose.yml))

3. Docker utilizes polling for hot reloading. Since this is not necessary for local development, the option can be commented out as shown below in the [`app/client/next.config.json`](./app/client/next.config.js) file. This will improve the performance during development.

   ```js
   const nextConfig = {
   reactStrictMode: true,
     // if developping next locally, comment out the webpack config
     //   webpack: (config, context) => {
     //     config.watchOptions = {
     //       poll: 1000,
     //       aggregateTimeout: 300,
     //     };
     return config;
   },
   ```

4. Configure the MetaMask browser plugin (see [#4 in the Configuring MetaMask](#configuring-metamask)).

#### Development

1. Start Ganache locally. In your workspace you can see transactions, blocks, and accounts.
2. Use truffle to interact with the contracts

   ```bash
   # f.e. to migrate the contracts
   truffle migrate
   ```

3. Start the NextJS frontend

   ```bash
   cd app/client
   npm run dev
   ```

You can now access the frontend at [http://localhost:3000](http://localhost:3000) (see shell output).
