import { HealthCheckManager } from "./healthCheckManager";

export interface ServiceConfig {
    healthCheckPort?: number;
    healthCheckEndpoint?: string;
    isCronJob: boolean
}

/**
 * This is an abstract class which is meant to serve as a wrapper for all microservices used.
 * It provides some of the basic requried functionality, such as starting the health check manager.
 */
export abstract class Service {
    healthCheckPort: number;
    healthCheckEndpoint: string;
    isCronJob: boolean;
    private healthCheckManager: HealthCheckManager;

    constructor(config: ServiceConfig) {
        this.healthCheckPort = config.healthCheckPort ?? 10000;
        this.healthCheckEndpoint = config.healthCheckEndpoint ?? "/";
        this.isCronJob = config.isCronJob;

        this.healthCheckManager = new HealthCheckManager(this.healthCheckPort, this.healthCheckEndpoint);
    }

    // Starts the health check manager and runs the microservice
    async start() {
        this.healthCheckManager.start();
        await this.run()

        // Terminate after execution if the microservice is a cron job, in order to prevent it from hanging
        if(this.isCronJob) {
            //this.stop()
            this.healthCheckManager.stop()
        }
    }

    // Microservice code goes here
    abstract run(): Promise<void>

    // Stops the microservice
    async stop() {
        process.exit();
    }
}