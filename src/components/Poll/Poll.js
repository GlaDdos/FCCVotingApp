import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { vote } from '../../actions/vote';
import { getPoll } from '../../actions/poll';

import Chart from '../Chart/Chart';


export class Poll extends React.Component {
  constructor(props){
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  componentWillMount(){
    this.props.getPoll(this.props.params.id);
  }

  formSubmit(e){
    e.preventDefault();

    this.props.vote(this.props.poll._id, this.props.poll.options[this.state.selectedOption]._id);
  }

  render(){
    if(!this.props.dataSuccess){
      return (
        <div className="centered"><p>Data is fetching</p></div>
      )
    } else {

    return(
      <div className="container-fluid">
        <div className="row">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="centered">
                <h4>{this.props.poll.title} by {this.props.poll.owner.profile.firstName} {this.props.poll.owner.profile.lastName}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <form onSubmit={this.formSubmit}>
              {
                this.props.poll.options.map((option, index) => (
                  <div className="radio" key={index}>
                    <label>
                      <input
                        type="radio"
                        id={option._id}
                        value={index}
                        checked={index}

                      />
                      {option.name}
                    </label>
                  </div>
                ))
              }
              <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
          
          <div className="col-md-6">
            <Chart poll={this.props.poll}/>
          </div>

        </div>
    </div>
    );}
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    vote: (id, voteId) => dispatch(vote(id, voteId)),
    getPoll: (pollId) => dispatch(getPoll(pollId))
  };
};

const mapStateToProps = (state) => {
  return {
    isRequesting: state.vote.isRequesting,
    isSuccess: state.vote.isSuccess,
    statusText: state.vote.statusText,

    dataRequesting: state.poll.isRequesting,
    dataSuccess: state.poll.isSuccess,

    poll: state.poll.poll
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);