import { describe, expect, test } from "vitest";
import { ProcHelper } from "@rdfc/js-runner/lib/testUtils";
import { resolve } from "path";

import { TemplateArgs, TemplateProcessor } from "../src";

const pipeline = `
        @prefix rdfc: <https://w3id.org/rdf-connect#>.

        <http://example.com/processor> a rdfc:TemplateProcessorJs;
          rdfc:reader <incoming>;
          rdfc:writer <outgoing>.
        `;

describe("Template processor tests", async () => {
    test("rdfc:TemplateProcessorJs is properly defined", async () => {
        const helper = new ProcHelper<TemplateProcessor>();

        await helper.importFile(resolve("./processor.ttl"));
        await helper.importInline("./pipeline.ttl", pipeline);

        const config = helper.getConfig("TemplateProcessorJs");

        expect(config.location).toBeDefined();
        expect(config.clazz).toBe("TemplateProcessor");
        expect(config.file).toBeDefined();

        const proc = <TemplateProcessor & TemplateArgs>(
            await helper.getProcessor("http://example.com/processor")
        );

        expect(proc.reader.constructor.name).toBe("ReaderInstance");
        expect(proc.writer?.constructor.name).toBe("WriterInstance");

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait a bit for the reading to complete
    });
});
