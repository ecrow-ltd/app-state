import React, { PureComponent, CSSProperties } from 'react';

import TextField from '@material-ui/core/TextField';

export interface IProps {
  /**
   * The schema for a JSON object type.
   */
  schema: any;
}

export interface IState {}

// const userInterface: { [key: string]: React.ReactNode } = {
//   string: <TextField fullWidth variant="outlined" />
// };

class ObjectForm extends PureComponent<IProps, IState> {
  private keyToWords = (text: string) => {
    let result = text.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  private Input = (props: any) => {
    const { name, description, type, required } = props;

    const title = this.keyToWords(name);
    const input = this.getInputElementByType(
      type,
      title,
      description,
      required
    );

    const styleContainer: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 5
    };

    return (
      <div style={styleContainer}>
        <div>{input}</div>
      </div>
    );
  };

  private getInputElementByType = (
    type: string,
    label: string = '',
    description: string = '',
    required: boolean = false
  ) => {
    switch (type) {
      case 'string':
        return (
          <TextField
            label={label}
            fullWidth
            variant="outlined"
            helperText={description}
            required={required}
            style={{ marginBottom: 5 }}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { schema } = this.props;
    const schemaProps = schema.properties;
    const schemaRequires = schema.required || [];
    const Inputs = Object.keys(schemaProps).map(key => (
      <this.Input
        key={key}
        name={key}
        description={schemaProps[key].description}
        type={schemaProps[key].type}
        required={schemaRequires.includes(key)}
      />
    ));

    return <div>{Inputs}</div>;
  }
}

export default ObjectForm;
