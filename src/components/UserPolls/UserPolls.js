import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { userPollsRequest, dismissError } from '../../actions/userPolls';
import { deletePoll } from '../../actions/userPolls';

import List from './List';
import Modal from '../Utils/Modal';



class UserPolls extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.userPollsRequest(this.props.id);
    }

    render(){
        return(
            <div>
                <List 
                    listTitle={`Polls created by ${this.props.firstName} ${this.props.lastName}`}
                    isSuccess={this.props.isSuccess} 
                    isRequesting={this.props.isRequesting}
                    polls={this.props.polls}
                    token={this.props.token}
                    deletePoll={this.props.deletePoll}
                />
                { this.props.isError && <Modal header={this.props.status} body={this.props.statusText} onClick={this.props.dismissError} /> }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPollsRequest: (id) => dispatch(userPollsRequest(id)),
        deletePoll: (token, pollId) => dispatch(deletePoll(token, pollId)),
        dismissError: () => dispatch(dismissError())
    };
}

const mapStateToProps = (state) => {
    return {
        isRequesting: state.userPolls.isRequesting,
        isSuccess: state.userPolls.isSuccess,
        polls: state.userPolls.polls,
        isError: state.userPolls.error.isError,
        status: state.userPolls.error.status,
        statusText: state.userPolls.error.statusText,
        id: state.auth.userId,
        token: state.auth.token,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPolls);