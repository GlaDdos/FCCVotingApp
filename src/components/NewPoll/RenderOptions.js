import React from 'react';
import {Field} from 'redux-form';

import renderField from './RenderField';

const renderOptions = ({ fields, meta: {error} }) => (
    <div>
            {
                fields.map((option, index) =>
                <div className="row" style={{marginBottom: '10px'}}>
                <div className="col-sm-11">
                    <Field name={option} type="text" component={renderField} label={`Option nr ${index + 1}`} />
                </div>
                <div className="col-sm-1">
                    <button className="close" type="button" title="Remove option" onClick={() => fields.remove(index)}>X</button>
                </div>
                </div>
                )
            }
            {error && <div className={error}>{error}</div>}
        <button type="button" className="btn" onClick={() => fields.push()}>Add option</button>
    </div>
)

export default renderOptions;