import { Service } from "render-service-wrapper"

export class TestService extends Service {
    constructor() {
        super({
            isCronJob: false
        })
    }

    async run() {
        console.log("Hello world!")
    }
}