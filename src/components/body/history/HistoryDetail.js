import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import { Link, Redirect, withRouter } from 'react-router-dom';

import { subjects2 } from 'actions/common/getInfo';
import { getHistoryExam } from 'actions/examActions';
import UserContent from '../layout/UserContent';
import TittleUserInfo from '../user/TittleUserInfo';
import { getMinute } from 'actions/common/utils';
import MainContent from '../layout/MainContent';
import 'components/body/detail-exam/styles/MultipleChoiceExam.scss';

class HistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    this.props.getHistoryExam(id);
  }

  componentWillReceiveProps() {
    if (false) {
      this.setState({ examId: 1,})
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

  render() {
    const { accessToken, result } = this.props;
    const { examQuestions } = result;
    const { examTime } = this.state;
    const arrVal = Object.values(this.state);
    const numOption1 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option1');
    const numOption2 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option2');
    const numOption3 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option3');
    const numOption4 = arrVal.filter(item => item && item.questionId && item.answer && item.answerOP === 'option4');
    // if (!accessToken) return <Redirect to='/' />
    return (
      <MainContent>
        <div className="container MultipleChoiceExam">
          <div className="row">
            <div className="col-9">
              {this.renderQuestion(examQuestions)}
            </div>

            <div className="col-3">
              <div className="multiple-choice">
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
              {getMinute(result.time)}
            </div>
          </div>
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { auth, exam: {result} } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    result,
  };
};

export default withRouter(connect(
  mapStateToProps,
  {
    getHistoryExam,
  }
)(HistoryDetail));
// export default Header;