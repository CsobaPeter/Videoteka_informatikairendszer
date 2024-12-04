import React from 'react';

const DropdownInput = ({ label, name, value, onChange, required, options }) => (
    <div className="form-group">
        <label>{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        >
            {options.map((option, index) => (
                <option key={index} value={index}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default DropdownInput;