
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout } from 'actions/userActions';
import { changeHeader, getAllExam } from 'actions/examActions';

import AdminContent from '../layout/AdminContent';
import './AdminHome.scss';
import Pagination from 'react-js-pagination';

const SIZE = 10;
class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      inputSearch: '',
      count: 15, //tổng trong db
    };
  }

  componentDidMount() {
    this.props.changeHeader('Danh sách đề');
    this.props.changeLayout(1);
    this.props.getAllExam()
  }

  reload = () => {
    let { activePage, inputSearch } = this.state;
    // if (inputSearch === '' || inputSearch == null) this.apiGetPage(activePage, SIZE);
    // else this.apiSearchPage(activePage, SIZE, inputSearch);
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber }, () => this.reload());
  }

  render() {
    const { activePage, inputSearch } = this.state;
    return (
      <AdminContent>
        <div className="admin-home">
          <div className="wrapper-search d-flex">
            <div className="w-75 d-flex">
              <button className="btn btn-outline-info mr-2">
                Xóa nhiều
              </button>
              <input className="w-75" type="search" placeholder="Tìm kiếm"
                value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
              />
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
                    {
                      true ? (
                        <div className="toggle-icon" title="Ngưng kích hoạt">
                          <CommonIcon.toggleOn />
                        </div>
                      ) : (
                          <div className="toggle-icon" title="Kích hoạt">
                            <CommonIcon.toggleOff />
                          </div>
                        )
                    }
                  </div>
                </td>
              </tr>


            </tbody>
          </table>

          <div className='pagination d-flex justify-content-center'>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={SIZE}
              totalItemsCount={this.state.count}
              pageRangeDisplayed={5}  // số nút hiển thị
              onChange={this.handlePageChange}
              itemClass={"page-item"}
              linkClass={"page-link"}
            />
          </div>
        </div>
      </AdminContent>


    );
  }
}

export default withRouter(connect(
  null,
  {
    changeLayout,
    getAllExam,
    changeHeader,
  }
)(AdminHome));
