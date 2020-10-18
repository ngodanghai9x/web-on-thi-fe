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
        this.setState({ examId: id, name, image, subject, grade, description, examTime: time * 60, examTotalTime: time * 60, canDelete, examQuestions });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.examTime === 1) {
      this.submit();
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
                //  ${item.correctAnswer && item[option] === item.correctAnswer ? 'true' : ''}
                //  ${item.answerOP && item[option] === item.answerOP ? 'chosen' : ''}
                // ${this.state[`Q${i}`] && this.state[`Q${i}`].answerOP && this.state[`Q${i}`].answerOP.includes(option)  ? 'active' : ''}
                return (
                  <div className={`input-group-prepend 
                    ${item.correctAnswer && item.correctAnswer.includes(item[option]) ? 'true' : ''}
                  `}

                  >
                    <div className="input-group-text">
                      <input type={item.type === 'one' ? 'radio' : 'checkbox'} className="input-items"
                        // name={item.id}
                        onChange={() => { }} readOnly
                        onClick={() => this.choose(i, item.id, item[option], option)}
                        checked={this.state[`Q${i}`] && this.state[`Q${i}`].answerOP && this.state[`Q${i}`].answerOP.includes(option)}
                      // checked={this.state[`Q${i}`] && option === this.state[`Q${i}`].answerOP}
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

  choose = (i, questionId, answer, answerOP, itemQ) => {
    this.setState(state => {
      const oldAnswerOP = state[`Q${i}`] && state[`Q${i}`].answerOP ? state[`Q${i}`].answerOP : [];
      const oldAnswer = state[`Q${i}`] && state[`Q${i}`].answer ? state[`Q${i}`].answer : [];
      if (oldAnswerOP.includes(answerOP)) {
        return ({
          [`Q${i}`]: {
            // questionId,
            answerOP: oldAnswerOP.filter(item => item !== answerOP),
            answer: oldAnswer.filter(item => item !== answer),
            ...itemQ,
          }
          // [`Q${i}`]: { questionId, answer, answerOP }
        });
      }
      return ({
        [`Q${i}`]: {
          // questionId,
          answerOP: [...oldAnswerOP, answerOP], answer: [...oldAnswer, answer], ...itemQ
        }
        // [`Q${i}`]: { questionId, answer, answerOP }
      });
    });
  }

  submit = () => {
    const { examTime, examId, examTotalTime } = this.state;
    const { location, history, match } = this.props;
    const idx = location.pathname.lastIndexOf('/');
    // if (examTime === 0) return;
    const examAnswer1 = Object.values(this.state).filter(item => item && item.id && item.answerOP && item.answer);
    const listId = examAnswer1.map(item => item.id);
    const examAnswer2 = this.state.examQuestions.filter(item => item && !listId.includes(item.id));
    //   {
    //   if (item && !listId.includes(item.id)) return { 
    //     questionId: item.id,
    //     answer: null,
    //     answerOP: null,
    //     ...item,
    //   };
    //   return null;
    // }
    const arrVal = Object.values(this.state).filter(item => item && item.id && item.answer && item.answerOP);
    const numOption1 = arrVal.filter(item => item.answerOP.includes('option1'));
    const numOption2 = arrVal.filter(item => item.answerOP.includes('option2'));
    const numOption3 = arrVal.filter(item => item.answerOP.includes('option3'));
    const numOption4 = arrVal.filter(item => item.answerOP.includes('option4'));
    const listNum = [
      numOption1 ? numOption1.length : 0,
      numOption2 ? numOption2.length : 0,
      numOption3 ? numOption3.length : 0,
      numOption4 ? numOption4.length : 0,
    ];
    const examAnswer = [...examAnswer1, ...examAnswer2];
    console.log("submit -> examAnswer", examAnswer, listNum)
    // const examAnswer = arrVal.map(item => ({}));

    this.props.doExam(examId, examTotalTime - examTime, examAnswer, listNum);
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
                  <div className={`edf select
                    ${item.correctAnswer && item.correctAnswer.includes(item[option]) ? 'true' : ''}
                    ${this.state[`Q${i}`] && this.state[`Q${i}`].answerOP && this.state[`Q${i}`].answerOP.includes(option) ? 'active' : ''}
                    `}
                    onClick={() => this.choose(i, item.id, item[option], option, item)}
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
    const { examTime } = this.state;
    const arrVal = Object.values(this.state).filter(item => item && item.id && item.answer && item.answerOP);
    const numOption1 = arrVal.filter(item => item.answerOP.includes('option1'));
    const numOption2 = arrVal.filter(item => item.answerOP.includes('option2'));
    const numOption3 = arrVal.filter(item => item.answerOP.includes('option3'));
    const numOption4 = arrVal.filter(item => item.answerOP.includes('option4'));
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
                <div className="result-timer d-flex justify-content-center align-items-center" style={{ margin: '8px auto' }}>
                  <img src='/images/hourglass.gif' alt='oclock' width='30' height='24' />
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