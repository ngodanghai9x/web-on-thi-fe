import React from 'react';
import { connect } from 'react-redux';
import './styles/Sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, style } = this.props;
    return (
      <React.Fragment>
        <div className="wrapper-sidebar">
          abc
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Sidebar);
