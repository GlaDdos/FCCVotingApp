import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { userPollsRequest } from '../../actions/userPolls';
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
                listTitle={"Polls created by ....."}
                isSuccess={this.props.isSuccess} 
                polls={this.props.polls}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userPollsRequest: (id) => dispatch(userPollsRequest(id))
    };
}

const mapStateToProps = (state) => {
    return {
        isRequesting: state.userPolls.isRequesting,
        isSuccess: state.userPolls.isSuccess,
        polls: state.userPolls.polls,
        id: state.auth.userId
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPolls);