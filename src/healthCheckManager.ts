import express from "express"
import { Server } from "http";

/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
export class HealthCheckManager {
    port: number;
    app: express.Application;
    server: Server | null = null;

    /**
     * 
     * @param port The port to run the healthcheck endpoint on. Usually will be 10000
     * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
     */
    constructor(port: number, endpoint: string = "/healthz") {
        this.port = port;

        this.app = express();
        this.app.get(endpoint, (req: any, res: any) => {
            res.status(200).send("")
        })
    }

    /**
     * Starts the healthcheck endpoint
     */
    start() {
        this.server = this.app.listen(this.port)
    }

    stop() {
        this.server?.close()
    }
}