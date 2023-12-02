// src/healthCheckManager.ts
import express from "express";
var HealthCheckManager = class {
  port;
  app;
  server = null;
  /**
   * 
   * @param port The port to run the healthcheck endpoint on. Usually will be 10000
   * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
   */
  constructor(port, endpoint = "/healthz") {
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
    (_a = this.server) == null ? void 0 : _a.close();
  }
};

// src/service.ts
var Service = class {
  healthCheckPort;
  healthCheckEndpoint;
  isCronJob;
  healthCheckManager;
  constructor(config) {
    this.healthCheckPort = config.healthCheckPort ?? 1e4;
    this.healthCheckEndpoint = config.healthCheckEndpoint ?? "/";
    this.isCronJob = config.isCronJob;
    this.healthCheckManager = new HealthCheckManager(this.healthCheckPort, this.healthCheckEndpoint);
  }
  // Starts the health check manager and runs the microservice
  async start() {
    this.healthCheckManager.start();
    await this.run();
    if (this.isCronJob) {
      this.healthCheckManager.stop();
    }
  }
  // Stops the microservice
  async stop() {
    process.exit();
  }
};
export {
  HealthCheckManager,
  Service
};
//# sourceMappingURL=index.mjs.map