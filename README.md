# react-multiselect
A multiselect component aiming to mimic the look and feel of bootstrap-multiselect

This is essentially just react-select with a few custom components ro make it behave like a bootstrap-multiselect, so the API is the same, with a few additions.

## Props

* isAsync [bool (false)]: Makes the select Async.
* isBitfield [bool (false)]: Makes the select behave like a bitfield. Value is expected to be an int.
* hideSelectAll [bool (false)]: Hide the "Select All" option.
* showGroupInValue [bool (false)]: For option groups, show group name in value label.
* displayMax [int]: The max number of value labels to show before displaying a placeholder.

## Styling
Styling works the same as it does in react-select with the added "selectAll" style key for styling the "Select All" option.
