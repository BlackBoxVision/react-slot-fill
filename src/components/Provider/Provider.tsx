import React from 'react';
import { SlotFillContext, SlotFillManager } from '../../context';

export interface SlotFillProviderState {
  context: SlotFillManager;
}

export interface SlotFillProviderProps {
  children?: any;
}

export class SlotFillProvider extends React.Component<
  SlotFillProviderProps,
  SlotFillProviderState
> {
  static displayName = 'SlotFillProvider';

  static defaultProps = {
    children: [],
  };

  state: SlotFillProviderState = {
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
