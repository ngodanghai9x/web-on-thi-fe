import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout, logout } from 'actions/userActions';



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
    const { children, style, isOpen, location: { pathname } } = this.props;
    return (
      <React.Fragment>
        <div className="wrapper-sidebar" style={!isOpen ? { marginLeft: -240} : {}}>
          <nav id="sidebar">
            {/* <div className="custom-menu">
              <button type="button" id="sidebarCollapse" className="btn btn-primary">
                <i className="fa fa-bars"></i>
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div> */}
            <div className="div-logo d-flex justify-content-center">
              <img src="/images/logo.png" alt="logo" />
            </div>
            <ul className="list-unstyled components mb-5">
              <li className={``}  onClick={() => this.props.changeLayout(0)}>
                <Link  to='/' >
                  <span className="fa fa-home mr-3"></span> Trang chủ
                </Link>
              </li>
              <li className={`${pathname === '/admin' ? 'active' : ''}`} >
                <Link  to='/admin' >
                  <span className="fa fa-table mr-3"></span> Danh sách đề
                </Link>
              </li>
              <li className={`${pathname === '/admin/create-exam' ? 'active' : ''}`} >
                <Link  to='/admin/create-exam' >
                  <span className="fa fa-sticky-note mr-3"></span> Thêm mới đề
                </Link>
              </li>
              <li className={`${pathname === '/admin/question-list' ? 'active' : ''}`} >
                <Link  to='/admin' >
                  <span className="fa fa-table mr-3"></span> Danh sách câu hỏi
                </Link>
              </li>
              <li className={`${pathname === '/admin/question-detail/0' ? 'active' : ''}`} >
                <Link  to='/admin/create-exam' >
                  <span className="fa fa-sticky-note mr-3"></span> Thêm mới câu hỏi
                </Link>
              </li>
              <li className={``}  onClick={() => this.props.changeLayout(0)}>
                <Link  to='/thong-tin-ca-nhan'>
                  <span className="fa fa-user mr-3"></span> Tài khoản
                </Link>
              </li>
              <li className={``} onClick={() => this.props.logout()}>
                <Link  to='' >
                  <span className="fa fa-sign-out-alt mr-3"></span> Đăng xuất
                </Link>
              </li>
            </ul>

          </nav>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { isOpen } } = state;
  return {
    isOpen,
  };
};
export default withRouter(connect(
  mapStateToProps,
  {
    changeLayout,
    logout,
  }
  )(Sidebar)) ;
