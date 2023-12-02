import { Server } from "http";
import { HealthCheckManager } from "./healthCheckManager";
import express from "express"

export interface ServiceConfig {
    port?: number;
    healthCheckEndpoint?: string;
    isCronJob: boolean
}

/**
 * This is an abstract class which is meant to serve as a wrapper for all microservices used.
 * It provides some of the basic requried functionality, such as starting the health check manager.
 */
export abstract class Service {
    private port: number;
    private healthCheckEndpoint: string;
    private isCronJob: boolean;
    private healthCheckManager: HealthCheckManager;
    expressApp: express.Application;
    private expressServer: Server | null = null;

    constructor(config: ServiceConfig) {
        this.port = config.port ?? 10000;
        this.healthCheckEndpoint = config.healthCheckEndpoint ?? "/";
        this.isCronJob = config.isCronJob;

        this.expressApp = express()
        this.expressServer = this.expressApp.listen(this.port)
        this.healthCheckManager = new HealthCheckManager(this.expressApp, this.healthCheckEndpoint);
    }

    // Starts the health check manager and runs the microservice
    async start() {
        await this.run()

        // Terminate after execution if the microservice is a cron job, in order to prevent it from hanging
        if(this.isCronJob) {
            this.expressServer.close()
            this.stop()
        }
    }

    // Microservice code goes here
    abstract run(): Promise<void>

    // Stops the microservice
    async stop() {
        process.exit();
    }
}