import './MessagePopup.css';

const MessagePopup = ({onClose}) => {
  return (
    <>
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-title">
          <h2>System Recommendation</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="dialog-content">
          <p>
            The system is currently operating within the expected temperature ranges. If the inlet temperature for the chilled water exceeds 12°C, 
            consider increasing the cooling capacity to prevent inefficiency. Similarly, if the outlet temperature for the condenser water rises above 30°C, 
            check for potential issues with the condenser and ensure proper water flow. Regular inspections and monitoring are crucial to maintaining optimal system performance.
          </p>
          <h4>Abbreviations:</h4>
          <ul>
            <li><strong>CHW In Temp:</strong> Chilled Water Inlet Temperature</li>
            <li><strong>CHW Out Temp:</strong> Chilled Water Outlet Temperature</li>
            <li><strong>COW In Temp:</strong> Condenser Water Inlet Temperature</li>
            <li><strong>COW Out Temp:</strong> Condenser Water Outlet Temperature</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default MessagePopup;
