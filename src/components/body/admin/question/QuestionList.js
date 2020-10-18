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
import { changeLayout } from 'actions/userActions';
import {
  getQuestionList,
  callApiQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from 'actions/questionActions';
import { changeHeader } from 'actions/examActions';
import AdminContent from 'components/body/layout/AdminContent';
import './style.scss';
import Pagination from 'react-js-pagination';
import { getObjLevel, getObjSubject, subjects2 } from 'actions/common/getInfo';
import AddIntoExamModal from './AddIntoExamModal';
import { Modal, Button } from 'react-bootstrap';


const SIZE = 20;
const MODE = ['Dễ', 'Trung bình', 'Khó'];
class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // activePage: 1,
      inputSearch: '',
      selectedQuestionIds: [],
      isOpenModal: false,
      filter: {
        mode: '',
        grade: '',
        subject: '',
        type: '',
      },
      // filter: {
      //   mode: 'Dễ',
      //   grade: 'Lớp 10',
      //   subject: 'Toán',
      // },
    };
  }

  componentDidMount() {
    this.props.changeHeader('Danh sách câu hỏi');
    this.props.changeLayout(1);
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    // const { pagination } = this.props;
    // if (nextProps.pagination && nextProps.pagination !== pagination) {
    //   this.setState({
    //     activePage: pagination.activePage,
    //   })
    // }
  }

  reload = () => {
    let { activePage, inputSearch, filter } = this.state;
    const { pagination } = this.props;
    this.props.getQuestionList(inputSearch, filter, pagination.activePage, SIZE);
    // if (inputSearch === '' || inputSearch == null) this.apiGetPage(activePage, SIZE);
    // else this.apiSearchPage(activePage, SIZE, inputSearch);
  }

  handlePageChange = (pageNumber) => {
    this.reload();
    // this.setState({ activePage: pageNumber }, () => {
    //   // this.props.changeActivePage(pageNumber);
    //   this.reload();
    // });
  }

  seeDetailQuestion = (e, id) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push(`/admin/question-detail/${id}`)
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
    const { questions } = this.props;
    const { selectedQuestionIds } = this.state;
    if (!selectedQuestionIds || selectedQuestionIds.length === 0) return;
    // const notDelete = questions.find(item => selectedQuestionIds.includes(item.id) && !item.canDelete);
    // if (notDelete) {
    //   return window.noti.error('Không thể xóa đề đã kích hoạt và đã có người làm');
    // }
    if (confirm('Thao tác này không thể khôi phục, bạn có chắc chắn xóa ?')) {
      this.props.deleteQuestion(selectedQuestionIds);
    }
  }

  changeActiveExam = (e, id, isActive) => {
    // if (!isActive) {
    //   if (confirm('Kích hoạt đề để mọi người có thể làm đề, nhưng sẽ không thể xóa đề được nữa kể cả có tắt kích hoạt, bạn có chắc chắn kích hoạt ?')) {
    //     this.props.changeActiveExam(id, isActive);
    //   }
    // }
    // else {
    //   this.props.changeActiveExam(id, isActive);
    // }
    // e.stopPropagation();
  }

  selectAll = () => {
    let { selectedQuestionIds } = this.state;
    if (selectedQuestionIds.length === this.props.questions.length) {
      selectedQuestionIds = [];
      this.setState({ selectedQuestionIds });
    } else {
      selectedQuestionIds = [];
      for (let index = 0; index < this.props.questions.length; index++) {
        selectedQuestionIds.push(this.props.questions[index].id);
      }
      this.setState({ selectedQuestionIds });
    }
  };

  isChoose = (id) => {
    const { selectedQuestionIds } = this.state;
    let exist = false;
    if (selectedQuestionIds.length !== 0) {
      for (let index = 0; index < selectedQuestionIds.length; index++) {
        if (selectedQuestionIds[index] === id) {
          exist = true;
          break;
        }
      }
    }
    return exist;
  };

  selectOne = (e, id) => {
    e.stopPropagation();
    const { selectedQuestionIds } = this.state;
    let exist = false;
    if (selectedQuestionIds.length !== 0) {
      for (let index = 0; index < selectedQuestionIds.length; index++) {
        if (selectedQuestionIds[index] === id) {
          exist = true;
          selectedQuestionIds.splice(index, 1);
          break;
        }
      }
    }
    if (!exist) {
      selectedQuestionIds.push(id);
    }
    this.setState({ selectedQuestionIds });
  };

  toggleModal = (isClose) => {
    if (isClose) {
      this.setState({ isOpenModal: false });
      return;
    }
    this.setState(state => ({ isOpenModal: !state.isOpenModal }))
  }

  getType = (type) => {
    switch (type) {
      case 'one':
        return 'Một đáp án';
      case 'multi':
        return 'Nhiều đáp án';
      default:
        return '';
    }
  }

  renderBody = (questions) => {
    // id, name, image, subject, grade, description, time, canDelete, examQuestions
    return questions.map(item => {
      return (
        <tr onClick={(e) => this.seeDetailQuestion(e, item.id)} key={'questions-home' + item.id}>
          <td className="col col-checkbox">
            <div className="wrapper-icon checkbox" onClick={(e) => this.selectOne(e, item.id)}>
              <input type="checkbox"
                className=""
                checked={this.isChoose(item.id)}
                readOnly
              />
            </div>
          </td>
          <td className="col col-name">
            <div className="wrapper-name" dangerouslySetInnerHTML={{ __html: item.question }} />
          </td>
          <td className="col col-grade">{getObjLevel(item.grade).vn}</td>
          <td className="col col-subject">{getObjSubject(item.subject).vn}</td>
          <td className="col col-mode">{item.mode}</td>
          <td className="col col-type">
            {this.getType(item.type)}
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
    const { activePage, inputSearch, selectedQuestionIds, isOpenModal, filter } = this.state;
    const { role, questions, pagination, isDone } = this.props;
    const isChooseAll = selectedQuestionIds.length === questions.length && questions.length !== 0;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="QuestionList question-list d-flex">
          <div className="ql-left-body">
            <div className="wrapper-btn">
              <button className="btn btn-info">
                <Link to='/admin/question-detail/0' >
                  Thêm câu hỏi
                </Link>
              </button>
              <button className="btn btn-outline-info mr-2" onClick={() => selectedQuestionIds.length > 0 && this.toggleModal()}>
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
                <input style={{ width: 'calc(100% - 525px)' }} type="search" placeholder="Tìm kiếm"
                  value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
                  onBlur={e => this.reload()}
                />

                <select defaultValue={filter.grade} onChange={(e) => this.onChangeFilter('grade', e.target.value, 'errorName')}>
                  <option value="">Chọn cấp</option>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Đại học">Đại học</option>
                </select>

                <select value={filter.subject} onChange={(e) => this.onChangeFilter('subject', e.target.value, 'errorName')}>
                  <option value="">Chọn môn</option>
                  {subjects2.filter(sub => sub.en !== 'van').map((item, i) => {
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
                  <option value="">Chọn độ khó</option>
                  {MODE.map(item => ((
                    <option value={item}>{item}</option>
                  )))}
                </select>

                <button className="btn btn-info" onClick={e => this.reload()}>
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
                    <th className="col col-name">Câu hỏi</th>
                    <th className="col col-subject">Môn học</th>
                    <th className="col col-grade">Cấp bậc</th>
                    <th className="col col-mode">Độ khó</th>
                    <th className="col col-type">Thể loại</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderBody(questions)}
                </tbody>
              </table>
            </div>

            <div className='pagination d-flex justify-content-center'>
              <Pagination
                activePage={pagination.activePage}
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
        <AddIntoExamModal isOpenModal={isOpenModal} toggleModal={this.toggleModal} filterQuestion={filter} questionIds={selectedQuestionIds} />
      </AdminContent>


    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { account, isDone },
    question: { questions, callingApiQ, pagination },
  } = state;
  return {
    role: account.role,
    isDone,
    questions: questions || [],
    // questions: [{ id:1 }, { id:2 }, { id:3 }],
    pagination: pagination || {},
    callingApiQ,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getQuestionList,
    changeHeader,
    changeLayout,
    deleteQuestion,
  }
)(QuestionList));
