import React from "react";
import Axiom from "axiom-api";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.axiom = new Axiom({ verbose: true });

    this.state = {
      publicKey: null,
      bucket: null,
      counter: 0
    };

    this.login = this.login.bind(this);
  }

  async login() {
    let publicKey = await this.axiom.getPublicKey();
    this.setState({ publicKey: publicKey });
  }

  render() {
    if (!this.state.publicKey) {
      return <button onClick={this.login}>Log In</button>;
    }

    return (
      <div>
        <p>Hello {this.state.publicKey}</p>
      </div>
    );
  }
}
