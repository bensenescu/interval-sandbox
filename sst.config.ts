/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "sst-interval",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("IntervalVpc");
    const cluster = new sst.aws.Cluster("IntervalCluster", { vpc });

    const databaseUrl = new sst.Secret("DatabaseUrl");
    const secretValue = new sst.Secret("SecretValue");
    const authCookieSecret = new sst.Secret("AuthCookieSecret");
    const wssApiSecret = new sst.Secret("WssApiSecret");

    cluster.addService("IntervalServer", {
      public: {
        ports: [
          { listen: "80/http", forward: "3000/http" },
          { listen: "443/https", forward: "3000/http" },
        ],
        domain: "interval-sandbox.com",
      },
      image: "alexarena/interval-server:latest",
      dev: {
        command: "interval-server start",
      },
      environment: {
        DATABASE_URL: databaseUrl.value,
        SECRET: secretValue.value,
        APP_URL: $dev
          ? "http://localhost:3000"
          : "https://interval-sandbox.com",
        AUTH_COOKIE_SECRET: authCookieSecret.value,
        WSS_API_SECRET: wssApiSecret.value,
      },
    });
  },
});
