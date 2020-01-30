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

  private Row = (props: any) => {
    const { name, collection, indexes } = props.state;
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
        <this.LeftColumn name={name} collection={collection} />
        <this.RightColumn indexes={indexes} />
      </div>
    );
  };

  private LeftColumn = (props: any) => {
    const { name, collection } = props;
    return (
      <div style={{ flex: 4, padding: '10px 32px' }}>
        <span>
          <strong>{name}</strong> (entries: {collection.length})
        </span>
        <hr
          style={{ height: 1, backgroundColor: '#00000044', border: 'none' }}
        />
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
