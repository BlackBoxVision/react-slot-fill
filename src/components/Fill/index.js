import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';
import { InnerFill } from './components/InnerFill';

export const Fill = (props) => (
    <SlotAndFillContext.Consumer>
        {(context) => (
            <InnerFill slotId={props.id} context={context}>
                {props.children}
            </InnerFill>
        )}
    </SlotAndFillContext.Consumer>
);

Fill.displayName = "Fill";

Fill.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
};

Fill.defaultProps = {
    children: []
};