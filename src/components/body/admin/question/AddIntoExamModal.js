import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import { getAllExam } from 'actions/examActions';
import {
  getQuestionList,
  callApiQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  addQuestionsIntoExam,
} from 'actions/questionActions';
import { Modal, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

const SIZE = 15;
class AddIntoExamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      isOpenSearch: true,
      currentExam: {},
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentWillUnmount() {
    this.resetState();
  }

  resetState = e => {
    this.setState({
      inputSearch: '',
      isOpenSearch: true,
      currentExam: {},
    })
  }

  reload = () => {
    const { filterQuestion } = this.props;
    let { inputSearch } = this.state;
    this.props.getAllExam(inputSearch, 1, SIZE, filterQuestion);
    this.setState({ isTyping: false })
    // if (inputSearch === '' || inputSearch == null) this.apiGetPage(activePage, SIZE);
    // else this.apiSearchPage(activePage, SIZE, inputSearch);
  }

  save = () => {
    const { questionIds } = this.props;
    const { currentExam } = this.state;
    if (!currentExam || !currentExam.id || !questionIds || questionIds.length === 0) return window.noti.error('Bạn chưa chọn đề hoặc chọn câu hỏi');
    this.props.addQuestionsIntoExam(currentExam.id, questionIds);
    this.props.toggleModal(true);
  }

  selectExam = currentExam => {
    this.setState({ currentExam, isOpenSearch: false });
  }

  renderExamItem = (exams) => {
    if (!exams) return null;
    return exams.map(item => {
      return (
        <div className="exam-item d-flex align-items-center">
          <div className="code text-ellipsis">
            <Link to={`/admin/update-exam/${item.id}`} >
              {item.code}
            </Link>
          </div>
          <div className="name text-ellipsis" onClick={e => this.selectExam(item)}>
            {item.name}
          </div>
        </div>
      );
    })
  }

  render() {
    const { inputSearch, isOpenSearch, currentExam } = this.state;
    const { layout, isOpenModal, toggleModal, all, questionIds } = this.props;
    // const all = [{ id: 1, code: 'made001', name: 'abcasfsafsagasgsagsagsagas' }];
    return (
      <Modal className="AddIntoExamModal" show={isOpenModal} onHide={() => toggleModal(true)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn đề bạn muốn thêm câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-bd-content">
            <input className="w-100" type="search" placeholder="Tìm kiếm"
              value={inputSearch} onChange={(e) => this.setState({ inputSearch: e.target.value })}
              onFocus={e => this.setState({ isOpenSearch: true })}
              onBlur={e => this.reload()}
            />
            {
              isOpenSearch
                ? (
                  <div className="exams-suggest list-overflow-auto">
                    {this.renderExamItem(all)}
                  </div>
                )
                : (
                  <div className="exams-suggest border-0">
                    <div className="current-exam">
                      <div className="profile-row">
                        <div className="key">
                          Mã đề
                        </div>
                        <div className="value text-ellipsis">
                          {currentExam.code}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="key">
                          Tên đề
                        </div>
                        <div className="value text-ellipsis">
                        {currentExam.name}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="key">
                          Mô tả
                        </div>
                        <div className="value text-ellipsis-line-clamp-4">
                        {currentExam.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            }

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleModal(true)}>
            Hủy
            </Button>
          <Button variant="info" onClick={() => this.save()}>
            Lưu
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { account, isDone },
    question: { question, callingApiQ, pagination },
    exam,
  } = state;
  return {
    role: account.role,
    isDone,
    question: question || [],
    pagination: pagination || {},
    callingApiQ,
    paginationE: exam.pagination,
    all: exam.all,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getQuestionList,
    addQuestionsIntoExam,
    getAllExam,
  }
)(AddIntoExamModal));