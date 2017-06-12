import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label className="sr-only">{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} className="input-long"/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

export default renderField;