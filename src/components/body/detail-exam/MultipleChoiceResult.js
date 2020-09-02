import React from 'react';
import { connect } from 'react-redux';
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
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <React.Fragment>
        <div className='MultipleChoiceResult'>

        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(MultipleChoiceResult);
