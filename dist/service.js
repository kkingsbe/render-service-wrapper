"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const healthCheckManager_1 = require("./healthCheckManager");
/**
 * This is an abstract class which is meant to serve as a wrapper for all microservices used.
 * It provides some of the basic requried functionality, such as starting the health check manager.
 */
class Service {
    constructor(config) {
        var _a, _b;
        this.healthCheckPort = (_a = config.healthCheckPort) !== null && _a !== void 0 ? _a : 10000;
        this.healthCheckEndpoint = (_b = config.healthCheckEndpoint) !== null && _b !== void 0 ? _b : "/";
        this.isCronJob = config.isCronJob;
        this.healthCheckManager = new healthCheckManager_1.HealthCheckManager(this.healthCheckPort, this.healthCheckEndpoint);
    }
    // Starts the health check manager and runs the microservice
    async start() {
        this.healthCheckManager.start();
        await this.run();
        // Terminate after execution if the microservice is a cron job, in order to prevent it from hanging
        if (this.isCronJob) {
            //this.stop()
            this.healthCheckManager.stop();
        }
    }
    // Stops the microservice
    async stop() {
        process.exit();
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map