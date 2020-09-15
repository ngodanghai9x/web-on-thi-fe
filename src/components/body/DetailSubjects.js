import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import MainContent from 'components/body/layout/MainContent';
import './styles/Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const subjects = ['Toán Học', 'Ngữ Văn', 'Hóa Học'];
    return (
      <MainContent>
        detail subjects
      </MainContent>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(Content);
