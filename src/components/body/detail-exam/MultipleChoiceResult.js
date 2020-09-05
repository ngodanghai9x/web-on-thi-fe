import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../layout/MainContent';
// import './styles/MultipleChoiceResult.scss';

class MultipleChoiceResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    const { subjects } = match.params; // type, môn học
  }

  render() {
    return (
      <MainContent>
        <div className='MultipleChoiceResult'>
        MultipleChoiceResult
        </div>
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceResult);
