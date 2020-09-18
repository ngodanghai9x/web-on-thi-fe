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
                            <div className="game-code-view">
                                <div className="card-game-content" id="dictMode61772" >
                                    <b>Câu 1: </b>
                                    Trong thí nghiệm của Y-âng về giao thoa ánh sáng, khoảng cách giữa hai khe là 1 mm, khoảng cách từ mặt phẳng chứa hai khe đến màn quan sát lúc đầu là 2 m. Nguồn sáng đơn sắc có bước sóng 750 nm. 
                                    Truyền cho màn vận tốc ban đầu hướng lại gần mặt phẳng hai khe để màn dao động điều hòa theo phương vuông góc với mặt phẳng hai khe với biên độ 40 cm và chu kì 6 s.
                                    Thời gian kể từ lúc màn dao động đến khi điểm M trên màn cách vân trung tâm 19,8 mm cho vân sáng lần thứ 8 bằng
                                </div>
                                <div className="group-checkbox">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3 s
                                        </div>
                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3,5 s
                                        </div>
                                    </div>

                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            2s
                                        </div>
                                    </div>

                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3,375 s
                                        </div>
                                    </div>
                                    </div>
                            </div>

                            <div className="game-code-view">
                                <div className="card-game-content" id="dictMode61772" >
                                    <b>Câu 2: </b>
                                    Một chất điểm dao động điều hòa với biên độ bằng 3 cm. Xét trong cùng một khoảng thời gian như nhau, 
                                    nếu chất điểm đi được quãng đường dài nhất là 3√2 cm thì quãng đường ngắn nhất mà chất điểm đi được là
                                </div>
                                <div className="group-checkbox">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3 s
                                        </div>
                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3,5 s
                                        </div>
                                    </div>

                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            2s
                                        </div>
                                    </div>

                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" className="input-items"></input>
                                        </div>
                                        <div className="input-content">
                                            3,375 s
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                            </div>
                        <div className="col-3">
                            <div className="multiple-choice">
                                <div className="a123 d-flex">
                                    <div >STT</div>
                                    <div className="a123-number">0</div>
                                    <div className="a123-number">0</div>
                                    <div className="a123-number">1</div>
                                    <div className="a123-number">0</div>
                                </div>
                                <div className="abc d-flex">
                                    <div className="stt">1</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>

                                <div className="abc d-flex">
                                    <div className="stt">2</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>

                                <div className="abc d-flex">
                                    <div className="stt">3</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>

                                <div className="abc d-flex">
                                    <div className="stt">4</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>

                                <div className="abc d-flex">
                                <div className="stt">5</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>

                                <div className="abc d-flex">
                                    <div className="stt">6</div>
                                    <div className="edf">A</div>
                                    <div className="edf">B</div>
                                    <div className="edf">C</div>
                                    <div className="edf">D</div>
                                </div>
                            </div>
                            {/* <div className="btn-group"> */}
                                <button type="button" class="btn btn-primary">nộp bài</button>
                            {/* </div> */}

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