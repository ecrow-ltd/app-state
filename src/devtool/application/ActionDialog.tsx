import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reducer from '../../state/Reducer';
import Button from '@material-ui/core/Button';

export interface IProps {
  action: any;
}
export interface IState {}

class ActionDialog extends Component<IProps, IState> {
  render() {
    return <div>Test</div>;
  }
}
