import React from "react";
import Axiom from "axiom-api";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.axiom = new Axiom({ verbose: true });

    this.state = {
      publicKey: null,
      loadingMessage: null,
      bucket: null,
      counter: null
    };

    this.login = this.login.bind(this);
    this.createBucket = this.createBucket.bind(this);
    this.increment = this.increment.bind(this);
  }

  async login() {
    let publicKey = await this.axiom.getPublicKey();
    this.setState({
      publicKey: publicKey
    });

    this.setState({
      loadingMessage: "loading your data..."
    });

    let bucket = await this.axiom.getBucket("counter", this.state.publicKey);
    if (bucket) {
      console.log("got bucket:", bucket);
      let data = await bucket.getJSON("counter.json");
      console.log("got data:", data);
      let counter = data ? data.counter : 0;
      this.setState({
        bucket: bucket,
        counter: counter,
        loadingMessage: null
      });
    } else {
      console.log("failed to get bucket");
      this.setState({
        loadingMessage: null
      });
    }
  }

  async createBucket() {
    this.setState({
      loadingMessage: "creating a bucket..."
    });
    console.log("creating a bucket");
    await this.axiom.createBucket("counter", this.state.publicKey, 1);
    await this.login();
  }

  async increment() {
    this.setState({
      loadingMessage: `saving counter = ${this.state.counter + 1}...`
    });
    this.state.bucket.setJSON("counter.json", {
      counter: this.state.counter + 1
    });
    console.log("uploading...");
    await this.state.bucket.upload();
    console.log("upload complete");
    this.setState({
      waiting: false,
      loadingMessage: null,
      counter: this.state.counter + 1
    });
  }

  render() {
    if (this.state.loadingMessage) {
      return <p>{this.state.loadingMessage}</p>;
    }

    if (!this.state.publicKey) {
      return <button onClick={this.login}>Log In</button>;
    }

    if (!this.state.bucket) {
      return <button onClick={this.createBucket}>Create a Counter</button>;
    }

    return (
      <div>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.increment}>count!</button>
      </div>
    );
  }
}
