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
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
                            </div>

                            <div className="abc d-flex">
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
                            </div>

                            <div className="abc d-flex">
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
                            </div>

                            <div className="abc d-flex">
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
                            </div>

                            <div className="abc d-flex">
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
                            </div>

                            <div className="abc d-flex">
                                <div className="edf">A</div>
                                <div className="edf">B</div>
                                <div className="edf">C</div>
                                <div className="edf">D</div>
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