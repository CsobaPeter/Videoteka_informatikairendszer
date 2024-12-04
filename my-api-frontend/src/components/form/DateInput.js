import React from "react";

const DateInput = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="datetime-local"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default DateInput;