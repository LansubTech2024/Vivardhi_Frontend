import React, { useEffect } from 'react';

const Chatbot = () => {
  
    useEffect(() => {
        if (!document.getElementById('df-messenger-script')) {
          const dfMessengerScript = document.createElement('script');
          dfMessengerScript.id = 'df-messenger-script';
          dfMessengerScript.src =
            'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
          dfMessengerScript.async = true;
          document.body.appendChild(dfMessengerScript);
        }
      }, []);
  return (
    <>
    <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"/>
    <df-messenger
      project-id="plated-axon-440713-d1"
      agent-id="14115f0d-46f2-4212-a897-0c7e8bf19698"
      language-code="en"
      max-query-length="-1">
      <df-messenger-chat-bubble
       chat-title="Opfact">
      </df-messenger-chat-bubble>
    </df-messenger>
    </>
  );
};

export default Chatbot;