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
          làm thanh đen ở đây
          đừng có tự xóa cái gì, viết thêm từ chỗ này thôi
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Sidebar);
