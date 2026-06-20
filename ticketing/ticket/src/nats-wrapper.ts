import nats from "node-nats-streaming";
export class NatsWrapper {
  private _client!: nats.Stan;
  private static natsWrapper: NatsWrapper;
  private constructor() {}

  static getInstance() {
    if (!this.natsWrapper) {
      this.natsWrapper = new NatsWrapper();
    }

    return this.natsWrapper;
  }
  get client() {
    if (!this._client) {
      throw new Error("NATS client not connected");
    }
    return this._client;
  }
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, {
      url,
    });

    return new Promise<void>((resolve, reject) => {
      if (this._client) {
        this._client.on("connect", () => {
          console.log("connect to nats promise");
          resolve();
        });
        this._client.on("error", (err) => {
          console.log("connect to nats reject");
          reject(err);
        });
      }
    });
  }
}
