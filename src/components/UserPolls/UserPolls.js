import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { userPollsRequest } from '../../actions/userPolls';
import { deletePoll } from '../../actions/userPolls';

import List from './List';



class UserPolls extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.userPollsRequest(this.props.id);
    }

    render(){
        return(
            <List 
                listTitle={`Polls created by ${this.props.firstName} ${this.props.lastName}`}
                isSuccess={this.props.isSuccess} 
                isRequesting={this.props.isRequesting}
                polls={this.props.polls}
                token={this.props.token}
                deletePoll={this.props.deletePoll}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPollsRequest: (id) => dispatch(userPollsRequest(id)),
        deletePoll: (token, pollId) => dispatch(deletePoll(token, pollId))
    };
}

const mapStateToProps = (state) => {
    return {
        isRequesting: state.userPolls.isRequesting,
        isSuccess: state.userPolls.isSuccess,
        polls: state.userPolls.polls,
        id: state.auth.userId,
        token: state.auth.token,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPolls);