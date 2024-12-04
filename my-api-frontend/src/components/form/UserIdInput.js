import React from 'react';
import TextInput from './TextInput';

const UserIdInput = ({ label, name, value, onChange, required }) => {
    return (
        <TextInput
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
};

export default UserIdInput;