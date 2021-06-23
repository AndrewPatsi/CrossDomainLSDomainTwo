console.log('domain.two message listener started!');
// function receiveMessage(event) {

// 	let data = event.data
// 	let value;
  
// 	if (data.method === "set") {
// 		localStorage.setItem(data.key, data.value);
// 	} else if (event.data.method === "get") {
  
// 		value = localStorage.getItem(data.key);
// 		event.source.postMessage({
// 			"value": value
// 			,
// 		}, "*")
  
  
// 	} else if (event.data.method === "delete") {
// 		localStorage.removeItem(data.key)
// 	}
  
  
// }
  


document.domain = "gatsbyjs.io";
function receiveMessage (e) {
	console.log('message received in domainTwo from: ', e.origin);
    if (e.origin !== "https://domainone.gatsbyjs.io" && e.origin !== "https://domainone.gatsbyjs.io") {
        return;
    }
	console.log(e.source);
    var payload = JSON.parse(e.data);
    switch(payload.method) {
        case 'set':
            localStorage.setItem(payload.key, JSON.stringify(payload.data));
            break;
        case 'get':
            var parent = window.parent;
            var data = localStorage.getItem(payload.key);
            parent.postMessage(data, "*");
            break;
        case 'remove':
            localStorage.removeItem(payload.key);
            break;
        default:
            console.log('default task with method: ', payload.method);
            break;
    }
};

window.addEventListener("message", receiveMessage, false);
console.log('domain.two message listener started successfuly!');