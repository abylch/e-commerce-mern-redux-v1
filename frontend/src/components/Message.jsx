import { Alert } from 'react-bootstrap';

// variant is the color of the message, children is what is being wrap
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;