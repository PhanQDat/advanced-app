const express = require("express");
const { Client } = require("pg");
const redis = require("redis");

const app = express();

const pgClient = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

async function start() {
  await pgClient.connect();
  console.log("PostgreSQL connected");

  await redisClient.connect();
  console.log("Redis connected");

  app.get("/", async (req, res) => {
    const now = await pgClient.query("SELECT NOW()");
    const visits = await redisClient.incr("visits");

    res.json({
      status: "ok",
      visits,
      db_time: now.rows[0],
    });
  });

  app.get("/health", (req, res) => {
    res.status(200).send("healthy");
  });

  app.listen(3000, () => {
    console.log("API running on port 3000");
  });
}

start().catch(console.error);
