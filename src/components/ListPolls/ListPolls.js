import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getPolls } from '../../actions/polls';

export class ListPolls extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getPolls();
  }

  render(){
    let body = null;
    if(this.props.isSuccess){
      body =
        <div className="list-group">
        {
          this.props.polls.map((poll, index) => (
            <Link key={index} to={'/poll/' + poll._id}>
              <button key={index} type="button" className="list-group-item">{poll.title}</button>
            </Link>
          ))
        }
      </div>;
    }else{
      body = <div className="centered"><p>Data is fetching</p></div>;
    }

    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="centered">
            <h4>Polls created by users.</h4>
          </div>
        </div>

        <div className="panel-body">
          {body}
        </div>
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
