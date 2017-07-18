import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { getPoll } from '../../actions/poll';
import { deletePoll } from '../../actions/userPolls';

import Chart from '../Chart/Chart'
import Loader from '../Utils/Loader';

class UserPoll extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.getPoll(this.props.params.id);
    }

    render(){
        const { isRequesting, isSuccess, poll, token} = this.props;
        if(!isSuccess){
            return (
                <Loader loading={isRequesting} />
            );

        } else {
            return (
<div className="container-fluid">
    <div className="panel panel-info">
        <div className="panel-heading">
            <div className="centered">
                <h3>{poll.title}</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <div className="centered">
                    <h3>Options</h3>
                </div>
                {
                    poll.options.map((option, index) => (
                        <div className="row voteOption">    
                            <div>{`${index + 1}. ${option.name} (${option.votes} votes)`}</div>
                            <div className="meter">
                                <div style={{width: `${Math.round(option.votes / poll.votes * 100)}%`}}></div>
                            </div>
                        </div>
                    ))

                }

                <div className="row voteOption">
                    <div className="text-right">
                        <h4>Total votes: {poll.votes}</h4>
                    </div>
                </div>

            </div>

            <div className="col-md-6" style={{paddingTop: '30px'}}>
                <Chart poll={poll}/>
            </div>

        </div>
        
        <div className="row voteShare">
            <h3>Share this poll:</h3>
            <button className="btn btn-link-2 share-twitter" onClick={() => window.open('https://twitter.com/intent/tweet?text=please update link in production <3')}> <span className="fa fa-twitter share-base"></span></button>
            <button className="btn btn-link-2 share-google-plus" onClick={() => window.open('https://plus.google.com/share?url=this too please :)')}><span className="fa fa-google-plus share-base  spacing-left-5" ></span></button>
        </div>            

        <div className="row row-footer text-right">
            <button className="btn btn-short" onClick={() => {browserHistory.push(`/poll/${poll._id}`)}}>Go to poll</button>
            <button className="btn btn-short" onClick={browserHistory.goBack}>Back</button>
        </div>

    </div>
</div>

            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPoll: (pollId) => dispatch(getPoll(pollId)),
        deletePoll: (token, pollId) => dispatch(deletePoll(token, pollId))
    };
};

const mapStateToProps = (state) => {
    return {
        isRequesting: state.poll.isRequesting,
        isSuccess: state.poll.isSuccess,
        poll: state.poll.poll,

        token: state.auth.token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPoll)