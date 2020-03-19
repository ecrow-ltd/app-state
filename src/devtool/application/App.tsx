import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reducer from '../../state/Reducer';
import Button from '@material-ui/core/Button';
import ActionDialog from './ActionDialog';

export interface IProps {
  state: any;
}
export interface IState {
  reducers: Reducer<any>[];
}

/**
 * Map the state properties with properties we want to pass to the app component.
 */
const mapStateToProps = (state: any) => ({
  state
});

@(connect(mapStateToProps) as any)
/**
 * The main application component.
 */
class App extends Component<IProps, IState> {
  static defaultProps = {
    state: {}
  };

  state = {
    reducers: Reducer.all(),
    dialogOpen: false,
    dialogData: {}
  };

  constructor(props: IProps) {
    super(props);
  }

  /**
   * Row Component.
   */
  private Row = (props: any) => {
    const { _name, collection, _indexes } = props.state;
    return (
      <div
        style={{
          backgroundColor: '#b0bed4',
          color: '#313b4a',
          display: 'flex',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}
      >
        <this.LeftColumn
          name={_name}
          collection={collection}
          actions={props.actions}
        />
        <this.RightColumn indexes={_indexes} />
      </div>
    );
  };

  private LeftColumn = (props: any) => {
    const { name, collection, actions } = props;
    return (
      <div style={{ flex: 4, padding: '10px 32px' }}>
        <span>
          <strong>{name}</strong> (entries: {collection.length})
        </span>
        <hr
          style={{ height: 1, backgroundColor: '#00000044', border: 'none' }}
        />
        {Object.keys(actions).map((key: string) => (
          <this.ActionButton key={key} action={actions[key]} />
        ))}
      </div>
    );
  };

  private RightColumn = (props: any) => {
    const { indexes } = props;
    const indexKeys = Object.keys(indexes);
    return (
      <div
        style={{ flex: 1, backgroundColor: '#00000033', padding: '10px 32px' }}
      >
        <div>Indexes</div>
        <hr
          style={{ height: 1, backgroundColor: '#00000044', border: 'none' }}
        />
        <div>
          {indexKeys.map((indexKey, index) => {
            const append = index < indexKeys.length - 1 ? ', ' : '';
            return (
              <span style={{ fontSize: '0.75rem' }} key={indexKey}>
                {indexKey + append}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  private ActionButton = (props: any) => {
    const { action } = props;
    return (
      <Button
        style={{
          fontFamily: 'Verdana, Geneva, sans-serif',
          padding: '1px 8px',
          backgroundColor: '#3d4b5e',
          color: '#cfcfcf'
        }}
        variant="contained"
        onClick={() => this.handleDialogOpen(action)}
      >
        {action.type.split('/')[1]}
      </Button>
    );
  };

  private handleDialogOpen = (action: any) => {
    this.setState(state => ({
      ...state,
      dialogOpen: true,
      dialogData: action
    }));
  };

  private handleDialogClose = () => {
    this.setState(state => ({
      ...state,
      dialogOpen: false
    }));
  };

  render() {
    const { reducers } = this.state;
    return (
      <div>
        {reducers.map(reducer => (
          <this.Row
            key={reducer.getName()}
            state={reducer.getState()}
            actions={reducer.getActions()}
          />
        ))}
        <ActionDialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          action={this.state.dialogData}
        />
      </div>
    );
  }
}

export default App;
