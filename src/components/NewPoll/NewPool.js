import React, { PropTypes } from 'react';

class NewPoll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      options: [],
      title: ''
    };

    this.handleChange = this.handleTitleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange(e){
    this.setState({title: e.target.value});
  }

  addOption(){
    this.state.options.push('');
    this.setState({options: this.state.options});
  }

  handleOptionChange(e, index){
    const options = this.state.options;
    options[index] = e.target.value;
    this.setState({
      options,
    });
  }

  removeOption(index){
    this.state.options.splice(index, 1);
    this.setState({options: this.state.options});
    //TODO: remove refs and add onChange function which update state during typying, delete opstion function should take index argument and delete item from state
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
                    value={this.state.options[index]}
                    onChange={event => this.handleOptionChange(event, index)}
                  />
                  <span className="glyphicon glyphicon-remove-circle icon" aria-label="remove option" onClick={() => (this.removeOption(index))}></span>
                </div>
              ))
            }
          </div>

          <div className="centered">
            <button type="submit" action="" className="btn-add-option" onClick={this.addOption.bind(this)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add an option</button>
          </div>

          <div className="form-group">
            <div className="text-right">
              {
                //TODO: action to save data
              }
              <button type="submit" action="" className="btn btn-default" onClick={''}>Save</button>
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

export default NewPoll;
