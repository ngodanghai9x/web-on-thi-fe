import React from 'react';
import { connect } from 'react-redux';
import './styles/Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    // Viet function xu ly button Toggle Menu
  }

  render() {
    const { children, style } = this.props;
    return (
      <React.Fragment>
        <div className="wrapper-sidebar">
        <nav id="sidebar">
				<div className="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	          <i class="fa fa-bars"></i>
	          <span className="sr-only">Toggle Menu</span>
	        </button>
        </div>
	  		<h1><a href="index.html" className="logo">Project Name</a></h1>
        <ul className="list-unstyled components mb-5">
          <li className="active">
            <a href="#"><span className="fa fa-home mr-3"></span> Homepage</a>
          </li>
          <li>
              <a href="#"><span className="fa fa-user mr-3"></span> Dashboard</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-sticky-note mr-3"></span> Friends</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-sticky-note mr-3"></span> Subcription</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-paper-plane mr-3"></span> Settings</a>
          </li>
          <li>
            <a href="#"><span className="fa fa-paper-plane mr-3"></span> Information</a>
          </li>
        </ul>

    	</nav>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};
export default connect(mapStateToProps)(Sidebar);
