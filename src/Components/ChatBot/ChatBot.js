// import React, { useEffect } from 'react';
// import "./chatbot.css";

// const Chatbot = () => {
//   useEffect(() => {
//     const loadScript = () => {
//       const script = document.createElement('script');
//       //script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
//       script.async = true;

//       // Error handling for script load failure
//       script.onerror = () => {
//         console.error("Failed to load Dialogflow Messenger script.");
//       };

//       script.onload = () => {
//         try {
//           if (window.DfMessenger) {
//             window.DfMessenger.setOptions({
//               projectId: "plated-axon-440713-d1", // Replace with your Dialogflow project ID
//               agentId: "14115f0d-46f2-4212-a897-0c7e8bf19698", // Replace with your Dialogflow agent ID
//               languageCode: "en", // Language code
//             });
//           } else {
//             console.error("Dialogflow Messenger is not available.");
//           }
//         } catch (error) {
//           console.error("Error initializing Dialogflow Messenger: ", error);
//         }
//       };

//       document.body.appendChild(script);
//     };

//     // Wait until the component mounts before loading the script
//     loadScript();

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       const scriptTag = document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"]');
//       if (scriptTag) {
//         scriptTag.remove();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"></link>
//       <df-messenger
//         project-id="plated-axon-440713-d1"
//         agent-id="14115f0d-46f2-4212-a897-0c7e8bf19698"
//         language-code="en"
//         max-query-length="-1"
//       >
//         <df-messenger-chat-bubble chat-title="Opfact" />
//       </df-messenger>
//     </div>
//   );
// };

// export default Chatbot;
