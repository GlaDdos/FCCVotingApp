import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../../actions/userPolls';

export class NewPoll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      owner: null,
      options: [],
      title: ''
    };

    this.handleChange = this.handleTitleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount(){
    this.setState({ owner: this.props.userId });

  }

  handleTitleChange(e){
    this.setState({title: e.target.value});
  }

  addOption(){
    this.state.options.push({name: ''});
    this.setState({options: this.state.options});
  }

  handleOptionChange(e, index){
    const options = this.state.options;
    options[index].name = e.target.value;
    this.setState({
      options,
    });
  }

  removeOption(index){
    this.state.options.splice(index, 1);
    this.setState({options: this.state.options});
  }

  render(){
    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="centered">
            <input
              type="text"
              className="input-title"
              placeholder="Add a titile"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>
        </div>

        <div className="panel-body">
          <div className="centered">
            {
              this.state.options.map((options, index) => (
                <div key={index}>
                  <label>{index + 1}.</label>
                  <input
                    type="text"
                    key={index}
                    className="input-option"
                    value={this.state.options[index].name}
                    onChange={event => this.handleOptionChange(event, index)}
                  />
                  <span className="glyphicon glyphicon-minus icon" aria-label="remove option" onClick={() => (this.removeOption(index))} />
                </div>
              ))
            }
          </div>

          <div className="centered">
            <button type="submit" action="" className="btn-add-option" onClick={this.addOption.bind(this)}><span className="glyphicon glyphicon-plus" aria-hidden="true" /> Add an option</button>
          </div>

          <div className="form-group">
            <div className="text-right">
              {
                //TODO: payload should contain a user id (todo after authentication)
              }
              <button type="submit" action="" className="btn btn-default" onClick={() => this.props.createPoll(this.state)}>Save</button>
              {
                //TODO: redirect to poolView?
              }
              <button type="submit" action="" className="btn btn-default" onClick={''}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (data) => dispatch(createPoll(data))
  };
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.userPolls.isFetching,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
