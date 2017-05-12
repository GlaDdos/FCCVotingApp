import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { vote } from '../../actions/vote';
import Chart from '../Chart/Chart';


//TODO: if accessing directly from url store is not initialized, should check if store is empty and perform get polls or could be done in layout
export class Poll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedOption: 0,
      poll: {
        options: []
      }
    };

    this.getPollData = this.getPollData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({poll: this.getPollData(this.props.params.id)[0]})
  }

  getPollData(id){
    return this.props.polls.filter( (poll) => {
      return poll._id == id;
    });
  }

  handleChange(e){
    this.setState({
      selectedOption: Number(e.target.value)
    });
  }

  formSubmit(e){
    e.preventDefault();

    this.props.vote(this.state.poll._id, this.state.poll.options[this.state.selectedOption]._id);
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="centered">
                <h4>{this.state.poll.title} by {this.state.poll.owner.profile.firstName} {this.state.poll.owner.profile.lastName}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <form onSubmit={this.formSubmit}>
              {
                this.state.poll.options.map((option, index) => (
                  <div className="radio" key={index}>
                    <label>
                      <input
                        type="radio"
                        id={option._id}
                        value={index}
                        checked={this.state.selectedOption === index}
                        onChange={this.handleChange}
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
            <Chart poll={this.state.poll}/>
          </div>

        </div>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    vote: (id, voteId) => dispatch(vote(id, voteId))
  };
};

const mapStateToProps = (state) => {
  return {
    isRequesting: state.vote.isRequesting,
    isSuccess: state.vote.isSuccess,
    statusText: state.vote.statusText,

    polls: state.polls.polls
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);