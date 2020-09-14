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
            <div className = "exam-infor-panel" >
            <div className = "Mul-title" > Đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1 </div> 
                <div className = "description">Gửi đến các bạn học sinh lớp 12 đề luyện thi THPT Quốc gia 2020 môn Lý - Đề số 1 có đáp án do Học Tốt tổng hợp nhằm giúp các em có thêm tư liệu để tham khảo củng cố kiến thức trước khi bước vào kì thi. </div> 
                <div className = "item-infor-panel">
                <div className = "item-label">
                    <div className = "icon">
                        <i className = "far fa-calendar-alt"/>
                    </div> 
                <div className = "label" > Số câu hỏi </div> 
                </div> 
                <div className = "gwt-HTML" > 40 Câu </div> 
                </div> 
                <div className = "item-infor-panel" >
                <div className = "item-label" >
                <div className = "icon" >
                <i className = "far fa-calendar-alt" />
                </div> 
                <div className = "label" > Thời gian làm bàii </div> 
                </div> 
                <div className = "gwt-HTML" >50 Phút </div> 
                </div> 
                <div className = "item-infor-panel" >
                <div className = "item-label" >
                <div className = "icon" >
                <i className = "far fa-calendar-alt"/>
                </div> 
                <div className = "label" > Số lần tạm dừng </div> 
                </div> 
                <div className = "gwt-HTML" >0 / Không </div> 
                </div> 
                <div className = "item-infor-panel" >
                <div className = "item-label" >
                <div className = "icon" >
                <i className = "far fa-calendar-alt" />
                </div> 
                <div className = "label" > Số lần làm lại </div> 
                </div> 
                <div className = "gwt-HTML" > 0 / Không giới hạn </div> 
                </div> 
                <div className = "item-infor-panel" >
                    <div className = "item-label" >
                        <div className = "icon" >
                            <i className = "far fa-calendar-alt" />
                        </div> 
                        <div className = "label" > Số người đã tham gia </div> 
                    </div> 
                    <div className = "gwt-HTML" > 1331 </div> 
                </div> 
                <div className = "button" >
                    <button className = "btn btn-primary" type = "submit" >làm bài </button> 
                </div> 
            </div>

            <div className = "answer-sheet-fixed" >
                <div className = "answer-sheet-fixed-main">
                     <div className = "title-answer-sheet-fixed-main" >
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
                                        <td><div class="DGB" >5</div>
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
                                        <td><div class="DGB" >6</div>
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
                                        <td><div class="DGB" >7</div>
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
                                        <td><div class="DGB" >9</div>
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
                                        <td><div class="DGB" >10</div>
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
                                        <td><div class="DGB" >11</div>
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
                                        <td><div class="DGB" >12</div>
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
                                        <td><div class="DGB" >13</div>
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
                                        <td><div class="DGB" >14</div>
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
                                        <td><div class="DGB" >15</div>
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
                                        <td><div class="DGB" >16</div>
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
                                        <td><div class="DGB" >17</div>
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
                                        <td><div class="DGB" >18</div>
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
                                        <td><div class="DGB" >19</div>
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
                                        <td><div class="DGB" >20</div>
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
                                        <td><div class="DGB" >21</div>
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
                                        <td><div class="DGB" >22</div>
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
                                        <td><div class="DGB" >23</div>
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
                                        <td><div class="DGB" >24</div>
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
                                        <td><div class="DGB" >25</div>
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
                                        <td><div class="DGB" >26</div>
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
                                        <td><div class="DGB" >27</div>
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
                                        <td><div class="DGB" >28</div>
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
                                        <td><div class="DGB" >29</div>
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
                                        <td><div class="DGB" >30</div>
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
                                        <td><div class="DGB" >31</div>
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
                                        <td><div class="DGB" >32</div>
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
                                        <td><div class="DGB" >33</div>
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
                                        <td><div class="DGB" >34</div>
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
                                        <td><div class="DGB" >35</div>
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
                                        <td><div class="DGB" >36</div>
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
                                        <td><div class="DGB" >37</div>
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
                                        <td><div class="DGB" >38</div>
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
                                        <td><div class="DGB" >39</div>
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
                                        <td><div class="DGB" >40</div>
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
                                        <td><div class="DGB" >41</div>
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
                                        <td><div class="DGB" >42</div>
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
                                        <td><div class="DGB" >43</div>
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
                                        <td><div class="DGB" >44</div>
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
                                        <td><div class="DGB" >45</div>
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
                                        <td><div class="DGB" >46</div>
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
                                        <td><div class="DGB" >47</div>
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
                                        <td><div class="DGB" >48</div>
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
                                        <td><div class="DGB" >49</div>
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
            </MainContent>
        );
    }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceExam);