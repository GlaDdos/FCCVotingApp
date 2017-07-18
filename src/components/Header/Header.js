import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
//TODO https://www.hawatel.com/blog/handle-window-resize-in-react < 768px

class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      mobile: false,
      showMenu: true
    };

    this.widthDetection = this.widthDetection.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({showMenu: !this.state.showMenu});
  }

  widthDetection(){
    if(window.innerWidth < 768 && !this.state.mobile){
      this.setState({mobile: true, showMenu: false});
    } else if(window.innerWidth > 768 && this.state.mobile){
      this.setState({mobile: false, showMenu: true});
    }
  }

  componentWillMount(){
    if(window.innerWidth < 768){
      this.setState({mobile: true, showMenu: false});
    } else if(window.innerWidth > 768){
      this.setState({mobile: false, showMenu: true});
    }

    window.addEventListener('resize', this.widthDetection);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.widthDetection);
  }

  render(){
    const authenticated = this.props.isAuthenticated;
    const displayButton = this.state.mobile ? 'block' : 'none';
    const displayMenu = this.state.showMenu ? 'block' : 'none';
  
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/"><span className="navbar-brand">FCCVoting</span></Link>
            <button className="btn btn-link-2 pull-right" style={{display: displayButton}} onClick={() => this.toggleMenu()}><span className=" fa fa-bars" aria-hidden="true"></span></button>
          </div>
              {
                authenticated ? (
                  <ul className="nav navbar-nav navbar-right" style={{display: displayMenu}}>
                    <li><Link to="/">{`Hello, ${this.props.firstName}!`}</Link></li>
                    <li><Link to="/newpoll">New Poll</Link></li>
                    <li><Link to='/user/polls'>My polls</Link></li>
                    <li><a href='#' onClick={this.props.logout}>Log out</a></li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right" style={{display: displayMenu}}>
                    <li><Link to="/signin">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                  </ul>
                )
              }
          </div>
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstName: state.auth.firstName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);