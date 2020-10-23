/* eslint-disable no-loop-func */

import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { updateExam, callApiExam } from 'actions/examActions';
import { Redirect, withRouter } from 'react-router';
import AdminContent from 'components/body/layout/AdminContent';
import { getObjLevel, getObjSubject, subjects2 } from 'actions/common/getInfo';
import {
  changeHeader,
} from 'actions/examActions';
import {
  getQuestionList,
  callApiQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getDetailQuestion,
} from 'actions/questionActions';
import './style.scss';
import { Link } from 'react-router-dom';
const total = 100;
const MODE = ['Dễ', 'Trung bình', 'Khó'];

class QuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: {
        id: 0,
        question: null,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ['option1'],
      },
      filter: {
        mode: 'Dễ',
        grade: 'Lớp 10',
        subject: 'Toán Học',
      },
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const text = !id || Number(id) === 0 ? 'Thêm mới câu hỏi' : 'Chi tiết câu hỏi';
    this.props.changeHeader(text);
    if (id) {
      this.fetchData(id);
    }
  }

  fetchData = (id) => {
    this.props.getDetailQuestion(id).then(({ data, code, message }) => {
      if (data && code === 200) {
        const { id, question, type, option1, option2, option3, option4, mode, grade, subject, correctAnswer } = data.question;
        const correctAnswerOP = [];
        if (correctAnswer.includes(option1)) {
          correctAnswerOP.push('option1');
        }
        if (correctAnswer.includes(option2)) {
          correctAnswerOP.push('option2');
        }
        if (correctAnswer.includes(option3)) {
          correctAnswerOP.push('option3');
        }
        if (correctAnswer.includes(option4)) {
          correctAnswerOP.push('option4');
        }
        this.setState({
          currentQuestion: {
            id, question, option1, option2, option3, option4, correctAnswer: correctAnswerOP,
          },
          filter: {
            mode, grade: getObjLevel(grade).vn, subject: getObjSubject(subject).vn, type,
          },
        });
      }
      if (code === 400) {
      }
    })

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callingApiQ && this.props.callingApiQ === 'QuestionDetail') {
      nextProps.history.push('/admin/question-list');
    }
    //for update
    const { question } = this.props;
    // if (nextProps.question !== question) {
    //   const {
    //     id, question, option1, option2, option3, option4, correctAnswer,
    //     mode, grade, subject,
    //   } = nextProps.question;
    //   const correctAnswerOP = [];
    //   if (correctAnswer.includes(option1)) {
    //     correctAnswerOP.push('option1');
    //   }
    //   if (correctAnswer.includes(option2)) {
    //     correctAnswerOP.push('option2');
    //   }
    //   if (correctAnswer.includes(option3)) {
    //     correctAnswerOP.push('option3');
    //   }
    //   if (correctAnswer.includes(option4)) {
    //     correctAnswerOP.push('option4');
    //   }
    //   this.setState(state => ({
    //     currentQuestion: {
    //       id,
    //       question,
    //       option1,
    //       option2,
    //       option3,
    //       option4,
    //       correctAnswer: correctAnswerOP,
    //     },
    //     filter: {
    //       mode, grade, subject,
    //     },
    //   }))
    // }
  }

  onEditorChange = (evt) => {
    this.setState(state => ({
      currentQuestion: {
        ...state.currentQuestion,
        question: evt.editor.getData(),
      },
    }));
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState(state => ({
        currentQuestion: {
          ...state.currentQuestion,
          // [error]: 'Độ dài tối đa là 255 kí tự',
        },
      }));
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState(state => ({
        currentQuestion: {
          ...state.currentQuestion,
          [key]: val,
          // [error]: '',
        },
      }));
    }
  }

  save = (can) => {
    if (!can) return;
    const { currentQuestion, filter } = this.state;
    if (!currentQuestion || !currentQuestion.correctAnswer || currentQuestion.correctAnswer.length === 0
      || !currentQuestion.question || !currentQuestion.option1 || !currentQuestion.option2) return window.noti.error('Bạn chưa nhập đủ thông tin');
    const correctAnswer = currentQuestion.correctAnswer.map(item => currentQuestion[item]);
    const type = correctAnswer && correctAnswer.length > 1 ? 'multi' : 'one';
    const questionDTO = {
      ...currentQuestion,
      ...filter,
      correctAnswer,
      type,
    }
    console.log("save -> questionDTO", questionDTO);
    if (currentQuestion && currentQuestion.id) {
      this.props.updateQuestion(questionDTO, 'QuestionDetail');
      return;
    }
    this.props.createQuestion(questionDTO, 'QuestionDetail');
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

  choose = (correctAnswer) => {
    this.setState(state => {
      const oldCorrectAnswer = state.currentQuestion && state.currentQuestion.correctAnswer ? state.currentQuestion.correctAnswer : [];
      if (oldCorrectAnswer.includes(correctAnswer)) {
        return ({
          currentQuestion: {
            ...state.currentQuestion,
            correctAnswer: oldCorrectAnswer.filter(item => item !== correctAnswer),
          }
        });
      }
      return ({
        currentQuestion: {
          ...state.currentQuestion,
          correctAnswer: [...oldCorrectAnswer, correctAnswer],
        }
      });
    });
  }

  renderQuestion = () => {
    const { pointer, filter } = this.state;
    const currentQuestion = this.state.currentQuestion || {};
    const { match: { params: { id } } } = this.props;
    return (
      <div className="wrapper-question QuestionDetail">
        <h6 className="title-left">
          {`Câu hỏi`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            {
              currentQuestion.question !== null || Number(id) === 0 ? (
                <CKEditor
                  data={currentQuestion.question || ''}
                  onChange={e => this.onEditorChange(e)}
                  config={{
                    height: 136,
                    resize_maxHeight: 382,
                    resize_minHeight: 240,
                  }}
                />
              ) : null
            }
          </div>
          <div className="right  d-flex flex-column">
            {[1, 2, 3, 4].map(item => (
              <div className="row-option d-flex justify-content-between align-items-center">
                <div className="text">
                  {`Lựa chọn ${item}`}
                </div>
                <input type="text"
                  className=""
                  value={currentQuestion[`option${item}`] || ''}
                  onChange={(e) => this.onChangeMax255(`option${item}`, e.target.value, `errorOption${item}`)}
                />
                <input type="checkbox"
                  // name="radio-btn-exam"
                  checked={currentQuestion.correctAnswer.includes(`option${item}`)
                    || currentQuestion.correctAnswer.includes(currentQuestion[`option${item}`])}
                  onClick={() => this.choose(`option${item}`)}
                  title="Đánh dấu đáp án đúng"
                  onChange={() => { }}
                />
              </div>
            ))}
            <div className="row-option d-flex justify-content-between align-items-center">
              <div className="text">
                Loại câu hỏi
              </div>
              <div className="question-type d-flex align-items-center justify-content-between">
                <select value={getObjLevel(filter.grade).vn} onChange={(e) => this.onChangeFilter('grade', e.target.value, 'errorName')}>
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Đại học">Đại học</option>
                </select>

                <select value={getObjSubject(filter.subject).vn} onChange={(e) => this.onChangeFilter('subject', e.target.value, 'errorName')}>
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

                <select value={filter.mode} onChange={(e) => this.onChangeFilter('mode', e.target.value, 'errorName')}>
                  {MODE.map(item => ((
                    <option value={item}>{item}</option>
                  )))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { currentQuestion, pointer } = this.state;
    const { isShow, callingApi, role, isDone } = this.props;
    const canSave = true;
    if ((!role || !role.includes("ROLE_ADMIN")) && isDone) return <Redirect to='/' />
    return (
      <AdminContent>
        <div className="QuestionDetail">

          <div >
            {this.renderQuestion()}

            <div className="wrapper-btn d-flex justify-content-center align-items-center">
              <button className={`btn btn-outline-info`}>
                <Link to="/admin/question-list">
                  Hủy
                </Link>
              </button>
              <button className={`btn btn-info ${canSave ? '' : 'disable'}`} onClick={() => this.save(canSave)}>
                {`Lưu câu hỏi`}
              </button>
              {
                currentQuestion && currentQuestion.id ? (
                  <button className={`btn btn-outline-danger`} onClick={() => this.props.deleteQuestion([currentQuestion.id], 'QuestionDetail')}>
                    <Link to="/admin/question-list">
                      Xóa
                  </Link>
                  </button>
                ) : null
              }

            </div>
          </div>
        </div>
      </AdminContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { account, isDone },
    question: { question, callingApiQ, pagination },
  } = state;
  return {
    role: account.role,
    isDone,
    question: question || [],
    pagination: pagination || {},
    callingApiQ,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getQuestionList,
    callApiQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    changeHeader,
    getDetailQuestion,
  }
)(QuestionDetail));
