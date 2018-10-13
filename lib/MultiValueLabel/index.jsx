import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

export default class MultiValueLabel extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        selectProps: PropTypes.shape({
            showGroupInValue: PropTypes.bool,
        }),
    };

    render() {
        const {
            data,
            children,
            selectProps: { showGroupInValue },
        } = this.props;

        return (
            <components.MultiValueLabel {...this.props}>
                {children}
                {showGroupInValue && data.group && ` (${data.group})`}
            </components.MultiValueLabel>
        );
    }
}
