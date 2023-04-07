<!-- ABOUT THE PROJECT -->

- [SPECK Hackathon](#speck-hackathon)
  - [First steps](#first-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning the repository](#cloning-the-repository)
  - [Dockerized](#dockerized)
    - [Prerequisites](#prerequisites-1)
    - [Installation](#installation)
    - [Development](#development)
  - [Local (Manual setup)](#local-manual-setup)
    - [Ganache locally](#ganache-locally)
      - [Prerequisites](#prerequisites-2)
      - [Installation](#installation-1)
      - [Configuration](#configuration)
      - [Development](#development-1)
    - [Frontend (NextJS) locally](#frontend-nextjs-locally)
      - [Prerequisites](#prerequisites-3)
      - [Installation](#installation-2)
      - [Configuration](#configuration-1)
      - [Development](#development-2)
    - [Entire project locally](#entire-project-locally)
      - [Prerequisites](#prerequisites-4)
      - [Installation](#installation-3)
      - [Configuration](#configuration-2)
      - [Development](#development-3)

# SPECK Hackathon

This repository contains the code for the SPECK Hackathon. It is fully dockerized but can also be used to devlop locally.

## First steps

### Prerequisites

- Git – [https://git-scm.com/](https://git-scm.com/)
- MetaMask (or other wallet tool) – [https://metamask.io/](https://metamask.io/)
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

## Dockerized

This dockerized version contains two services. The ganache service is used to run a local blockchain. The truffle suite service is used to compile and deploy the smart contracts. The truffle suite service also contains the client code for the frontend (nextjs with drizzle).

### Prerequisites

- Docker – https://docs.docker.com/get-docker/
  - Additionally on Windows: Install Windows Subsystem for Linux (WSL2) - https://docs.microsoft.com/en-us/windows/wsl/install. Here a concrete example for Ubuntu: https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview
- Docker Compose - https://docs.docker.com/compose/install/

### Installation

After cloning the repository and changing to the `speck-hackathon/` (see [First steps](#first-steps)), follow the steps below to setup up the project.

1.  Build the Docker container:

    ```bash
    docker-compose build

    # ... wait for the build to finish ...

    ```

### Development

1. Run the Docker container

   ```bash
   # -d runs the containers in the background
   docker-compose up

   # ... develop and interact with container ...

   ```

   You can now interact with the container. For example, you can open a bash session in the truffle suite container and run truffle commands. The development server of the frontend is running on [http://localhost:3000](http://localhost:3000).

2. To interact with truffle, start a bash session in the truffle suite container

   ```bash
   docker exec -it truffle-suite bash
   ```

   Now, a bash instance is running in the container. Here, you can run any of the truffle commands like a migration:

   ```bash
   truffle migrate
   ```

3. Stop the container

   ```bash
   # -v removes the volumes
   docker-compose down
   ```

## Local (Manual setup)

There is the option to run the project or parts of the project locally (while keeping other parts containerized). Here is an overview of what is covered in this README. Other configurations are possible, but to be used at your own risk.

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

1. Open [`app/truffle-config.js`](./app/truffle-config.js) and change `networks` > `development` > `host` to `"host.docker.internal"` (toggle comment for provided options), since we are not using Docker. Make sure the port set next to the host matches the one configured in Ganache.

2. Open Ganache and create a new workspace; thereby, add your Truffle project to Ganache by selecting the [`truffle-config.js`](./app/truffle-config.js). Don't forget to save your workspace!

3. Configure the MetaMask browser plugin. Therefore, add your local Blockchain to MetaMask as custom network. The URL is displayed in Ganache. The default should be [`http://127.0.0.1:7545`](http://127.0.0.1:7545). Give the network a name and specify `0x539`as chain ID. Then, import an Ethereum account from Ganach to your MetaMask wallet. This is done by importing the corresponding private key. You can find all private keys in the account tab of Ganache when you click on the key symbol positioned on the right of each row. After visiting a site that supports MetaMask, you need to specify which account you want to use, by connecting the account to the site.
   If MetaMask is not present, the application will directly connect to Ganache. This is due to the definition of a fallback in [`app/client/src/drizzleOptions.js`](./app/client/src/drizzleOptions.js)

   ```js
   const options = {
     // ...
     web3: {
       fallback: {
         type: "ws",
         url: "ws://127.0.0.1:7545",
       },
     },
   };
   ```

4. [Optional] The container for the `ganache-cli` can be deactivated. By commenting it out in the [`docker-compose.yml`](./docker-compose.yml) file. This will spin up the containers faster.

#### Development

1. Start Ganache locally. In your workspace you can see transactions, blocks, and accounts.
2. For all other operations, proceed as described in the [Dockerized](#dockerized) section.

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

2. Starting the development server in the `truffle-suite` is no longer necessary. To deactivate it, comment out the entrypoint of the `truffle-suite` in the [`docker-compose.yml`](./docker-compose.yml) file as shown below.

   ```yml
   # ...
   working_dir: /opt/node_app/client
   # if developing next locally, comment out the entrypoint
   # to increase the speed of hot reloading, commment out wepback in ./client/next.config.js
   # entrypoint: npm run dev
   ports:
     - 3000:3000
   # ...
   ```

#### Development

1. Navigate to the `app/client/` directory.

   ```bash
   cd app/client/
   ```

2. Start the development server.

   ```bash
   npm run dev
   ```

You can now access the frontend at [http://localhost:3000](http://localhost:3000). For all other operations, proceed as described in the [Dockerized](#dockerized) section.

### Entire project locally

#### Prerequisites

- Node.js – [https://nodejs.org/en/](https://nodejs.org/en/)
- Ganache – [https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache)

#### Installation

After cloning the repository and changing to the `speck-hackathon/` (see [First steps](#first-steps)), follow the steps below to setup up the project.

Open a console (e.g., Git bash) and install Truffle

```bash
npm install -g truffle
```

#### Configuration

1. Open [`app/truffle-config.js`](./app/truffle-config.js) and change `networks` > `development` > `host` to `"127.0.0.1"` (toggle comment for provided options), since we are not using Docker.

2. Open Ganache and create a new workspace; thereby, add your Truffle project to Ganache by selecting the [`truffle-config.js`](./app/truffle-config.js). Don't forget to save your workspace!

3. Compile and migrate your contracts to your local Ganache Blockchain

   ```bash
   # The contracts are compiled before they are migrated. Use `truffle compile` for explicit compilation
   truffle migrate
   ```

4. Configure the MetaMask browser plugin. Therefore, add your local Blockchain to MetaMask as custom network. The URL is displayed in Ganache. The default should be [`http://127.0.0.1:7545`](http://127.0.0.1:7545). Give the network a name and specify `0x539`as chain ID. Then, import an Ethereum account from Ganach to your MetaMask wallet. This is done by importing the corresponding private key. You can find all private keys in the account tab of Ganache when you click on the key symbol positioned on the right of each row. After visiting a site that supports MetaMask, you need to specify which account you want to use, by connecting the account to the site.
   If MetaMask is not present, the application will directly connect to Ganache. This is due to the definition of a fallback in [`app/client/src/drizzleOptions.js`](./app/client/src/drizzleOptions.js)

   ```js
   const options = {
     // ...
     web3: {
       fallback: {
         type: "ws",
         url: "ws://127.0.0.1:7545",
       },
     },
   };
   ```

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
