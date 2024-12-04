import React from 'react';
import TextInput from './TextInput';

const EmailInput = ({ label, name, value, onChange, required }) => {
    const emailValidation = (value) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
    };

    return (
        <TextInput
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            validation={emailValidation}
            required={required}
        />
    );
};

export default EmailInput;
