# Pencil Kata

This is a JavaScript implementation of Pillar's [pencil durability kata](https://github.com/PillarTechnology/kata-pencil-durability) using [Jest](https://jestjs.io/) as the testing framework.

Why Jest? I had some exposure to Jest previously, and remembered that it has a very clear and English-like syntax. Also, I tend to write my apps with React and React Native, and like React and React Native, Jest is made by Facebook. So it was a natural choice to increase my familiarity with Jest for the future when I am writing tests in my applications.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running tests](#running-tests)

### Prerequisites

- You must have [NodeJS](https://nodejs.org/en/) installed to run this program.

### Installation

- Clone this repository: `git clone https://github.com/daviddinnison/pencil-kata.git`
- Move into project directory: `cd pencil-kata`
- Install dependencies: `npm i`

### Running tests

- Run tests with `npm test`.
- By default, the tests will need to be rerun with `npm test` each time.
- If you'd prefer to have the tests running continuously on each save, replace the test script in package.json with
  `"scripts": { "test": "jest --watchAll" },`
