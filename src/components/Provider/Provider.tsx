import React from 'react';
import { SlotFillContext, SlotFillManager } from '../../context';

export interface SlotFillProviderState {
  context: any;
}

export interface SlotFillProviderProps {
  children?: any;
}

class SlotFillProvider extends React.Component<
  SlotFillProviderState,
  SlotFillProviderProps
> {
  static displayName = 'SlotFillProvider';

  static defaultProps = {
    children: [],
  };

  state = {
    context: new SlotFillManager(),
  };

  render() {
    return (
      <SlotFillContext.Provider value={this.state.context}>
        {this.props.children}
      </SlotFillContext.Provider>
    );
  }
}

export default SlotFillProvider;
