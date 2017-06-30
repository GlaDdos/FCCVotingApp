import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { userPollsRequest, dismissError } from '../../actions/userPolls';
import { deletePoll, requestDelete, dismissRequestDelete } from '../../actions/userPolls';

import List from './List';
import Modal from '../Utils/Modal';
import Dialog from '../Utils/Dialog';



class UserPolls extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.id){
            this.props.userPollsRequest(this.props.id);
        }
        else {
            browserHistory.push('/login');
        }
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
                    requestDelete={this.props.requestDelete}
                    deleteRequest={this.props.deleteRequest}
                />
                { this.props.isError && <Modal header={this.props.status} body={this.props.statusText} onClick={this.props.dismissError} /> }
                { this.props.deleteRequest && <Dialog header={'Delete'} body={`Are you sure you want to delete poll?`} onCancel={this.props.dismissRequestDelete} onDelete={() => (this.props.deletePoll(this.props.token, this.props.deleteId))} /> }

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPollsRequest: (id) => dispatch(userPollsRequest(id)),
        deletePoll: (token, pollId) => dispatch(deletePoll(token, pollId)),
        dismissError: () => dispatch(dismissError()),
        requestDelete: (id) => dispatch(requestDelete(id)),
        dismissRequestDelete: () => dispatch(dismissRequestDelete())
    };
}

const mapStateToProps = (state) => {
    return {
        isRequesting: state.userPolls.isRequesting,
        isSuccess: state.userPolls.isSuccess,
        polls: state.userPolls.polls,
        deleteId: state.userPolls.deleteId,
        isError: state.userPolls.error.isError,
        status: state.userPolls.error.status,
        statusText: state.userPolls.error.statusText,
        deleteRequest: state.userPolls.deleteRequest,
        id: state.auth.userId,
        token: state.auth.token,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPolls);