import React, { Component } from "react";
import Axiom from "axiom-api";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.axiom = new Axiom();

    this.state = {
      bucket: null,
      counter: 0
    };
  }

  render() {
    return (
      <div>
        <p>Hello decentralized world</p>
      </div>
    );
  }
}
