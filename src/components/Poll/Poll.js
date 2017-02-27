import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


//TODO: if accessing directly from url store is not initialized, should check if store is empty and perform get polls or could be done in layout
export class Poll extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedOption: 0
    }

    this.getPollData = this.getPollData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
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
    //TODO: form submit vote action
  }

  render(){
    console.log(this.getPollData(this.props.params.id));
    return(
      <div>
        <form onSubmit={this.formSubmit}>
        {
          this.getPollData(this.props.params.id)[0].options.map((option, index) => (
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    //TODO: voting actions
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
