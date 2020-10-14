/* eslint-disable no-restricted-globals */

import React from 'react';
// class Welcome extends React.Component {
//   render() {
//     return (
//       <header>
//         <div className="commentBox">
//           Hello, world! I am a {this.props.name}.
//         </div>
//       </header>
//     );
//   }
// }

// function Welcome2(props) {
//   return (
//     <header>
//       <div className="commentBox">
//         Hello, world! I am a {props.name}.
//       </div>
//     </header>
//   );
// }

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

import AdminContent from 'components/body/layout/AdminContent';
import './style.scss';
import Pagination from 'react-js-pagination';
import { getObjLevel, getObjSubject, subjects2 } from 'actions/common/getInfo';
import AddIntoExamModal from './AddIntoExamModal';
import { Modal, Button } from 'react-bootstrap';


const SIZE = 10;
const MODE = ['Dễ', 'Trung bình', 'Khó'];
class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      inputSearch: '',
      selectedExamIds: [],
      isOpenModal: false,
      filter: {
        mode: 'Dễ',
        grade: 'Lớp 10',
        subject: 'Toán',
      }
    };
  }

  componentDidMount() {
    this.props.changeHeader('Danh sách câu hỏi');
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

  toggleModal = (isClose) => {
    if (isClose) {
      this.setState({ isOpenModal: false });
      return;
    }
    this.setState(state => ({ isOpenModal: !state.isOpenModal }))
  }

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
          <td className="col col-name">{item.name}</td>
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
                    <div className="toggle-icon" title="Kích hoạt" onClick={(e) => this.changeActiveExam(e, item.id, item.isActive)}>
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

  onChangeFilter = (key, val, error) => {
    if (key === 'grade') {
      return this.setState(state => ({
        filter: {
          ...state.filter,
          grade: val,
          subject: 'Toán Học',
        }
      }))
    }
    this.setState(state => ({
      filter: {
        ...state.filter,
        [key]: val,
      }
    }))
  }

  render() {
    const { activePage, inputSearch, selectedExamIds, isOpenModal, filter } = this.state;
    const { role, all, pagination, isDone } = this.props;
    const isChooseAll = selectedExamIds.length === all.length;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="QuestionList question-list d-flex">
          <div className="ql-left-body">
            <div className="wrapper-btn">
              <button className="btn btn-info">
                <Link to='/admin/create-question' >
                  Thêm câu hỏi
                </Link>
              </button>
              <button className="btn btn-outline-info mr-2" onClick={() => this.toggleModal()}>
                Thêm vào đề
              </button>
              <button className="btn btn-outline-info mr-2" onClick={(e) => this.deleteExamList(e)}>
                Xóa nhiều
              </button>
            </div>
          </div>

          <div className="ql-right-body">
            <div className="wrapper-search-filter">
              <div className="filter d-flex align-items-center">
                <input style={{ width: 'calc(100% - 500px)' }} type="search" placeholder="Tìm kiếm"
                  value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
                  onBlur={e => this.reload()}
                />

                <select defaultValue={filter.grade} onChange={(e) => this.onChangeFilter('grade', e.target.value, 'errorName')}>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Đại học">Đại học</option>
                </select>

                <select value={filter.subject} onChange={(e) => this.onChangeFilter('subject', e.target.value, 'errorName')}>
                  {subjects2.map((item, i) => {
                    if (filter.grade === 'Lớp 10') {
                      if (i < 3) {
                        return (
                          <option value={item.vn}>{item.vn}</option>
                        );
                      }
                      return null;
                    } else {
                      return (
                        <option value={item.vn}>{item.vn}</option>
                      );
                    }
                  }
                  )}
                </select>

                <select defaultValue={filter.mode} onChange={(e) => this.onChangeFilter('mode', e.target.value, 'errorName')}>
                  {MODE.map(item => ((
                    <option value={item}>{item}</option>
                  )))}
                </select>

                <button className="btn btn-info">
                  Tìm kiếm
                </button>
              </div>

              {/* <div className="search">
                <input style={{ width: 'calc(100% - 240px)' }} type="search" placeholder="Tìm kiếm"
                  value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
                  onBlur={e => this.reload()}
                />
              </div> */}

            </div>

            <div className="table">
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
            </div>

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


        </div>
        <AddIntoExamModal isOpenModal={isOpenModal} toggleModal={this.toggleModal} filterQuestion={filter} />
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
)(QuestionList));
