const GemfireConfig = {
    region: process.env.REGION || "default",
    type: process.env.TYPE || "PROXY"
}

export default GemfireConfig