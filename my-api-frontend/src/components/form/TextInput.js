import React from 'react';

const TextInput = ({ label, name, value, onChange, validation, required }) => {
    const handleValidation = (e) => {
        if (validation) {
            const errorMessage = validation(e.target.value);
            e.target.setCustomValidity(errorMessage || '');
        } else {
            e.target.setCustomValidity('');
        }
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleValidation}
                required={required}
            />
        </div>
    );
};

export default TextInput;