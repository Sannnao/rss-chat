import { connect } from 'react-redux';
import { sendMessage, receiveMessages, clearOfflineMessages } from '../actions/index';
import App from '../App';

const mapStateToProps = ({ receiveMessages, sendMessages }) => {
  return {
    messages: [...receiveMessages],
    offlineMessages: [...sendMessages] };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (name, message) => dispatch(sendMessage(name, message)),
    receiveMessages: () => dispatch(receiveMessages()),
    clearOfflineMessages: () => dispatch(clearOfflineMessages()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ChatContainer;
