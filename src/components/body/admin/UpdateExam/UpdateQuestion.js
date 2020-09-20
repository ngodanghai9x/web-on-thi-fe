
import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import * as CommonIcon from 'components/icons/common';
import { createExam } from 'actions/examActions';

// import './styles/CreateExam.scss';

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
          answer: 'option1',
        }
      },
      pointer: 0,
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    //for update
    // const { pathName } = this.props;
    // if (nextProps.pathName && nextProps.pathName.abc) {
    //   const listQ = [].map((item, i) => ({
    //     [`Q${i}`] : { ...item }
    //   }))
    //   this.setState({ listQ });
    // }
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
      answer: item[item.answer],
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
            answer: 'option1',
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
                  checked={`option${item}` === listQ[`Q${pointer}`].answer}
                  onClick={() => this.setState(state => ({
                    listQ: {
                      ...state.listQ,
                      [`Q${state.pointer}`]: {
                        ...state.listQ[`Q${state.pointer}`],
                        answer: `option${item}`,
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
    const { isShow, total } = this.props;
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
)(CreateQuestion);