import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../actions/auth';
import  Loader from './Loader';

class Authtest extends React.Component {

  componentDidMount(){
    this.props.getToken();
  }

  render(){
    const { isAuthenticating } = this.props;

    return(
        <div>
          {
            isAuthenticating && <Loader loading={ isAuthenticating } />
          }
        </div>
        
    )
  }
}

function mapStateToProps(state){
  return {
    isAuthenticating: state.auth.isAuthenticating
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => dispatch(getToken())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authtest);