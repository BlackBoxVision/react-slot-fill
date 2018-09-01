import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';
import { InnerFill } from './components/InnerFill';

export class Fill extends React.Component {
    static displayName = "Fill";

    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.any.isRequired
    };

    static defaultProps = {
        children: []
    };

    render() {
        const { id, children } = this.props;

        return (
            <SlotAndFillContext.Consumer>
                {(context) => (
                    <InnerFill slotId={id} context={context}>
                        {children}
                    </InnerFill>
                )}
            </SlotAndFillContext.Consumer>
        );
    }
}