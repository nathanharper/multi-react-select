import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

export default class Option extends React.Component {
    static propTypes = {
        isSelected: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <components.Option {...this.props}>
                <input type="checkbox" checked={this.props.isSelected} readOnly /> {this.props.children}
            </components.Option>
        );
    }
}
