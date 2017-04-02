import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignIn extends Component {
  render(){
    return(
      <div>
        <form onSubmit="">
          <div className="row">
            <div className="col-md-6">
              <label>First name</label>
              <Field name="firstName" className="form-control" component="input" type="text" />
            </div>
            <div className="col-md-6">
              <label>Last name</label>
              <Field name="lastName" className="form-control" component="input" type="text" />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <Field name="email" className="form-control" component="input" type="text" />
            </div>
            <div className="col-md-6">
              <label>Password</label>
              <Field name="password" className="form-control" component="input" type="password" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({form: 'signin'})(SignIn);
