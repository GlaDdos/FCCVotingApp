import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
    form: 'login'
});

class Login extends Component{
    handleFormSubmit(formProps){
        this.props.loginUser(formProps);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <span>{this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render(){
        const { handleSubmit, isAuthenticating, isAuthenticated, pristine } = this.props;

        return(
            <div className="row">
                <div className="col-sm-10 col-md-8 col-lg-8 center-block">
                    <div className="form-container">
                        <div className="form-header">
                            <div className="form-header-left">
                                <h3>Login to VoterApp</h3>
                                <p>Enter username and password to log in:</p>
                            </div>

                            <div className="form-header-right">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                        </div>

                        <div className="form-body">
                            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                {this.renderAlert()}
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <Field name="email" className="form-control" component="input" type="text" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <Field name="password" className="form-control" component="input" type="password" placeholder="Password" />
                                </div>
                                
                                <button type="submit" className="btn" disabled={ pristine | this.props.isAuthenticating }>Login</button>
                            </form>
                        </div>

                        <div className="form-footer">
                            <h3>...or login with:</h3>
                            <div className="social-login">
                                <a className="btn btn-link-2" href="http://voting.gladdos.usermd.net/auth/facebook"><i className="fa fa-facebook"/> Facebook</a>
                                <a className="btn btn-link-2" href="http://voting.gladdos.usermd.net/auth/github"><i className="fa fa-github"/> GitHub</a>
                                <a className="btn btn-link-2" href="http://voting.gladdos.usermd.net/auth/google"><i className="fa fa-google-plus"/> Google Plus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.errorMessage,
        isAuthenticating: state.auth.isAuthenticating,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => { dispatch(loginUser(user)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));