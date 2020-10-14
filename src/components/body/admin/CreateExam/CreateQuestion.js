
import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { createExam, callApiExam } from 'actions/examActions';
import { withRouter } from 'react-router';

// import './styles/CreateExam.scss';
const total = 100;
class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listQ: {
        Q0: {
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: 'option1',
          type: 'one',
          mode: 'Dễ'
        }
      },
      pointer: 0,
    };
  }

  componentDidMount() {
    const { exam1 } = this.props;
    if (exam1 && exam1.mode) {
      this.setState(state => {
        return ({
          listQ: {
            ...state.listQ,
            Q0: {
              ...state.lastQ.Q0,
              mode: exam1.mode,
            }
          },
        })
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.callingApi && this.props.callingApi === 'CreateQuestion') {
      nextProps.history.push('/admin');
    }
  }

  onEditorChange = (evt) => {
    this.setState(state => ({
      listQ: {
        ...state.listQ,
        [`Q${state.pointer}`]: {
          ...state.listQ[`Q${state.pointer}`],
          question: evt.editor.getData(),
        }
      }
    }));
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState(state => ({
        listQ: {
          ...state.listQ,
          [`Q${state.pointer}`]: {
            ...state.listQ[`Q${state.pointer}`],
            [error]: 'Độ dài tối đa là 255 kí tự',
          }
        }

      }));
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState(state => ({
        listQ: {
          ...state.listQ,
          [`Q${state.pointer}`]: {
            ...state.listQ[`Q${state.pointer}`],
            [key]: val,
          }
        }
      }));
    }
  }

  back = (can) => {
    console.log('can', can);
    if (!can) return this.props.changeStep(1);
    this.setState(state => ({
      pointer: state.pointer - 1,
    }));
  }

  next = (can) => {
    console.log('can', can);
    if (!can) return;
    this.setState(state => ({
      pointer: state.pointer + 1,
    }));
  }

  save = (can) => {
    if (!can) return;
    const { exam1, callingApi } = this.props;
    const { name, image, subject, grade, description, time, mode } = exam1;
    const { listQ } = this.state;
    const lastQ = listQ[`Q${Object.keys(listQ).length - 1}`];
    if (!lastQ.question || !lastQ.option1 || !lastQ.option2
      || !lastQ.question.trim() || !lastQ.option1.trim() || !lastQ.option2.trim()
    ) {
      return window.noti.error('Bạn chưa điền đủ thông tin cho câu hỏi cuối cùng');
    }
    this.props.callApiExam('CreateQuestion');
    const listQuestion = Object.values(listQ).map(item => ({
      ...item,
      correctAnswer: item[item.correctAnswer],
      grade,
      subject,
    }));
    console.log("save -> listQuestion", listQuestion);
    this.props.createExam(name, image, subject, grade, description, time, listQuestion);
  }

  add = (can) => {
    if (!can) return;
    const { exam1, callingApi } = this.props;
    const { subject, grade, mode, } = exam1;
    const length = Object.keys(this.state.listQ).length;
    this.setState(state => {
      return ({
        pointer: length,
        listQ: {
          ...state.listQ,
          [`Q${length}`]: {
            // number: length,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctAnswer: 'option1',
            type: 'one',
            // grade,
            // subject,
            // mode,
          }
        },
      })
    });
  }

  renderQuestion = () => {
    const { listQ, pointer } = this.state;
    return (
      <div className="wrapper-question">
        <h6 className="title-left">
          {`Câu ${pointer + 1} : ${listQ[`Q${pointer}`].mode}`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={listQ[`Q${pointer}`].question || ''}
              // data={''}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 128,
                resize_maxHeight: 374,
                resize_minHeight: 232,
              }}
            />
          </div>
          <div className="right  d-flex justify-content-between flex-column">
            {[1, 2, 3, 4].map(item => (
              <div className="row-option d-flex justify-content-between align-items-center">
                <div className="text">
                  {`Lựa chọn ${item}`}
                </div>
                <input type="text"
                  className=""
                  value={listQ[`Q${pointer}`][`option${item}`] || ''}
                  onChange={(e) => this.onChangeMax255(`option${item}`, e.target.value, `errorOption${item}`)}
                />
                <input type="radio" name="radio-btn-exam"
                  checked={`option${item}` === listQ[`Q${pointer}`].correctAnswer}
                  onClick={() => this.setState(state => ({
                    listQ: {
                      ...state.listQ,
                      [`Q${state.pointer}`]: {
                        ...state.listQ[`Q${state.pointer}`],
                        correctAnswer: `option${item}`,
                      }
                    },
                  }))}
                  title="Đánh dấu đáp án đúng"
                  onChange={() => { }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { listQ, pointer } = this.state;
    const { isShow, callingApi } = this.props;
    const canBack = callingApi !== 'CreateQuestion' && Object.keys(listQ).length > 1 && pointer > 0;
    const canNext = callingApi !== 'CreateQuestion' && pointer < Object.keys(listQ).length - 1;
    const canAdd = callingApi !== 'CreateQuestion' && Object.keys(listQ).length < total && pointer < total;
    const canSave = callingApi !== 'CreateQuestion' && Object.keys(listQ).length >= 1;

    if (!isShow) return null;

    return (
      <React.Fragment>
        <div className={`CreateQuestion ${!isShow ? 'd-none' : ''}`}>
          {this.renderQuestion()}

          <div className="wrapper-btn d-flex justify-content-between align-items-center">
            <span className="a" onClick={() => this.back(canBack)}>
              {`<< Back`}
            </span>
            <button className="btn btn-outline-info" onClick={() => this.save(canSave)}>
              {`Lưu`}
            </button>
            <button className="btn btn-info" onClick={() => this.add(canAdd)}>
              {`Thêm câu hỏi`}
            </button>
            <span className="a" onClick={() => this.next(canNext)}>
              {`Next >>`}
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth: { account }, exam: { callingApi } } = state;
  return {
    role: account.role,
    callingApi,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    createExam,
    callApiExam,
  }
)(CreateQuestion));