import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';





import './styles/ChatBot.scss';

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      input: '',
      lastIndex: 0,
      messages: [
        {
          isChatBot: true,
          mes: 'Chào bạn ! Tôi có thể giúp gì cho bạn ?',
        },
        {
          isChatBot: false,
          mes: 'Bạn tên là gì ',
        },
        {
          isChatBot: true,
          mes: 'Tôi tên là ....',
        },
        {
          isChatBot: false,
          mes: 'Bạn tên là gì ',
        },
        {
          isChatBot: true,
          mes: 'Tôi tên là ....',
        },
        {
          isChatBot: false,
          mes: 'Bạn tên là gì ',
        },
        {
          isChatBot: true,
          mes: 'Tôi tên là ....',
        },
      ]
    };
  }
  componentDidUpdate() {
    if (document.getElementById(`mes-${this.state.lastIndex}`)) {
      document.getElementById(`mes-${this.state.lastIndex}`).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  }

  componentWillUnmount() {
    // document.removeEventListener('keydown', this.onEnter, false);
  }

  onEnter = (e) => {
    if (e.keyCode === 13) {
      const text = e.target.value.trim();
      if (!text) {
        this.setState({ input: '' });
        return;
      }
      const temp = [...this.state.messages, { mes: text }];
      this.setState(pre => ({
        messages: temp,
        input: '',
        lastIndex: temp.length - 1,
      }));
    }
  }

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState({ [error]: 'Bạn nhập quá 255 kí tự' });
      return window.noti.error('Bạn nhập quá 255 kí tự');
    }
    else {
      this.setState({ [key]: val, [error]: '' });
    }
  }

  toggle = () => {
    this.setState(pre => ({ isOpen: !pre.isOpen }))
  }

  renderMessage = () => {
    const { messages } = this.state;
    if (messages) {
      return messages.map((item, i) => {
        return (
          <React.Fragment>
            <div className="">
              <span className={`name ${!item.isChatBot ? 'd-none' : ''}`}>Windy</span>
              <div id={`mes-${i}`} className={`message ${!item.isChatBot ? 'notchatbot' : ''}`}>
                {item.mes}
              </div>
            </div>
          </React.Fragment>
        );
      })
    }
    return null;

  }

  render() {
    const { isOpen, input } = this.state;
    return (
      <React.Fragment>
        <div className="ChatBot h-25 w-25">
          <div className="icon-chatbot" onClick={() => this.toggle()} />
          <div className="wrapper-CB">
            <div id="form-chatbot" className={`wrapper-form-chat ${!isOpen ? 'd-none' : ''} position-absolute`}>
              {this.renderMessage()}
              <div className="input-wrapper">
                <input
                  type="text" value={input || ''}
                  placeholder="Aa"
                  onChange={(e) => this.onChangeMax255('input', e.target.value)}
                  onKeyDown={this.onEnter}
                // onBlur={e => this.onBlurNotNull('errorPassword', e.target.value)}
                />
                <div className="icon">
                  ??
              </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}


// const mapStateToProps = (state, ownProps) => {

// };

export default connect(
  null,
  {
    // logout,
  }
)(ChatBot);