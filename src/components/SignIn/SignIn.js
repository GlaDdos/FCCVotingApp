import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';

const form = reduxForm({
  form: 'signIn'
});

class SignIn extends Component {

  handleFormSubmit(formProps){
    this.props.registerUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div>
          <span><strong>ERROR!</strong>{this.props.errorMessage}</span>
        </div>
      )
    }
  }
  render(){
    const { handleSubmit } = this.props;

    return(
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
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

function mapStateToProps(state){
  return {
    errorMessage: state.auth.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user) => { dispatch(registerUser(user))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(form(SignIn));
