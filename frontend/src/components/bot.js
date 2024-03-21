import React from "react";
import { useState ,useEffect} from "react";
import "./bot.css";
import { useNavigate } from "react-router-dom";


function ChatbotPage() {
  const navigate=useNavigate();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);


useEffect(() => {
  const token=localStorage.getItem('TOKEN');
        if(!token){
            navigate('/signin')
        }
}, []);



  return (
    <div className="container">
      <h1>Welcome to the Chatbot</h1>
      <div className="chatbot-wrapper">
        <iframe
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/a1f2ab4e-1c9d-455f-b88d-139f5dc4b0cf"
        ></iframe>
      </div>
    </div>
  );
}

export default ChatbotPage;