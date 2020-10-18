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

var stompClient = null;
var examId = 3;
var username = 'admin';
var fetchAllComment = false;
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      content: '',
      parentId: '',
      isLike: '',
      userLiked: [],
      createdDate: '',
      updatedDate: '',
      fullNameUserCreated: '',
      username: '',
      avatarBase64: '',
      replyComment: []
    };
  }

  componentDidMount() {
   this.connect(username);
  }

  connect = (username) => {
    const Stomp = require('stompjs')

    var SockJS = require('sockjs-client')

    SockJS = new SockJS('http://localhost:8888/comment')

    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
    // stompClient.debug = null;
  }

  onConnected = () => {
    stompClient.subscribe('/exam/'+examId, this.onMessageReceived);

    stompClient.send("/exam/"+examId+"/initComment",
        {},
        JSON.stringify({examId: examId, username: username})
    )
  }

  sendMessage = (value) => {
    if(value && stompClient) {
      var chatMessage = {
        examId: examId,
        username: username,
        content: value,
        parentId: null
        //Nếu reply thì truyền id của parent vào
      };

      stompClient.send("/exam/"+examId+"/comment", {}, JSON.stringify(chatMessage));
    }
  }

  onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

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
    console.log('comment',message);
  }

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  }

  render() {

    return (
        <div>
         Comment o day
        </div>
    )
  }
}

export default withRouter(Comment);

