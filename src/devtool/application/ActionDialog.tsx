import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ObjectForm from './ObjectForm';

export interface IProps {
  open: boolean;
  onClose: () => any;
  action: any;
}
export interface IState {}

class ActionDialog extends Component<IProps, IState> {
  static defaultProps = {
    open: false,
    action: {
      type: 'No Type',
      schema: {}
    },
    onClose: () => {}
  };

  private handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { open, onClose, action } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <DialogTitle>{action.type}</DialogTitle>
        <DialogContent>
          <DialogContentText>{action.description}</DialogContentText>
          <ObjectForm schema={action.schema} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default ActionDialog;
