import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';
import {
  getResultExam,
  getRankList,
} from 'actions/examActions';



import MainContent from '../layout/MainContent';
import './styles/Comment.scss';
import { Redirect, withRouter } from 'react-router';

var fetchAllComment = false;
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      isLike: '',
      userLiked: [],
      createdDate: '',
      updatedDate: '',
      textSend: '',
      textReply: '',
    };
    this.stompClient = null
  }

  componentDidMount() {
    this.connect(this.props.username);
  }

  connect = (username) => {
    const Stomp = require('stompjs')

    var SockJS = require('sockjs-client')

    SockJS = new SockJS('http://localhost:8888/comment')

    this.stompClient = Stomp.over(SockJS);
    this.stompClient.connect({}, this.onConnected, this.onError);
    this.stompClient.debug = null
  }

  onConnected = () => {
    const { examId, username } = this.props;

    this.stompClient.subscribe('/exam/' + examId, this.onMessageReceived);

    this.stompClient.send("/exam/" + examId + "/initComment",
      {},
      JSON.stringify({ examId: examId, username: username })
    )
  }

  sendMessage = () => {
    const { examId, username } = this.props;
    const ele = document.getElementById(`exam-${examId}`);
    const value = ele && ele.value ? ele.value.trim() : '';
    if (value && this.stompClient) {
      var chatMessage = {
        examId: examId,
        username: username,
        content: value,
        parentId: null
        //Nếu reply thì truyền id của parent vào
      };
      this.stompClient.send("/exam/" + examId + "/comment", {}, JSON.stringify(chatMessage));
      ele.value = '';
    }
  }

  replyMessage1 = (parentId, repId) => {
    const { examId, username } = this.props;
    const ele = document.getElementById(`cmt-${repId}`);
    const value = ele && ele.value ? ele.value.trim() : '';
    if (value && this.stompClient) {
      var chatMessage = {
        examId: examId,
        username: username,
        content: value,
        parentId,
        //Nếu reply thì truyền id của parent vào
      };
      this.stompClient.send("/exam/" + examId + "/comment", {}, JSON.stringify(chatMessage));
      ele.value = '';
    }
  }

  replyMessage2 = (parentId, repId) => {
    const { examId, username } = this.props;
    const ele = document.getElementById(`rep-${repId}`);
    const value = ele && ele.value ? ele.value.trim() : '';
    if (value && this.stompClient) {
      var chatMessage = {
        examId: examId,
        username: username,
        content: value,
        parentId,
        //Nếu reply thì truyền id của parent vào
      };
      this.stompClient.send("/exam/" + examId + "/comment", {}, JSON.stringify(chatMessage));
      ele.value = '';
    }
  }

  onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    console.log("Comment -> onMessageReceived -> message", message)
    if (Array.isArray(message)) {
      // Khởi tạo các cmt cũ, do mỗi lần client kết nối đến socket thì đều call getComment nên nó sẽ trả luôn cả list về socket.
      // Nếu chưa khởi show thì mới khởi show list comment cũ đó
      if (!fetchAllComment) {
        for (let i = 0; i < message.length; i++) {
          this.fetchMessage(message[i]);
        }
        fetchAllComment = true;
      }
    } else {
      this.fetchMessage(message)
    }
  }

  fetchMessage = (message) => {
    const { messageList } = this.state;
    if (message && message.parentId) {
      this.setState(state => ({
        messageList: this.addNewChild(state.messageList, message),
      }));
    } else {
      this.setState(state => ({
        messageList: [...state.messageList, message],
      }));
    }
  }

  addNewChild = (list, message) => {
    list.forEach(item => {
      if (item.id == message.parentId) {
        if (item.replyComment && item.replyComment.length > 0)
          item.replyComment = item.replyComment.filter(item => item.id != message.id);
        item.replyComment.push(message);
      }
    })
    return list;
  }

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  }

  getDate = (date) => {
    if (!date) return '';
    return new Date(date).toUTCString();
  }

  render() {
    const { messageList } = this.state;
    const { examId, avatar } = this.props;
    return (
      <div className="Comment">
        <div className="comment-area d-flex align-items-center">
          <div className="avatar">
            <img
              className="img img-rounded"
              src={avatar ? `data:image/png;base64,${avatar}` : '/images/default-avatar.jpg'}
              alt="avt"
            />
          </div>
          <div className="input d-flex align-items-center">
            <input type="text" id={`exam-${examId}`} />
            <div className="icon" onClick={(e) => this.sendMessage(examId)}>
              <svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.1346 4.43119L11.4106 13.3809" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.1346 4.43118L13.8072 22.9337L11.4106 13.3809L3.23024 7.89622L24.1346 4.43118Z" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>

        {messageList.map(item => ((
          <div className="comment d-flex align-items-start" key={item.id}>
            <div className="avatar">
              <img
                className="img img-rounded"
                src={item.avatarBase64 ? `data:image/png;base64,${item.avatarBase64}` : '/images/default-avatar.jpg'}
                alt="avt"
              />
            </div>
            <div className="other">
              <div className="name-content d-flex align-items-center">
                <span className="name">
                  {item.fullNameUserCreated}
                </span>
                <span className="content">
                  {item.content}
                </span>
              </div>

              <div className="button-time d-flex align-items-center">
                <div className="div-btn">
                  <span className="a">
                    Thích
                  </span>
                  <span className="a" onClick={e => this.setState(state => ({ [item.id]: !state[item.id] }))}>
                    Trả lời
                  </span>
                </div>
                <div className="time">
                  {this.getDate(item.updatedDate || item.createdDate)}
                </div>
              </div>
              {
                this.state[item.id] ? (
                  <div className="input d-flex align-items-center">
                    <input type="text" id={`cmt-${item.id}`} />
                    <div className="icon" onClick={(e) => this.replyMessage1(item.id, item.id)}>
                      <svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.1346 4.43119L11.4106 13.3809" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.1346 4.43118L13.8072 22.9337L11.4106 13.3809L3.23024 7.89622L24.1346 4.43118Z" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                ) : null
              }


              {item.replyComment && item.replyComment.map(rep => ((
                <div className="comment2 d-flex align-items-start" key={rep.id}>
                  <div className="avatar">
                    <img
                      className="img img-rounded"
                      src={rep.avatarBase64 ? `data:image/png;base64,${rep.avatarBase64}` : '/images/default-avatar.jpg'}
                      alt="avt"
                    />
                  </div>
                  <div className="other">
                    <div className="name-content d-flex align-items-center">
                      <span className="name">
                        {rep.fullNameUserCreated}
                      </span>
                      <span className="content">
                        {rep.content}
                      </span>
                    </div>

                    <div className="button-time d-flex align-items-center">
                      <div className="div-btn">
                        <span className="a">
                          Thích
                        </span>
                        <span className="a" onClick={e => this.setState(state => ({ [rep.id]: !state[rep.id] }))}>
                          Trả lời
                        </span>
                      </div>
                      <div className="time">
                        {this.getDate(rep.updatedDate || rep.createdDate)}
                      </div>
                    </div>

                    {
                      this.state[rep.id] ? (
                        <div className="input d-flex align-items-center">
                          <input type="text" id={`rep-${rep.id}`} />
                          <div className="icon" onClick={(e) => this.replyMessage2(item.id, rep.id)}>
                            <svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.1346 4.43119L11.4106 13.3809" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M24.1346 4.43118L13.8072 22.9337L11.4106 13.3809L3.23024 7.89622L24.1346 4.43118Z" stroke="#0088FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </div>
                      ) : null
                    }

                  </div>
                </div>
              )))}

            </div>
          </div>
        )))}


      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const { id } = match.params;
  const { auth: { account, user }, exam: { callingApi } } = state;
  return {
    role: account.role,
    callingApi,
    username: account.username,
    examId: id,
    avatar: user.avatar,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
  },
)(Comment));
