import { describe, expect, test } from "vitest";
import { TemplateProcessor } from "../src";
import { createWriter, logger } from "@rdfc/js-runner/lib/testUtils";
import { FullProc } from "@rdfc/js-runner";

describe("Functional tests for the Template processor", () => {
    test("It writes everything from the reader", async () => {
        const [inputWriter, inputReader] = createWriter();
        const [outputWriter, outputReader] = createWriter();

        const proc = <FullProc<TemplateProcessor>>new TemplateProcessor(
            {
                reader: inputReader,
                writer: outputWriter,
            },
            logger,
        );

        await proc.init();
        const prom = proc.transform();

        // Read messages in the background
        // (we don't await it yet, as we want to push messages first)
        const readPromise = (async () => {
            const collected: string[] = [];
            for await (const msg of outputReader.strings()) {
                collected.push(msg);
            }
            return collected;
        })();

        // Push messages into input
        await inputWriter.string("Hello, World!");
        await inputWriter.string("This is a second message");
        await inputWriter.string("Goodbye.");
        await new Promise((r) => process.nextTick(r));
        await inputWriter.close();

        // Close reader so iteration finishes
        outputReader.close();

        // Collect output
        const collected = await readPromise;

        // Wait for processor to finish
        await prom;

        // Assertions on output data
        expect(collected).toEqual([
            "Hello, World!",
            "This is a second message",
            "Goodbye.",
        ]);
    });
});
