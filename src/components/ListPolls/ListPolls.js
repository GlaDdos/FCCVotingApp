import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getPolls } from '../../actions/polls';

import Loader from '../Utils/Loader';

export class ListPolls extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getPolls();
  }

  render(){
    const {isRequesting} = this.props;

    let body = null;
    if(this.props.isSuccess){
      body =
        <div className="list-group">
        {
          this.props.polls.map((poll, index) => (
            <Link key={index} to={'/poll/' + poll._id}>
              <div key={poll._id} className="btn-link-1">{poll.title}</div>
            </Link>
          ))
        }
      </div>
    }

    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="centered">
            <h3>Polls created by users.</h3>
          </div>
        </div>

        <div className="panel-body">
          {body}
        </div>
          <Loader loading={isRequesting} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPolls: () => dispatch(getPolls())
  };
};

const mapStateToProps = (state) => {
  return {
    isRequesting: state.polls.isRequesting,
    isSuccess: state.polls.isSuccess,
    polls: state.polls.polls
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPolls);
