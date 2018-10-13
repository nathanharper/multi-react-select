import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { memoize, map, filter } from 'lodash';
import Option from './lib/Option';
import Group from './lib/Group';
import MultiValueLabel from './lib/MultiValueLabel';
import ValueContainer from './lib/ValueContainer';
import MenuList from './lib/MenuList';
import getSelectableOptions from './util/getSelectableOptions';

export default class ReactMultiSelect extends React.Component {
    static propTypes = {
        isAsync: PropTypes.bool.isRequired,
        isBitfield: PropTypes.bool.isRequired,
        hideSelectAll: PropTypes.bool.isRequired,
        showGroupInValue: PropTypes.bool.isRequired,
        displayMax: PropTypes.number,
    };

    static defaultProps = {
        isAsync: false,
        isBitfield: false,
        hideSelectAll: false,
        showGroupInValue: false,
        displayMax: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: props.defaultInputValue || '',
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.getValue = memoize(this.getValue);
    }

    onInputChange(inputValue, state) {
        const { onInputChange } = this.props;

        if (onInputChange) {
            onInputChange(inputValue, state);
        }

        switch (state.action) {
            case 'set-value':
                // this prevents the default behavior of the input clearing when an option is selected.
                return;
            default:
                this.setState({
                    inputValue,
                });
        }
    }

    filterOption(option, filterString) {
        const lowercaseFilter = filterString.toLowerCase();

        return (
            option.label.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
            (option.group &&
                option.group.toLowerCase().indexOf(lowercaseFilter) >= 0)
        );
    }

    getValue(value) {
        const { isBitfield, options } = this.props;

        if (!isBitfield) {
            return value;
        }

        const numVal = Number(value);

        return map(
            filter(getSelectableOptions(options), option => {
                return Number(option.value) & numVal;
            }),
            'value'
        );
    }

    render() {
        const { isAsync, value, ...props } = this.props;
        const SelectComponent = isAsync ? AsyncSelect : Select;

        return (
            <SelectComponent
                isClearable
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                inputValue={this.state.inputValue}
                onInputChange={this.onInputChange}
                filterOption={this.filterOption}
                {...props}
                value={this.getValue(value)}
                isMulti
                components={{
                    Option,
                    Group,
                    MultiValueLabel,
                    ValueContainer,
                    MenuList,
                    ...(props.components || {}),
                }}
            />
        );
    }
}
