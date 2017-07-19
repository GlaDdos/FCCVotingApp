import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import renderField from './RenderField';
import { registerUser } from '../../actions/register';

import validate from './validate';

const form = reduxForm({
  form: 'signIn',
  validate
});

class SignIn extends Component {

  handleFormSubmit(formProps){
    this.props.registerUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }
  }
  render(){
    const { handleSubmit, pristine, submitting, error, submitFailed } = this.props;

    return(
      <div className="row">
        <div className="col-sm-10 col-md-8 col-lg-8 center-block">
          <div className="form-container">
            <div className="form-header">
              <div className="form-header-left">
                <h3>Sign up to VoterApp</h3>
                <p>Fill fields below to create an account: </p>
              </div>
              <div className="form-header-right">
                <span className="glyphicon glyphicon-pencil" />
              </div>
            </div>
            <div className="form-body">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {this.renderAlert()}
                  <div className="form-group">
                    <Field name="firstName" className="form-control" component={renderField} type="text"  label="First name"/>
                  </div>
                  <div className="form-group">
                    <Field name="lastName" className="form-control" component={renderField} type="text" label="Last name" />
                  </div>
                  <div className="form-group">
                    <Field name="email" className="form-control" component={renderField} type="text" label="Email"/>
                  </div>
                  <div className="form-group">
                    <Field name="password" className="form-control" component={renderField} type="password" label="Password" />
                  </div>
                   <div className="form-group">
                    <Field name="passwordConfirmation" className="form-control" component={renderField} type="password" label="Confirm password" />
                  </div>
                <button type="submit" className="btn" disabled={pristine | submitting}>Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.register.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user) => { dispatch(registerUser(user))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(form(SignIn));
