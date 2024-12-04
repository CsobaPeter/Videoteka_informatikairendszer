import React from 'react';
import TextInput from './TextInput';

const PhoneInput = ({ label, name, value, onChange, required }) => {
    const phoneValidation = (value) => {
        const phoneNumberRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?(\d{2,4}[-. ]*\d{2,4}[-. ]*\d{2,4})\s*$/gm;
        return phoneNumberRegex.test(value) ? '' : 'Please enter a valid phone number.';
    };

    return (
        <TextInput
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            validation={phoneValidation}
            required={required}
        />
    );
};

export default PhoneInput;