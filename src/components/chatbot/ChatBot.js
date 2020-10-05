import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';

import { sendMessage } from 'actions/userActions';



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

  onEnter = (e, pressed) => {
    if (e.keyCode === 13 || pressed) {
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

      this.props.sendMessage(text).then(message => {
        const temp1 = [...this.state.messages, { isChatBot: true, mes: message }];
        this.setState(pre => ({
          messages: temp1,
          lastIndex: temp1.length - 1,
        }));
      })
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
                <div className="icon" onClick={(e) => this.onEnter(e, true)}>
                  <sendIcon />
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
    sendMessage,
  }
)(ChatBot);

const sendIcon = () => {
  return (
    <svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.1346 4.43119L11.4106 13.3809" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.1346 4.43118L13.8072 22.9337L11.4106 13.3809L3.23024 7.89622L24.1346 4.43118Z" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}