import React from 'react';

import './styles/TittleUserInfo.scss';

class TittleUserInfo extends React.Component {
  render() {
    const { title, description } = this.props;
    return (
      <React.Fragment>
        <div className="TittleUserInfo">
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default TittleUserInfo;
