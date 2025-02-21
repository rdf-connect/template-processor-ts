# template-processor-ts

[![Build and tests with Node.js](https://github.com/rdf-connect/template-processor-ts/actions/workflows/build-test.yml/badge.svg)](https://github.com/rdf-connect/template-processor-ts/actions/workflows/build-test.yml)

This repository contains a fully functioning dummy implementation of a logging processor written in TypeScript, meant to be used as a template in order to kickstart the development of your next processor.

## Features

At the time of writing, this repositories sets up the following boilerplate and tools for you.

- Placeholder implementation of a processor which accepts input from a stream, logs it to the console, and pipes it back into the outgoing stream.
- An initial `processor.ttl` file.
- Vitest configuration unit testing, including GitHub Actions configuration.
- Renovate notifications for dependency updates.
- Convenient publishing to GitHub Packages for every new release.
- ESLint/Prettier linting and styling, including a Husky git hook in combination with lint-staged.
- The MIT license.

## Installation

```
npm install
npm run build
```

## Example

An example configuration of the processor can be found in the `example` directory.

You can run this example by executing the following command:

```bash
npx @rdfc/js-runner example/pipeline.ttl
```

To enable all debug logs, add `DEBUG=*` before the command:

```bash
DEBUG=* npx @rdfc/js-runner example/pipeline.ttl
```
