
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout } from 'actions/userActions';


import AdminContent from '../layout/AdminContent';
import './AdminHome.scss';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changeLayout(1);
  }

  render() {
    return (
      <AdminContent>
        <div className="admin-home">
          <div className="wrapper-search d-flex">
            <div className="w-75 d-flex">
              <button className="btn btn-outline-info mr-2">
                Xóa nhiều
              </button>
              <input className="w-75" type="search" placeholder="Tìm kiếm"/>
            </div>
            <div className="w-25 d-flex justify-content-end">
              <Link exact to='/admin/create-exam' >
                <button className="btn btn-info">Thêm mới đề</button>
              </Link>
            </div>
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th className="col col-checkbox">
                  <div className="wrapper-check-all d-flex p-1 justify-content-between align-items-center" title="Chọn tất cả">
                    <input type="checkbox" />
                    <CommonIcon.caretDownFill />
                  </div>
                </th>
                <th className="col col-id">Mã đề</th>
                <th className="col col-name">Tên đề</th>
                <th className="col col-subject">Môn học</th>
                <th className="col col-type">Thể loại</th>
                <th className="col col-amount">Số câu hỏi</th>
                <th className="col col-action">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col col-checkbox">
                  <div className="wrapper-icon checkbox">
                    <input type="checkbox"
                      className=""
                    />
                  </div>
                </td>
                <td className="col col-id">Mã đề</td>
                <td className="col col-name">Tên đề</td>
                <td className="col col-subject">Môn học</td>
                <td className="col col-type">Thể loại</td>
                <td className="col col-amount">Số câu hỏi</td>
                <td className="col col-action">
                  <div className="d-flex">
                    <div className="wrapper-icon" title="Chỉnh sửa">
                      <CommonIcon.edit />
                    </div>
                    <div className="wrapper-icon" title="Xóa bỏ">
                      <CommonIcon.remove />
                    </div>
                    <div className="toggle-icon" title="Ngưng kích hoạt">
                      <CommonIcon.toggleOn />
                    </div>
                    {/* <div className="toggle-icon" title="Kích hoạt">
                      <CommonIcon.toggleOff />
                    </div> */}
                  </div>
                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </AdminContent>


    );
  }
}

export default withRouter(connect(
  null,
  {
    changeLayout,
  }
  )(AdminHome)) ;
