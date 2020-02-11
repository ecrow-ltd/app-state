import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export interface IProps {
  open: boolean;
  onClose: () => any;
}
export interface IState {}

class ActionDialog extends Component<IProps, IState> {
  static defaultProps = {
    open: false,
    onClose: () => {}
  };

  private handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose}>
        <DialogTitle>This is the title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is the textual content of the dialog.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ActionDialog;
