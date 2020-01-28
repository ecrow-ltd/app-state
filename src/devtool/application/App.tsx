import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reducer from '../../state/Reducer';

export interface IProps {
  state: any;
}
export interface IState {
  reducers: Reducer<any>[];
}

const mapStateToProps = (state: any) => ({
  state
});

@(connect(mapStateToProps) as any)
class App extends Component<IProps, IState> {
  static defaultProps = {
    state: {}
  };

  state = {
    reducers: Reducer.all()
  };

  constructor(props: IProps) {
    super(props);
  }

  Row(props: any) {
    const { name, collection } = props.state;
    return (
      <div
        style={{
          backgroundColor: '#b0bed4',
          color: '#313b4a',
          display: 'flex',
          padding: '10px 32px',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}
      >
        <div style={{ flex: 1 }}>
          <strong>{name}</strong>
        </div>
        <div>Entries: {collection.length}</div>
      </div>
    );
  }

  render() {
    const { reducers } = this.state;
    return (
      <div>
        {reducers.map(reducer => (
          <this.Row state={reducer.getState()} />
        ))}
      </div>
    );
  }
}

export default App;
