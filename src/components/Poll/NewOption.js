import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { pollAddOptionDisable, updatePoll } from '../../actions/poll';

const form = reduxForm({
    form: 'option'
});

export  class NewOption extends React.Component {
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(formProps){
        this.props.updatePoll(this.props.token, this.props.pollId, formProps);
    }

    render(){
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <div className="form-inline">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <label className="sr-only">New option</label>
                        <Field
                            name="option"
                            component="input"
                            type="text"
                            placeholder="New option"
                            className="form-control input-short" />
                    <button className="btn btn-short " type="submit" disabled={pristine | submitting }>{'Save & vote'}</button>
                    <button className="btn btn-short btn-red" onClick={this.props.pollAddOptionDisable} >Cancel</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        updateRequesting: state.updateRequesting,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePoll: (token, pollId, option) => dispatch(updatePoll(token,pollId, option)),
        pollAddOptionDisable: () => dispatch(pollAddOptionDisable())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(form(NewOption));