"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckManager = void 0;
const express_1 = __importDefault(require("express"));
/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
class HealthCheckManager {
    /**
     *
     * @param port The port to run the healthcheck endpoint on. Usually will be 10000
     * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
     */
    constructor(port, endpoint = "/healthz") {
        this.server = null;
        this.port = port;
        this.app = (0, express_1.default)();
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
exports.HealthCheckManager = HealthCheckManager;
//# sourceMappingURL=healthCheckManager.js.map