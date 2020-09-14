import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../layout/MainContent';
import './styles/MultipleChoiceExam.scss';

class MultipleChoiceExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { match } = this.props;
        const { subjects } = match.params; // type, môn học
    }

    render() {// file này là trang bài làm
        return (
            <MainContent>
                <div className="container MultipleChoiceExam">
                    <div className="row">
                        <div className="col-9">


                        </div>
                        <div className="col-3">
                            <div className="a123 d-flex">
                                <div>TT</div>
                                <div>0</div>
                                <div>1</div>
                                <div>0</div>
                            </div>
                            <div className="abc d-flex">
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                            </div>
                            <div className="abc d-flex">
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                                <div className="edf">
                                    A
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-3">
                            <div className="answer-sheet-fixed" >
                                <div className="answer-sheet-fixed-main">
                                    <div className="title-answer-sheet-fixed-main" >
                                        <div className="answer-time-running-title">
                                            <img src="#"></img>
                                            <div className="exam-title">20m35s</div>
                                        </div>
                                    </div>
                                    <div className="title-answer-sheet-panel">
                                        <div className="exam-title">TT</div>
                                        <div className="exam-number-answer-question">1</div>
                                        <div className="exam-number-answer-question">1</div>
                                        <div className="exam-number-answer-question">1</div>
                                        <div className="exam-number-answer-question">1</div>
                                    </div>
                                    <div className="exam-scroll-style">
                                        <div className="exam-answer-panel-item">
                                            <table cellspacing="0" cellpadding="0" class="EGB indexAnswerSheet" id="answerSheetItem-0" >
                                                <tbody>
                                                    <tr>
                                                        <td><div class="DGB" >1</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <button type="button" class="radioButtonAnswer" >A</button>
                                                                <button type="button" class="radioButtonAnswer" >B</button>
                                                                <button type="button" class="radioButtonAnswer" >C</button>
                                                                <button type="button" class="radioButtonAnswer" >D</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellspacing="0" cellpadding="0" class="EGB indexAnswerSheet" id="answerSheetItem-0" >
                                                <tbody>
                                                    <tr>
                                                        <td><div class="DGB" >2</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <button type="button" class="radioButtonAnswer" >A</button>
                                                                <button type="button" class="radioButtonAnswer" >B</button>
                                                                <button type="button" class="radioButtonAnswer" >C</button>
                                                                <button type="button" class="radioButtonAnswer" >D</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table cellspacing="0" cellpadding="0" class="EGB indexAnswerSheet" id="answerSheetItem-0" >
                                                <tbody>
                                                    <tr>
                                                        <td><div class="DGB" >3</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <button type="button" class="radioButtonAnswer" >A</button>
                                                                <button type="button" class="radioButtonAnswer" >B</button>
                                                                <button type="button" class="radioButtonAnswer" >C</button>
                                                                <button type="button" class="radioButtonAnswer" >D</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table cellspacing="0" cellpadding="0" class="EGB indexAnswerSheet" id="answerSheetItem-0" >
                                                <tbody>
                                                    <tr>
                                                        <td><div class="DGB" >4</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <button type="button" class="radioButtonAnswer" >A</button>
                                                                <button type="button" class="radioButtonAnswer" >B</button>
                                                                <button type="button" class="radioButtonAnswer" >C</button>
                                                                <button type="button" class="radioButtonAnswer" >D</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table cellspacing="0" cellpadding="0" class="EGB indexAnswerSheet" id="answerSheetItem-0" >
                                                <tbody>
                                                    <tr>
                                                        <td><div class="DGB" >50</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <button type="button" class="radioButtonAnswer" >A</button>
                                                                <button type="button" class="radioButtonAnswer" >B</button>
                                                                <button type="button" class="radioButtonAnswer" >C</button>
                                                                <button type="button" class="radioButtonAnswer" >D</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

            </MainContent>
        );
    }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceExam);