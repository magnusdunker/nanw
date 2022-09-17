import { Component } from "react";

export class Page3 extends Component<{ children: any }> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
export function Step(props: { children: any }) {
  return <div>{props.children}</div>;
}
