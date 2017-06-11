import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import NewOption from './NewOption';

import { vote } from '../../actions/vote';
import { getPoll, pollAddOptionEnable, pollAddOptionDisable } from '../../actions/poll';

import Chart from '../Chart/Chart';


const form = reduxForm({
  form: 'vote'
});

export class Poll extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.getPoll(this.props.params.id);
  }
  
  componentWillUnmount(){
    this.props.pollAddOptionDisable();
  }

  handleFormSubmit(formProps){
    this.props.vote(this.props.params.id, formProps.option); 
  }

  render(){
    const { handleSubmit, pristine, submitting, poll, addOption, isAuthenticated } = this.props;
    const { pollAddOptionEnable } = this.props;

    if(!this.props.dataSuccess){
      return (
        <div className="centered"><p>Data is fetching</p></div>
      )
    } else {

    return(
      <div className="container-fluid">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="centered">
                <h3>{this.props.poll.title} by {this.props.poll.owner.profile.firstName} {this.props.poll.owner.profile.lastName}</h3>
              </div>
            </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="form_container">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {
                  poll.options.map((option, index) => (
                      <label className="control control-radio">
                        {option.name}
                        <Field
                          name='option'
                          component="input"
                          type="radio"
                          value={option._id}
                        />
                        <div className="control_indicator"></div>
                        <div className="control_indicator_after"></div>
                      </label>
                  ))
                }
                
                {
                  (isAuthenticated && !addOption) ?  <div><label className="control control-radio" onClick={pollAddOptionEnable}>Other<div className="control_indicator"></div><div className="control_indicator_after"></div></label></div> : null
                }

                {
                  addOption ? null : <button className="btn" type="submit" disabled={pristine | submitting}>Vote</button>
                }

              </form>
              {
                addOption ? <NewOption pollId={this.props.params.id} /> : null
              }
            </div>


          </div>
          
          <div className="col-md-6">
            <Chart poll={poll}/>
          </div>

        </div>
      </div>
    </div>
    );}
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    vote: (id, voteId) => dispatch(vote(id, voteId)),
    getPoll: (pollId) => dispatch(getPoll(pollId)),
    pollAddOptionEnable: () => dispatch(pollAddOptionEnable()),
    pollAddOptionDisable: () => dispatch(pollAddOptionDisable())
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,

    isRequesting: state.vote.isRequesting,
    isSuccess: state.vote.isSuccess,
    statusText: state.vote.statusText,

    addOption: state.poll.addOption,
    dataRequesting: state.poll.isRequesting,
    dataSuccess: state.poll.isSuccess,
    poll: state.poll.poll

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Poll));