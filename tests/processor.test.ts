import { describe, expect, test } from "vitest";
import { checkProcDefinition, getProc } from "@rdfc/js-runner/lib/testUtils";

import { TemplateProcessor } from "../src";

describe("Template processor tests", async () => {
    test("rdfc:TemplateProcessorJs is properly defined", async () => {
        const processorConfig = `
        @prefix rdfc: <https://w3id.org/rdf-connect#>.

        <http://example.com/ns#processor> a rdfc:TemplateProcessorJs;
          rdfc:reader <jr>;
          rdfc:writer <jw>.
        `;

        const configLocation = process.cwd() + "/processor.ttl";
        await checkProcDefinition(configLocation, "TemplateProcessorJs");

        const processor = await getProc<TemplateProcessor>(
            processorConfig,
            "TemplateProcessorJs",
            configLocation,
        );
        await processor.init();

        expect(processor.reader.constructor.name).toBe("ReaderInstance");
        expect(processor.writer?.constructor.name).toBe("WriterInstance");
    });
});
