import { Processor, type Reader, type Writer } from "@rdfc/js-runner";

type TemplateArgs = {
    reader: Reader;
    writer: Writer;
};

/**
 * The TemplateProcessor class is a very simple processor which simply logs the
 * incoming stream to the RDF-Connect logging system and pipes it directly into
 * the outgoing stream.
 *
 * @param incoming The data stream which must be logged.
 * @param outgoing The data stream into which the incoming stream is written.
 */
export class TemplateProcessor extends Processor<TemplateArgs> {
    /**
     * This is the first function that is called (and awaited) when creating a processor.
     * This is the perfect location to start things like database connections.
     */
    async init(this: TemplateArgs & this): Promise<void> {
        // Initialization code here e.g., setting up connections or loading resources
    }

    /**
     * Function to start reading channels.
     * This function is called for each processor before `produce` is called.
     * Listen to the incoming stream, log them, and push them to the outgoing stream.
     */
    async transform(this: TemplateArgs & this): Promise<void> {
        // Consume the incoming stream, log each message, and push it to the outgoing stream.
        for await (const msg of this.reader.strings()) {
            this.logger.info(msg);
            await this.writer.string(msg);
        }

        // Close the outgoing stream when done
        await this.writer.close();
        this.logger.debug(
            "TemplateProcessor finished processing. Writer closed.",
        );
    }

    /**
     * Function to start the production of data, starting the pipeline.
     * This function is called after all processors are completely set up.
     */
    async produce(this: TemplateArgs & this): Promise<void> {
        // Function to start the production of data, starting the pipeline.
    }
}
