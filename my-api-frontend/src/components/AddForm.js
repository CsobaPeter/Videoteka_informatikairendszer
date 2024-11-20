import React from 'react';
import '../styles/AddForm.css';

const AddForm = ({ fields, onSubmit }) => {
    const handleValidation = (field, e) => {
        const input = e.target;

        if (field.validation) {
            const errorMessage = field.validation(input.value);
            input.setCustomValidity(errorMessage || '');
        } else {
            input.setCustomValidity('');
        }
    };

    return (
        <form onSubmit={onSubmit} className="add-form">
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label>{field.label}</label>
                    {field.type === 'dropdown' ? (
                        <select
                            name={field.name}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e);
                                handleValidation(field, e);
                            }}
                            required={field.required}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={index}>
                                    {`${index} - ${option}`}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            max={field.type === 'rating' ? 10 : undefined}
                            min={field.type === 'number' ? 0 : undefined}
                            name={field.name}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e);
                                handleValidation(field, e);
                            }}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddForm;
