import * as express from 'express';
import { Server } from 'http';

interface ServiceConfig {
    healthCheckPort?: number;
    healthCheckEndpoint?: string;
    isCronJob: boolean;
}
/**
 * This is an abstract class which is meant to serve as a wrapper for all microservices used.
 * It provides some of the basic requried functionality, such as starting the health check manager.
 */
declare abstract class Service {
    healthCheckPort: number;
    healthCheckEndpoint: string;
    isCronJob: boolean;
    private healthCheckManager;
    constructor(config: ServiceConfig);
    start(): Promise<void>;
    abstract run(): Promise<void>;
    stop(): Promise<void>;
}

/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
declare class HealthCheckManager {
    port: number;
    app: express.Application;
    server: Server | null;
    /**
     *
     * @param port The port to run the healthcheck endpoint on. Usually will be 10000
     * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
     */
    constructor(port: number, endpoint?: string);
    /**
     * Starts the healthcheck endpoint
     */
    start(): void;
    stop(): void;
}

export { HealthCheckManager, Service, type ServiceConfig };
