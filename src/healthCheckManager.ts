import express from "express"

/**
 * This class is used to create a health check endpoint for microservices running within Render.com
 */
export class HealthCheckManager {
    port: number;
    app: express.Application;

    /**
     * 
     * @param port The port to run the healthcheck endpoint on. Usually will be 10000
     * @param endpoint The path to run the healthcheck endpoint on. Usually will be "/"
     */
    constructor(expressApp: express.Application, endpoint: string = "/healthz") {
        this.app = expressApp

        this.app.get(endpoint, (req: any, res: any) => {
            res.status(200).send("")
        })
    }
}