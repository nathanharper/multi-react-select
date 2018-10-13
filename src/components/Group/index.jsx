import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { every, some, unionBy, differenceBy } from 'lodash';

export default class Group extends React.Component {
    static propTypes = {
        getValue: PropTypes.func.isRequired,
        setValue: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.renderHeading = this.renderHeading.bind(this);
    }

    // returns true if all of the group's options are selected
    allSelected(options, values) {
        return every(options, option => some(values, ['value', option.value]));
    }

    onClick() {
        const { getValue, setValue, options } = this.props;
        const value = getValue();

        if (this.allSelected(options, value)) {
            // if all options are selected, deselect all options in this group
            setValue(differenceBy(value, options, 'value'));
        } else {
            // if there are unselected options in this group, select all options
            setValue(unionBy(value, options, 'value'));
        }
    }

    renderHeading(headingProps) {
        return (
            <components.GroupHeading {...headingProps}>
                <div onClick={this.onClick}>{headingProps.children}</div>
            </components.GroupHeading>
        );
    }

    render() {
        return (
            <components.Group {...this.props} Heading={this.renderHeading}>
                {this.props.children}
            </components.Group>
        );
    }
}
