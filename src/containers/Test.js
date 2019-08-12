import { connect } from 'react-redux';
import { sendMessage, getMessages, requestMessages } from '../actions/index';
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
    getMessages: () => dispatch(getMessages()),
    requestMessages: () => dispatch(requestMessages()),
  };
};

const Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default Test;
