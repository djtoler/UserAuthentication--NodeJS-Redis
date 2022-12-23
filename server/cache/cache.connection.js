const redis = require("redis");

const connectToRedisEngine = async () => {
    let client = redis.createClient();
    const redisClient = await client.connect();
    client.on("connect", function () {console.log("***Connected TO REDIS**!")});
    return {client, redisClient}
}

module.exports = connectToRedisEngine
