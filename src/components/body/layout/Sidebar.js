import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout } from 'actions/userActions';



import './styles/Sidebar.scss';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Viet function xu ly button Toggle Menu
  }

  render() {
    const { children, style, location: { pathname } } = this.props;
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
              <li className={``}  onClick={() => this.props.changeLayout(0)}>
                <Link exact to='/' >
                  <span className="fa fa-home mr-3"></span> Trang chủ
                </Link>
              </li>
              <li className={`${pathname === '/admin' ? 'active' : ''}`} >
                <Link exact to='/admin' >
                  <span className="fa fa-user mr-3"></span> Danh sách đề
                </Link>
              </li>
              <li className={`${pathname === '/admin/create-exam' ? 'active' : ''}`} >
                <Link exact to='/admin/create-exam' >
                  <span className="fa fa-sticky-note mr-3"></span> Thêm mới đề
                </Link>
              </li>
              <li className={``}  onClick={() => this.props.changeLayout(0)}>
                <Link exact to='/thong-tin-ca-nhan'>
                  <span className="fa fa-sticky-note mr-3"></span> Tài khoản
                </Link>
              </li>
              <li className={``} >
                <Link exact to='' >
                  <span className="fa fa-paper-plane mr-3"></span> Đăng xuất
                </Link>
              </li>
            </ul>

          </nav>
        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {

// };
export default withRouter(connect(
  null,
  {
    changeLayout,
  }
  )(Sidebar)) ;
