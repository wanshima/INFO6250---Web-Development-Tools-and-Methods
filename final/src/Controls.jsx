import './App.css';

function Controls({ onLogout, onRefresh }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="controls-button">Refresh Items</button>
      <button onClick={onLogout} className="controls-button">Logout</button>
    </div>
  );
}

export default Controls;
