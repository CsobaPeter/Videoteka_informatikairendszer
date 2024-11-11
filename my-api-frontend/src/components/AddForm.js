// src/components/AddForm.js
import React from 'react';
import '../styles/AddForm.css';

const AddForm = ({ fields, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="add-form">
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label>{field.label}</label>
                    <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        required={field.required}
                    />
                </div>
            ))}
            <button type="submit" onClick={() => alert("Added succesfully")}>Submit</button>
        </form>
    );
};

export default AddForm;