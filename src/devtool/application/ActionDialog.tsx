import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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

  private handleCommit = () => {
    return null;
  };

  render() {
    const { open, action } = this.props;
    const type = action.type || '';
    const actionTypes = type.split('/');
    const parentType = actionTypes[0];
    const childType = actionTypes[1];
    return (
      <Dialog open={open}>
        <DialogTitle>
          <span style={{ opacity: 0.5 }}>{parentType}/</span>
          {childType}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{action.description}</DialogContentText>
          <ObjectForm schema={action.schema} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={this.handleClose}
            color="secondary"
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={this.handleCommit}
            color="primary"
            variant="outlined"
          >
            Commit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ActionDialog;
