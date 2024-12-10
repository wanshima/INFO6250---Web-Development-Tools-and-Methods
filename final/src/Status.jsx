import { MESSAGES } from './constants.js'; 
import './App.css';

function Status({ error }) {
  console.log('Status Component Error:', error);
  const message = MESSAGES[error] || MESSAGES.default;
  return (
    <div className="status">
      {message}
    </div>
  );
}

export default Status;
