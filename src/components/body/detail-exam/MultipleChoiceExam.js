import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import { doExam, getDetailExam } from 'actions/examActions';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';
import { Redirect, withRouter } from 'react-router';
import { getMinute } from 'actions/common/utils';

class MultipleChoiceExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: 0,
      examTime: 2700, // 45 * 60
      examTotalTime: 2700, // 45 * 60
      examQuestions: [],
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    this.fetchDetailExam(id);
    this.doInterval();
  }

  fetchDetailExam = (_id) => {
    this.props.getDetailExam(_id, false).then(({ data, code, message }) => {
      if (data && code === 200) {
        const { id, name, image, subject, grade, description, time, canDelete, examQuestions } = data.exam;
        // console.log("MultipleChoiceExamResult -> fetchDetailExam -> exam", data.exam)
        this.setState({ examId: id, name, image, subject, grade, description, examTime: time, examTotalTime: time, canDelete, examQuestions });
      }
      if (code === 400) {
      }
    })
  }

  doInterval = () => {
    this.timeInterval = setInterval(() => {
      if (this.state.examTime === 0) {
        clearInterval(this.timeInterval);
      } else {
        this.setState({ examTime: this.state.examTime - 1 });
      }
    }, 1000);
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
          <div className="game-code-view" style={i === examQuestions.length - 1 ? { border: 'none' } : {}}>
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
                  `}
                  >
                    <div className="input-group-text">
                      <input type="radio" name={item.id} className="input-items"
                        onChange={() => { }} readOnly
                        onClick={() => this.choose(i, item.id, item[option], option)}
                        checked={this.state[`Q${i}`] && option === this.state[`Q${i}`].answerOP}
                      // onClick={() => this.setState({ [`Q${i}`]: { questionId: item.id, answerOP: item[option] } })}
                      // checked={this.state[`Q${i}`] && item[option] === this.state[`Q${i}`].answerOP}
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

  choose = (i, questionId, answer, answerOP) => {
    this.setState({
      [`Q${i}`]: { questionId, answer, answerOP }
      // [`Q${i}`]: { questionId: item.id, answerOP: item[option] }
    })
  }

  submit = () => {
    const { examTime, examId, examTotalTime } = this.state;
    const { location, history, match } = this.props;
    const idx = location.pathname.lastIndexOf('/');
    if (examTime === 0) return;
    const examAnswer = Object.values(this.state).filter(item => item && item.questionId && item.answerOP && item.answer);
    // const examAnswer = arrVal.map(item => ({}));
    // console.log("MultipleChoiceExam -> submit -> examAnswer", examAnswer)
    this.props.doExam(examId, examTotalTime - examTime, examAnswer);
    clearInterval(this.timeInterval);
    history.push(`${location.pathname.substr(0, idx)}/ket-qua/${match.params.id}`);

  }

  renderChoiceTable = (examQuestions) => {
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
                  <div className={`edf 
                    ${item.correctAnswer && item[option] === item.correctAnswer ? 'true' : ''}
                    ${this.state[`Q${i}`] && option === this.state[`Q${i}`].answerOP ? 'active' : ''}
                    `}
                    onClick={() => this.choose(i, item.id, item[option], option)}
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
    const { accessToken, match, location, isDone } = this.props;
    const { id, subject } = match.params;
    const { examQuestions } = this.state;
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
                  {getMinute(examTime)}
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
              <button type="button" className="btn btn-primary submit-btn"
                onClick={() => this.submit()}
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
  const { auth } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isDone: auth.isDone,
  };
};

export default withRouter(connect(mapStateToProps, {
  doExam,
  getDetailExam,
})(MultipleChoiceExam));