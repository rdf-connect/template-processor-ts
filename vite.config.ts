import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        deps: {
            optimizer: {
                ssr: {
                    enabled: true,
                    include: ["@rdfc/js-runner"],
                },
            },
        },
    },
    resolve: {
        tsconfigPaths: true,
    },
});
