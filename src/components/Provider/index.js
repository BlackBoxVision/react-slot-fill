import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext, SlotAndFillManager } from '../../context';

export default class SlotAndFillProvider extends React.Component {
    static displayName = "SlotAndFillProvider";

    static propTypes = {
        children: PropTypes.children.any
    };

    state = {
        manager: new SlotAndFillManager()
    };

    render() {
        return (
            <SlotAndFillContext.Provider value={this.state.manager}>
                {React.Children.only(this.props.children)}
            </SlotAndFillContext.Provider>
        );
    }
}