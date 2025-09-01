# template-processor-ts

[![Build and tests with Node.js](https://github.com/rdf-connect/template-processor-ts/actions/workflows/build-test.yml/badge.svg)](https://github.com/rdf-connect/template-processor-ts/actions/workflows/build-test.yml)

Template processor to kickstart the development of your next JavaScript/TypeScript RDF-Connect processor.

## Usage

To use the TypeScript TemplateProcessor in your RDF-Connect pipeline, you need to have a pipeline configuration that includes the [rdfc:NodeRunner](https://github.com/rdf-connect/js-runner) (check out their documentation to find out how to install and configure it).

Next, you can add the JS/TS TemplateProcessor to your pipeline configuration as follows:

```turtle
@prefix rdfc: <https://w3id.org/rdf-connect#>.
@prefix owl: <http://www.w3.org/2002/07/owl#>.

# Import the processor
<> owl:imports <./node_modules/@rdfc/template-processor-ts/processor.ttl>.

### Define the channels your processor needs
<channel1> a rdfc:Writer, rdfc:Reader.
<channel2> a rdfc:Writer, rdfc:Reader.

# Attach the processor to the pipeline under the NodeRunner
# Add the `rdfc:processor <template>` statement under the `rdfc:consistsOf` statement of the `rdfc:NodeRunner`

# Define and configure the processor
<template> a rdfc:TemplateProcessorJs;
      rdfc:reader <channel1>;
      rdfc:writer <channel2>".
```

## Development

To start developing your own JavaScript/TypeScript processor based on this template, you can click the "Use this template" button on the top right of this page to create a new repository based on this template.

You can then clone your newly created repository and start implementing your own processor logic in the `src/index.ts` file.

First, install the dependencies using the following command:

```bash
npm install
```

You can run the tests using:

```bash
npm test
```

You can build the project using:

```bash
npm run build
```

### Logging

The JavaScript runner and processors use the `winston` logging library for logging.
The JavasScript runner initiates a logger that is passed to each processor, allowing them to log messages at various levels (info, warn, error, debug).
You can access this logger in your processor class code on the `this.logger` property.
Here's an example of how to use the logger in a processor:

```typescript
import { Processor } from '@rdfc/js-runner'

class MyProcessor extends Processor<MyProcessorArgs> {
  async init(this: MyProcessorArgs & this): Promise<void> {
    this.logger.info('I am initializing my processor!')
  }
  // ...
}
```

This logger is configured to forward log messages to the RDF-Connect logging system.
This means you can view and manage these logs in the RDF-Connect logging interface, allowing for consistent log management across different components of your RDF-Connect pipeline.

If you want to create a child logger for a subclass or submethod, you can do so using the `extendLogger` method.
Here's an example:

```typescript
import { Processor, extendLogger } from '@rdfc/js-runner'

class MyProcessor extends Processor<MyProcessorArgs> {
  async init(this: MyProcessorArgs & this): Promise<void> {
    const childLogger = extendLogger(this.logger, 'init')
    childLogger.debug('This is a debug message from init.')
  }
  // ...
}
```


### Project Structure

```
template-processor-ts/      # Root directory of the project
├── .github/                # CI/CD configuration files for GitHub Actions and Renovate dependency updates
├── src/                    # Source code directory
│   └── index.ts            # Contains the main logic for the JS/TS processor
├── tests/                  # Directory for unit tests
│   ├── index.test.ts       # Functional tests for the processor logic
│   └── processor.test.ts   # Processor initialization tests
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration file
└── processor.ttl           # RDF schema for the processor, used for metadata and configuration
```


### Next Steps

You can start developing your own TypeScript processor by modifying the `src/index.ts` file.
This file contains the main logic for the processor and is where you can implement your custom processing logic.

You probably want to modify the next things to make this template your own:
- Change the repository package name and description in the `package.json` file.
- Change the processor class name in the `src/index.ts` file.
- Update the `processor.ttl` file to reflect the new processor name and any additional metadata or parameters.
- Install any additional dependencies you might need for your processor using `npm install <package-name>`.
- Implement your custom processing logic in the `init`, `transform`, and `produce` methods of the processor class.
- Add unit tests for your processor in the `tests/` directory to ensure your processor works as expected.
- Update this README file to reflect your processor's functionality and usage instructions.
