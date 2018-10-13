import { memoize, flatMap } from 'lodash';

const getSelectableOptions = memoize(function(options) {
    return flatMap(options, function(option) {
        return option.options || option;
    });
});

export default getSelectableOptions;
