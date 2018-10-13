import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import baseStyles from './styles';
import getSelectableOptions from 'util/getSelectableOptions';

export default class MenuList extends React.Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        getValue: PropTypes.func.isRequired,
        clearValue: PropTypes.func.isRequired,
        setValue: PropTypes.func.isRequired,
        selectProps: PropTypes.shape({
            hideSelectAll: PropTypes.bool,
        }),
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    allSelected() {
        const options = getSelectableOptions(this.props.options);
        return options.length === this.props.getValue().length;
    }

    onClick() {
        const { clearValue, setValue, options } = this.props;

        if (this.allSelected()) {
            clearValue();
        } else {
            setValue(this.selectableOptions(options));
        }
    }

    render() {
        const {
            selectProps: { hideSelectAll, styles },
        } = this.props;

        return (
            <components.MenuList {...this.props}>
                {!hideSelectAll && (
                    <div
                        onClick={this.onClick}
                        style={styles && styles.selectAll ? styles.selectAll(baseStyles) : baseStyles}
                    >
                        <input type="checkbox" checked={this.allSelected()} readOnly /> Select All
                    </div>
                )}
                {this.props.children}
            </components.MenuList>
        );
    }
}
