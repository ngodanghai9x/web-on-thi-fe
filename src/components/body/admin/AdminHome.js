/* eslint-disable no-restricted-globals */

import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as CommonIcon from 'components/icons/common';
import { getAvatar, changeLayout } from 'actions/userActions';
import {
  getAllExam,
  changeHeader,
  changeActiveExam,
  deleteExam,
  getDetailExam,
  changeActivePage,
} from 'actions/examActions';

import AdminContent from '../layout/AdminContent';
import './AdminHome.scss';
import Pagination from 'react-js-pagination';
import { getObjLevel, getObjSubject } from 'actions/common/getInfo';

const SIZE = 10;
class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      inputSearch: '',
      selectedExamIds: [],
    };
  }

  componentDidMount() {
    this.props.changeHeader('Danh sách đề');
    this.props.changeLayout(1);
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    if (nextProps.pagination && nextProps.pagination !== pagination) {
      this.setState({
        activePage: pagination.activePage,
      })
    }
  }

  reload = () => {
    let { activePage, inputSearch } = this.state;
    this.props.getAllExam(inputSearch, activePage, SIZE);
    // if (inputSearch === '' || inputSearch == null) this.apiGetPage(activePage, SIZE);
    // else this.apiSearchPage(activePage, SIZE, inputSearch);
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.props.changeActivePage(pageNumber);
      this.reload()
    });
  }

  seeDetailExam = (e, id) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push(`/admin/update-exam/${id}`);
  }

  deleteExam = (e, id, canDelete) => {
    if (!canDelete) return;
    e.stopPropagation();
    if (confirm('Thao tác này không thể khôi phục, bạn có chắc chắn xóa ?')) {
      this.props.deleteExam([id]);
    }
  }

  deleteExamList = (e) => {
    e.stopPropagation();
    const { all } = this.props;
    const { selectedExamIds } = this.state;
    if (!selectedExamIds || selectedExamIds.length === 0) return;
    const notDelete = all.find(item => selectedExamIds.includes(item.id) && !item.canDelete);
    if (notDelete) {
      return window.noti.error('Không thể xóa đề đã kích hoạt và đã có người làm');
    }
    if (confirm('Thao tác này không thể khôi phục, bạn có chắc chắn xóa ?')) {
      this.props.deleteExam(selectedExamIds);
    }
  }

  changeActiveExam = (e, id, isActive) => {
    if (!isActive) {
      if (confirm('Kích hoạt đề để mọi người có thể làm đề, nhưng sẽ không thể xóa đề được nữa kể cả có tắt kích hoạt, bạn có chắc chắn kích hoạt ?')) {
        this.props.changeActiveExam(id, isActive);
      }
    }
    else {
      this.props.changeActiveExam(id, isActive);
    }
    e.stopPropagation();
  }

  selectAll = () => {
    let { selectedExamIds } = this.state;
    if (selectedExamIds.length === this.props.all.length) {
      selectedExamIds = [];
      this.setState({ selectedExamIds });
    } else {
      selectedExamIds = [];
      for (let index = 0; index < this.props.all.length; index++) {
        selectedExamIds.push(this.props.all[index].id);
      }
      this.setState({ selectedExamIds });
    }
  };

  isChoose = (id) => {
    const { selectedExamIds } = this.state;
    let exist = false;
    if (selectedExamIds.length !== 0) {
      for (let index = 0; index < selectedExamIds.length; index++) {
        if (selectedExamIds[index] === id) {
          exist = true;
          break;
        }
      }
    }
    return exist;
  };

  selectOne = (e, id) => {
    e.stopPropagation();
    const { selectedExamIds } = this.state;
    let exist = false;
    if (selectedExamIds.length !== 0) {
      for (let index = 0; index < selectedExamIds.length; index++) {
        if (selectedExamIds[index] === id) {
          exist = true;
          selectedExamIds.splice(index, 1);
          break;
        }
      }
    }
    if (!exist) {
      selectedExamIds.push(id);
    }
    this.setState({ selectedExamIds });
  };


  renderBody = (all) => {
    // id, name, image, subject, grade, description, time, canDelete, examQuestions
    return all.map(item => {
      return (
        <tr onClick={(e) => this.seeDetailExam(e, item.id)} key={'admin-home' + item.id}>
          <td className="col col-checkbox">
            <div className="wrapper-icon checkbox" onClick={(e) => this.selectOne(e, item.id)}>
              <input type="checkbox"
                className=""
                checked={this.isChoose(item.id)}
                readOnly
              />
            </div>
          </td>
          <td className="col col-code">
            <div className="text-ellipsis-line-clamp-2">
              {item.code}
            </div>
          </td>
          <td className="col col-name">
            <div className="text-ellipsis-line-clamp-2">
              {item.name}
            </div>
          </td>
          <td className="col col-subject">{getObjSubject(item.subject).vn}</td>
          <td className="col col-grade">{getObjLevel(item.grade).vn}</td>
          <td className="col col-time">{`${item.time} phút`}</td>
          <td className="col col-action">
            <div className="d-flex">
              <div className="wrapper-icon" title="Chỉnh sửa" onClick={(e) => this.seeDetailExam(e, item.id)}>
                <CommonIcon.edit />
              </div>
              {
                item.canDelete ? (
                  <div
                    className={`wrapper-icon ${item.canDelete ? '' : 'disable'}`} title={`${item.canDelete ? 'Xóa' : 'Không thẻ xóa đề đã có người làm'}`}
                    onClick={(e) => this.deleteExam(e, item.id, item.canDelete)}
                  >
                    <CommonIcon.remove />
                  </div>
                ) : null
              }
              {
                item.isActive ? (
                  <div className="toggle-icon" title="Ngưng kích hoạt" onClick={(e) => this.changeActiveExam(e, item.id, item.isActive)}>
                    <CommonIcon.toggleOn />
                  </div>
                ) : (
                    <div className="toggle-icon" title="Kích hoạt" 
                    onClick={(e) => {
                      if (item.examQuestions && item.examQuestions.length > 0) this.changeActiveExam(e, item.id, item.isActive)
                      else {
                        e.stopPropagation();
                        window.noti.error('Đề này chưa có câu hỏi');
                      }
                    }}
                    >
                      <CommonIcon.toggleOff />
                    </div>
                  )
              }
            </div>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { activePage, inputSearch, selectedExamIds } = this.state;
    const { role, all, pagination, isDone } = this.props;
    const isChooseAll = selectedExamIds.length === all.length && all.length !== 0;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="admin-home">
          <div className="wrapper-search d-flex">
            <div className="w-75 d-flex">
              <button className="btn btn-outline-info mr-2" onClick={(e) => this.deleteExamList(e)}>
                Xóa nhiều
              </button>
              <input className="w-75" type="search" placeholder="Tìm kiếm"
                value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
                onBlur={e => this.reload()}
              />
            </div>
            <div className="w-25 d-flex justify-content-end">
              <Link to='/admin/create-exam' >
                <button className="btn btn-info">Thêm mới đề</button>
              </Link>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col col-checkbox">
                  <div
                    className="wrapper-check-all d-flex p-1 justify-content-between align-items-center"
                    title="Chọn tất cả"
                    onClick={() => this.selectAll()}
                  >
                    <input type="checkbox"
                      checked={isChooseAll}
                      readOnly
                    />
                    <CommonIcon.caretDownFill />
                  </div>
                </th>
                <th className="col col-code">Mã đề</th>
                <th className="col col-name">Tên đề</th>
                <th className="col col-subject">Môn học</th>
                <th className="col col-grade">Cấp bậc</th>
                <th className="col col-time">Thời gian</th>
                <th className="col col-action">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBody(all)}
            </tbody>
          </table>

          <div className='pagination d-flex justify-content-center'>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={SIZE}
              totalItemsCount={pagination.totalElements}
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

const mapStateToProps = (state, ownProps) => {
  const { auth: { account, isDone }, exam: { all, callingApi, pagination } } = state;
  return {
    role: account.role,
    isDone,
    all: all || [],
    pagination: pagination || {},
    callingApi,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    changeLayout,
    getAllExam,
    changeHeader,
    changeActiveExam,
    deleteExam,
    getDetailExam,
    changeActivePage,
  }
)(AdminHome));
