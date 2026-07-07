import { describe, expect, test } from "vitest";
import { TemplateProcessor } from "../src";
import { channel, createRunner } from "@rdfc/js-runner/lib/testUtils";
import { FullProc } from "@rdfc/js-runner";
import { createLogger } from "winston";

describe("Functional tests for the Template processor", () => {
    test("It writes everything from the reader", async () => {
        const runner = createRunner();

        const [inputWriter, inputReader] = channel(runner, "incoming");
        const [outputWriter, outputReader] = channel(runner, "outgoing");

        // Read output
        const output: string[] = [];
        (async () => {
            for await (const msg of outputReader.strings()) {
                output.push(msg);
            }
            return output;
        })().then();

        // Initialize the processor.
        const startTemplateProcessor = <FullProc<TemplateProcessor>>(
            new TemplateProcessor(
                {
                    reader: inputReader,
                    writer: outputWriter,
                },
                createLogger(),
            )
        );
        await startTemplateProcessor.init();

        const outputPromise = Promise.all([
            startTemplateProcessor.transform(),
            startTemplateProcessor.produce(),
        ]);

        // Push messages into input
        await inputWriter.string("Hello, World!");
        await inputWriter.string("This is a second message");
        await inputWriter.string("Goodbye.");

        await inputWriter.close();

        // Wait for the processor to finish.
        await outputPromise;

        // Assertions on output data
        expect(output).toEqual([
            "Hello, World!",
            "This is a second message",
            "Goodbye.",
        ]);
    });
});
