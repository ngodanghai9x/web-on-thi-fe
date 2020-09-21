
import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { createExam } from 'actions/examActions';

// import './styles/CreateExam.scss';
const total = 100;
class UpdateQuestion extends React.Component {
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
        }
      },
      pointer: 0,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    //for update
    const { listQuestion } = this.props;
    if (nextProps.listQuestion !== listQuestion) {
      // { id, image, question, option1, suggestion, correctAnswer}
      const listQ = nextProps.listQuestion.map((item, i) => {
        if (item.correctAnswer === item.option1) {
          item.correctAnswer = 'option1';
        }
        if (item.correctAnswer === item.option2) {
          item.correctAnswer = 'option2';
        }
        if (item.correctAnswer === item.option3) {
          item.correctAnswer = 'option3';
        }
        if (item.correctAnswer === item.option4) {
          item.correctAnswer = 'option4';
        }
        return ({
          [`Q${i}`]: { ...item }
        });
      })
      this.setState({ listQ });
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
    const { name, image, subject, level, description, time } = this.props.exam1;
    if (!can) return;
    const listQuestion = Object.values(this.state.listQ).map(item => ({
      ...item,
      correctAnswer: item[item.correctAnswer],
    }));
    console.log("save -> listQuestion", listQuestion)
    this.props.createExam(name, image, subject, level, description, time, listQuestion);
  }

  add = (can) => {
    if (!can) return;
    const length = Object.keys(this.state.listQ).length;
    this.setState(state => {
      return ({
        pointer: length,
        listQ: {
          ...state.listQ,
          [`Q${length}`]: {
            number: length,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctAnswer: 'option1',
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
          {`Câu ${pointer + 1}`}
        </h6>
        <div className="question d-flex">
          <div className="left">
            <CKEditor
              data={listQ[`Q${pointer}`].question || ''}
              // data={''}
              onChange={e => this.onEditorChange(e)}
              config={{
                height: 82,
                resize_maxHeight: 334,
                resize_minHeight: 186,
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
                  checked={`option${item}` === listQ[`Q${pointer}`].correctAnswer
                    || listQ[`Q${pointer}`].correctAnswer === listQ[`Q${pointer}`][`option${item}`]}
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
    const { isShow } = this.props;
    const canBack = Object.keys(listQ).length > 1 && pointer > 0;
    const canNext = pointer < Object.keys(listQ).length - 1;
    const canAdd = Object.keys(listQ).length < total && pointer < total;
    const canSave = Object.keys(listQ).length >= 1;

    return (
      <React.Fragment>
        <div className={`UpdateQuestion ${!isShow ? 'd-none' : ''}`}>
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

export default connect(
  null,
  {
    createExam,
  }
)(UpdateQuestion);


// var a = [{
//   id: 1,
//   name: 'abc',
//   option1: 'abc',
//   option2: '321',
//   option3: '42121521',
//   option4: '521',
//   correctAnswer: 'abc',
// },
// {
//   id: 2,
//   name: 'abc2',
//   option1: '412421',
//   option2: 'abc2',
//   option3: '412421',
//   option4: '412412',
//   correctAnswer: 'abc2',
// },
// {
//   id: 3,
//   name: 'abc4',
//   option1: '412421',
//   option2: '12412',
//   option3: '412421',
//   option4: 'abc4',
//   correctAnswer: 'abc4',
// }]


// var b = a.map(item => {
//   if (item.correctAnswer === item.option1) {
//     item.correctAnswer = 'option1';
//   }
//   if (item.correctAnswer === item.option2) {
//     item.correctAnswer = 'option2';
//   }
//   if (item.correctAnswer === item.option3) {
//     item.correctAnswer = 'option3';
//   }
//   if (item.correctAnswer === item.option4) {
//     item.correctAnswer = 'option4';
//   }
//   return item;
// })