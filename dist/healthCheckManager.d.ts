/// <reference types="node" />
import express from "express";
import { Server } from "http";
/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
export declare class HealthCheckManager {
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
//# sourceMappingURL=healthCheckManager.d.ts.map