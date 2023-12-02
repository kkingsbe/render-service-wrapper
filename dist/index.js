var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HealthCheckManager: () => HealthCheckManager,
  Service: () => Service
});
module.exports = __toCommonJS(src_exports);

// src/healthCheckManager.ts
var express = __toESM(require("express"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HealthCheckManager,
  Service
});
//# sourceMappingURL=index.js.map