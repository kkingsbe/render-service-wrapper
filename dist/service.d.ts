export interface ServiceConfig {
    healthCheckPort?: number;
    healthCheckEndpoint?: string;
    isCronJob: boolean;
}
/**
 * This is an abstract class which is meant to serve as a wrapper for all microservices used.
 * It provides some of the basic requried functionality, such as starting the health check manager.
 */
export declare abstract class Service {
    healthCheckPort: number;
    healthCheckEndpoint: string;
    isCronJob: boolean;
    private healthCheckManager;
    constructor(config: ServiceConfig);
    start(): Promise<void>;
    abstract run(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map