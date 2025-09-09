# 🐉 Dragons App 🐉

This is the client app for the Dragon Platform, your app to create awsome and beautiful dragons. It is developed using **TypeScript 5.8**, transpiling to **JavaScript ES2022**

## Environment Setup

To get started with Dragon Platform, you must configure your environment:

1. Install NodeJS LTS >= 20. It can be downloaded from [NodeJS official Page](https://nodejs.org/es/). After installation check your version using the command:

    > node -v

2. If your npm version is lower than 7 (check it using `npm -v` command), upgrade it with the following command:

    > npm i -g npm@latest

3. Install and IDE. We recommend to use VSCode. You can install from its [Official Page](https://code.visualstudio.com/). Once you open this repo with VSCode, it will recommends you to install a few extension for the project.

## Getting Started

In order to start contributing to the project, Once you have your environment setup completed, you can:

1. Install project dependencies, under the main repo folder

    > npm i

2. Test the application (watching mode with coverage)

    > npm test

3. Start the application in development mode

    > npm run dev

    _This command starts an HTTP server and outputs its access URL for the browser_

4. 👩🏻‍💻 Develop your code and happy coding 👨🏽‍💻!

## Project structure

```plain

├── docs/                    # Folder to save the repo documentation (diagrams, etc)
├── public/                  # Global root folder of web app on server.
│
├── src/
│   ├── config/              # General app configuracion, environment as example
│   ├── dragons/             # Dragons domain folder, all dragon logic is inside
│   ├── events/              # Event manager for comunication beetwen components
│   ├── mocks/               # Testing elements
│   ├── services/            # Business logic and application services
│   ├── main.ts              # Entry point of the application
│   └── style.css            # Main styles of app
│
├── index.html               # Main HTML page for web app
├── .editorconfig            # Editor configuration for consistent coding styles
├── .gitignore               # Specifies files and directories to be ignored by Git
├── .prettierrc              # Prettier configuration for code formatting
├── eslint.config.js         # ESLint configuration for static code analysis
├── jest.config.js           # Jest configuration for unit testing
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Exact versions of installed dependencies
├── tsconfig.json            # TypeScript configuration
├── LICENSE                  # The project license, currently Apache 2.0
└── README.md                # Project documentation entry point (this file)
```
