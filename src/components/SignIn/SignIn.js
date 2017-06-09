import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/register';

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
    const { handleSubmit, pristine } = this.props;

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
                    <label className="sr-only" htmlFor="firstName">First name</label>
                    <Field name="firstName" className="form-control" component="input" type="text"  placeholder="First name" />
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="lastName">Last name</label>
                    <Field name="lastName" className="form-control" component="input" type="text" placeholder="Last name" />
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="email">Email</label>
                    <Field name="email" className="form-control" component="input" type="text" placeholder="Email"/>
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="password">Password</label>
                    <Field name="password" className="form-control" component="input" type="password" placeholder="Password" />
                  </div>
                <button type="submit" className="btn" disabled={pristine}>Sign In</button>
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
