import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { createPoll } from '../../actions/userPolls';
import renderField from './RenderField';
import renderOptions from './RenderOptions';

import validate from './validate';

const form = reduxForm({
  form: 'newPoll',
  validate
});

export class NewPoll extends React.Component {
  constructor(props){
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps){

    const optionsObj = formProps.options.map((el) => (
      {'name': el}
    ));

    const data = {
      owner: this.props.userId,
      title: formProps.title,
      options: optionsObj
    };

    this.props.createPoll(this.props.token, data);
  }

  render(){
    const { error, handleSubmit,  pristine, reset, submitting } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="panel panel-info">
          
          <div className="panel-heading">
            <div className="col-sm-10 col-md-8 col-lg-8 center-block" style={{marginTop: '30px'}}>
              <Field name="title" type="text" component={renderField} label="Title" />
            </div>
          </div>

           {error && <strong>{error}</strong>}

          <div className="panel-body">
            <div className="col-sm-10 col-md-8 col-lg-8 center-block">
              <FieldArray name="options" component={renderOptions} />
            </div>
            <div className="row-footer pull-right">
              <button className="btn btn-short" type="submit" disabled={pristine | submitting}>Save</button>
              <button className="btn btn-short btn-red" type="button" disabled={pristine | submitting} onClick={reset}>Clear</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (token, data) => dispatch(createPoll(token, data))
  };
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.userPolls.isFetching,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(form(NewPoll));
