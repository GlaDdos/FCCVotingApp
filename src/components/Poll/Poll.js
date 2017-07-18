import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';

import NewOption from './NewOption';

import { vote } from '../../actions/vote';
import { getPoll, pollAddOptionEnable, pollAddOptionDisable, dismissError } from '../../actions/poll';

import Chart from '../Chart/Chart';
import Loader from '../Utils/Loader';
import Modal from '../Utils/Modal';


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
    const { handleSubmit, pristine, submitting, poll, addOption, isAuthenticated, isRequesting, dataRequesting, dataSuccess, isError } = this.props;
    const { pollAddOptionEnable } = this.props;

    if(dataRequesting || !dataSuccess){

      if(this.props.isError){
        return(
          <Modal header={this.props.status} body={this.props.statusText} onClick={this.props.dismissError} />
        );
      } else {
        return (
            <Loader loading={dataRequesting} />
        );
    }} else {

    return(
      <div className="container-fluid">
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="centered">
                <h3>{this.props.poll.title} by {this.props.poll.owner.firstName} {this.props.poll.owner.lastName}</h3>
              </div>
            </div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="form_container">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {
                  poll.options.map((option, index) => (
                      <label className="control control-radio" key={option._id}>
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
          {
            isAuthenticated && (
              <div className="row voteShare">
                  <h3>Share this poll:</h3>
                  <button className="btn btn-link-2 share-twitter" onClick={() => window.open('https://twitter.com/intent/tweet?text=please update link in production <3')}> <span className="fa fa-twitter share-base"></span></button>
                  <button className="btn btn-link-2 share-google-plus" onClick={() => window.open('https://plus.google.com/share?url=this too please :)')}><span className="fa fa-google-plus share-base  spacing-left-5" ></span></button>
              </div>   
            )
          }
        <div className="row row-footer text-right">
            <button className="btn btn-short" onClick={browserHistory.goBack}>Back</button>
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
    pollAddOptionDisable: () => dispatch(pollAddOptionDisable()),
    dismissError: () => dispatch(dismissError())
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
    poll: state.poll.poll,

    isError: state.poll.error.isError,
    status: state.poll.error.status,
    statusText: state.poll.error.statusText

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Poll));