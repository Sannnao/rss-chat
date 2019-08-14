import { connect } from 'react-redux';
import { sendMessage, receiveMessages, requestMessages } from '../actions/index';
import Chat from '../components/Chat';

const mapStateToProps = ({ receiveMessages, sendMessages }) => {
  console.log(receiveMessages, sendMessages);
  return { 
    messages: [...receiveMessages],
    offlineMessages: [...sendMessages] };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (name, message) => dispatch(sendMessage(name, message)),
    receiveMessages: () => dispatch(receiveMessages()),
    requestMessages: () => dispatch(requestMessages()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default ChatContainer;
