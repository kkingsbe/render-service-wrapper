import express from "express";
/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
export class HealthCheckManager {
    /**
     *
     * @param port The port to run the healthcheck endpoint on. Usually will be 10000
     * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
     */
    constructor(port, endpoint = "/healthz") {
        this.server = null;
        this.port = port;
        this.app = express();
        this.app.get(endpoint, (req, res) => {
            res.status(200).send("");
        });
    }
    /**
     * Starts the healthcheck endpoint
     */
    start() {
        this.server = this.app.listen(this.port);
    }
    stop() {
        var _a;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.close();
    }
}
//# sourceMappingURL=healthCheckManager.js.map