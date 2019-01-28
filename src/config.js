

const config = {
    gemfire: {
        region: process.env.REGION || "default",
        type: process.env.TYPE || "PROXY",
        //can optionally specify settings for local gemfire instance
        // credentials: {
        //     locators: [
        //         "localhost[40404]"
        //     ],
        //     users: [
        //         {
        //             password: "secret$$_here",
        //             roles: [
        //                 "developer"
        //             ],
        //             username: "developer_username_khere"
        //         }
        //     ]
        // }
    },
    /**
     * Supports setting SESSION_STORE variable as env variable or in Credhub
     * @returns {*}
     */
    getSessionCachingStrategy() {
       return config.getEnvironmentVariable("SESSION_STORE", "local");
    },
    getEnvironmentVariable(name, defaultValue){
        if(process.env.VCAP_SERVICES === undefined){
            return defaultValue;
        }

        if (process.env[name] !== undefined) {
            return process.env[name];
        }

        let vcap = JSON.parse(process.env.VCAP_SERVICES);
        if (vcap["credhub"] !== undefined) {
            return vcap["credhub"][0].credentials[name];
        }

        return defaultValue;
    }

};

export default config;