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
            <div className="toAdd">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <label>
                        <Field
                            name="option"
                            component="input"
                            type="text"
                            placeholder="New option" />
                    </label>
                    <button className="btn btn-default" type="submit" disabled={pristine | submitting }>{'Save & vote'}</button>
                    <div className="btn btn-default" onClick={this.props.pollAddOptionDisable} >Cancel</div>
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