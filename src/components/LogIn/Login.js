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
                <div>
                    <span><strong>ERROR!</strong>{this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render(){
        const { handleSubmit, isAuthenticating, isAuthenticated } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <div>
                        <label>Email</label>
                        <Field name="email" className="form-control" component="input" type="text" />
                    </div>

                    <div>
                        <label>Password</label>
                        <Field name="password" className="form-control" component="input" type="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.props.isAuthenticating}>Login</button>
                </form>
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