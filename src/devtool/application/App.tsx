import React, { Component } from 'react';
import { connect } from 'react-redux';

export interface IProps {
  state: any;
}
export interface IState {}

const mapStateToProps = (state: any) => ({
  state
});

@(connect(mapStateToProps) as any)
class App extends Component<IProps> {
  static defaultProps = {
    state: {}
  };

  render() {
    return <div>The Application</div>;
  }
}

export default App;
