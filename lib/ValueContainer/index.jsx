import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

export default class ValueContainer extends React.Component {
    static propTypes = {
        selectProps: PropTypes.shape({
            displayMax: PropTypes.number,
        }),
    };

    render() {
        const {
            selectProps: { displayMax },
            children,
            ...props
        } = this.props;
        const [values, input] = children;

        return (
            <components.ValueContainer {...props}>
                {displayMax && values && values.length > displayMax ? (
                    <div className="Select-value Select-display-max">
                        <span className="Select-value-label">
                            {values.length} options selected
                        </span>
                    </div>
                ) : (
                    values
                )}
                {input}
            </components.ValueContainer>
        );
    }
}
