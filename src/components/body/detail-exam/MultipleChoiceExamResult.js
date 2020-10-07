import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import {
  doExam,
  getDetailExam,
  getResultExam,
} from 'actions/examActions';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';
import { Redirect } from 'react-router';
import { getMinute } from 'actions/common/utils';

class MultipleChoiceExamResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    this.props.getResultExam(id);
  }

  componentWillReceiveProps() {
    if (false) {
      this.setState({ examId: 1, })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  renderQuestion = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ['option1', 'option2', 'option3', 'option4'];
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="game-code-view">
            <div className="card-game-content" >
              <span dangerouslySetInnerHTML={{ __html: `<b>Câu ${i + 1}: </b>${item.question}` }}>
                {/* {item.question} */}
              </span>
            </div>
            <div className="group-checkbox">
              {opt.map(option => {
                return (
                  <div className={`input-group-prepend 
                    ${item.correctAnswer && item[option] === item.correctAnswer ? 'true' : ''}
                    ${item.answerOP && item[option] === item.answerOP ? 'chosen' : ''}
                    ${item.answer && item[option] === item.answer ? 'active' : ''}
                  `}
                  >
                    <div className="input-group-text">
                      <input type="radio" name={item.id} className="input-items disable"
                        onChange={() => { }} readOnly
                        checked={item.answer && item[option] === item.answer}

                      />
                    </div>
                    <div className="input-content">
                      {item[option]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      );
    })
  }


  renderChoiceTable = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ['option1', 'option2', 'option3', 'option4'];
    const key = { option1: "A", option2: "B", option3: "C", option4: "D" };
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="abc d-flex">
            <div className="stt">{i + 1}</div>
            {
              opt.map(option => {
                return (
                  <div className={`edf disable
                    ${item.correctAnswer && item[option] === item.correctAnswer ? 'true' : ''}
                    ${item.answer && item[option] === item.answer ? 'active' : ''}
                    ${this.state[`Q${i}`] && option === this.state[`Q${i}`].answerOP ? 'active' : ''}
                    `}
                  // onClick={() => this.choose(i, item.id, item[option], option)}
                  // onClick={() => this.choose(i, item.id, option)}
                  // ${this.state[`Q${i}`] && item[option] === this.state[`Q${i}`].answerOP ? 'active' : ''}
                  >
                    {key[option]}
                  </div>
                )
              })
            }
          </div>
        </React.Fragment>
      );
    })
  }

  render() {// file này là trang bài làm
    const { accessToken, result, match, location, isDone } = this.props;
    const { id, subject } = match.params;
    const { examQuestions } = result;
    const examQuestions1 = [
      {
        "id": 1,
        "image": "",
        "question": "<p>Trong m?t ph?ng oxy cho ???ng th?ng <em>d: 2x - y + 1 = 0. </em>?? ph&eacute;p t?nh ti?n vector v bi?n ???ng th?ng d th&agrave;nh ch&iacute;nh n&oacute; th&igrave; vector v&nbsp;ph?i l&agrave; vecto n&agrave;o trong c&aacute;c vecto sau?</p>",
        "option1": "<p><strong>(2; -1)</strong></p>",
        "option2": "<p><strong>(3; -2)</strong></p>",
        "option3": "<p><strong>(7; 4)</strong></p>",
        "option4": "<p><strong>(1; -1)</strong></p>"
      },
      {
        "id": 2,
        "image": "",
        "question": "<p>Trong m?t ph?ng oxy cho ???ng th?ng <em>d: 2x - y + 1 = 0. </em>?? ph&eacute;p t?nh ti?n vector v bi?n ???ng th?ng d th&agrave;nh ch&iacute;nh n&oacute; th&igrave; vector v&nbsp;ph?i l&agrave; vecto n&agrave;o trong c&aacute;c vecto sau?</p>",
        "option1": "<p><strong>(2; -1)</strong></p>",
        "option2": "<p><strong>(3; -2)</strong></p>",
        "option3": "<p><strong>(2; -10)</strong></p>",
        "option4": "<p><strong>(-2; -1)</strong></p>"
      },
      {
        "id": 3,
        "image": "",
        "question": "<p>Trong m?t ph?ng oxy cho ???ng th?ng <em>d: 2x - y + 1 = 0. </em>?? ph&eacute;p t?nh ti?n vector v bi?n ???ng th?ng d th&agrave;nh ch&iacute;nh n&oacute; th&igrave; vector v&nbsp;ph?i l&agrave; vecto n&agrave;o trong c&aacute;c vecto sau?</p>",
        "option1": "<p><strong>(2; -1)</strong></p>",
        "option2": "<p><strong>(1; -1)</strong></p>",
        "option3": "<p><strong>(7; -1)</strong></p>",
        "option4": "<p><strong>(12; -1)</strong></p>"
      },
      {
        "id": 4,
        "image": "",
        "question": "<p>Trong m?t ph?ng oxy cho ???ng th?ng <em>d: 2x - y + 1 = 0. </em>?? ph&eacute;p t?nh ti?n vector v bi?n ???ng th?ng d th&agrave;nh ch&iacute;nh n&oacute; th&igrave; vector v&nbsp;ph?i l&agrave; vecto n&agrave;o trong c&aacute;c vecto sau?</p>",
        "option1": "<p><strong>(2; -1)</strong></p>",
        "option2": "<p><strong>(4; -1)</strong></p>",
        "option3": "<p><strong>(5; -1)</strong></p>",
        "option4": "<p><strong>(8; -1)</strong></p>"
      }]
    const { examTime } = this.state;
    const arrVal = Object.values(this.state);
    const numOption1 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option1');
    const numOption2 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option2');
    const numOption3 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option3');
    const numOption4 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option4');
    if (!accessToken && isDone) return <Redirect to='/' />
    if (subject === 'van') {
      if (location.pathname.includes('lop-10')) {
        return <Redirect to={`/lop-10/mon/van/${id}`} />
      }
      return <Redirect to={`/dai-hoc/mon/van/${id}`} />
    }
    return (
      <MainContent>
        <div className="container MultipleChoiceExam">
          <div className="row">
            <div className="col-9">
              {this.renderQuestion(examQuestions)}
            </div>

            <div className="col-3">
              <div className="multiple-choice">
                <div className="result-timer" style={{ textAlign: 'center', margin: '8px auto' }}>
                  {getMinute(result.doTime)}
                </div>
                <div className="a123 d-flex">
                  <div className="a123-stt">STT</div>
                  <div className="a123-number">{numOption1 ? numOption1.length : 0}</div>
                  <div className="a123-number">{numOption2 ? numOption2.length : 0}</div>
                  <div className="a123-number">{numOption3 ? numOption3.length : 0}</div>
                  <div className="a123-number">{numOption4 ? numOption4.length : 0}</div>
                </div>
                <div className="wrapper-table-choice list-overflow-auto">
                  {this.renderChoiceTable(examQuestions)}
                </div>
              </div>
              {/* <div className="btn-group"> */}
              <button type="button" className="btn btn-primary submit-btn disable"
              >
                Nộp Bài
                </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth, exam: { result } } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    result: result || {},
    isDone: auth.isDone,
  };
};

export default connect(mapStateToProps, {
  doExam,
  getDetailExam,
  getResultExam,
})(MultipleChoiceExamResult);