import { connect } from 'react-redux';
import { sendMessage, getMessages } from '../actions/index';
import Chat from '../components/Chat';

const mapStateToProps = (messages) => {
  console.log(messages);
  return { messages: [...messages] };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (name, message) => dispatch(sendMessage(name, message)),
    getMessages: () => dispatch(getMessages()),
  };
};

const Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default Test;