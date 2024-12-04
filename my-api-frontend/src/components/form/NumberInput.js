import React from 'react';

const NumberInput = ({ label, name, value, onChange, required }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default NumberInput;