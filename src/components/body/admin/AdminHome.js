
import React, { Component } from 'react';
import AdminContent from '../layout/AdminContent';
import './AdminHome.scss';

class AdminHome extends Component {
  constructor(props) {
    super(props);
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
              <input className="w-75" type="search" />
            </div>
            <div className="w-25 d-flex justify-content-end">
              <button className="btn btn-info">Thêm mới đề</button>
            </div>
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col col-checkbox">
                  <div className="wrapper-check-all d-flex p-1 justify-content-between align-items-center">
                    <input type="checkbox" />
                    <div>?</div>
                  </div>
                </th>
                <th scope="col col-id">Mã đề</th>
                <th scope="col col-name">Tên đề</th>
                <th scope="col col-subject">Môn học</th>
                <th scope="col col-type">Thể loại</th>
                <th scope="col col-amount">Số câu hỏi</th>
                <th scope="col col-time">Thời gian làm</th>
                <th scope="col col-action">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox"
                    className=""
                  />
                </td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox"
                    className=""
                  />
                </td>
                <td colspan="2">Larry the Bird</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminContent>


    );
  }
}


export default AdminHome;