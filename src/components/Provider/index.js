import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext, SlotAndFillManager } from '../../context';

export class Provider extends React.Component {
    static displayName = "SlotAndFillProvider";

    static propTypes = {
        children: PropTypes.any.isRequired
    };

    static defaultProps = {
        children: []
    };

    state = {
        manager: new SlotAndFillManager()
    };

    render() {
        return (
            <SlotAndFillContext.Provider value={this.state.manager}>
                {this.props.children}
            </SlotAndFillContext.Provider>
        );
    }
}