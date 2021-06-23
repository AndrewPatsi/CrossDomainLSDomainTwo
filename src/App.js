import './App.css';

function App() {
  //document.domain = "gatsbyjs.io";
  function receiveMessage (e) {
      if (e.origin !== "http://crossdomainlsdomainonemain.gatsbyjs.io" && e.origin !== "https://crossdomainlsdomainonemain.gatsbyjs.io") {
          return;
      }

      const parent = window.parent;
      const payload = JSON.parse(e.data);
      const message = {response:"", callback:""};
      switch(payload.method) {
          case 'set':
              localStorage.setItem(payload.key, payload.value);
              message.response = "writen => " + payload.key + ": " + payload.value;
              break;
          case 'get':
              const data = localStorage.getItem(payload.key);
              message.response = data;
              break;
          case 'remove':
              localStorage.removeItem(payload.key);
              message.response = "removed => " + payload.key;
              break;
          default:
              console.log('default task switched with method: ', payload.method);
              break;
      }

      if (message.response === "null") {
        message.response = "something goes wrong while using " + payload.method + "method. The key provided does not exist.";
      } else if (!!payload.callback && typeof(payload.callback) == "string") {
        message.callback = payload.callback;
      }
        
      parent.postMessage(JSON.stringify(message), "*");
  };

  window.addEventListener("message", receiveMessage, false);

  return (
    <div className="App">
      <h1>Domain.two iframe</h1>
      <p>The X-Frame-Options must be unset on this server</p>
      <a
          className="App-link"
          href="https://crossdomainlsdomainonemain.gatsbyjs.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Domain.one
        </a>
    </div>
  );
}

export default App;
