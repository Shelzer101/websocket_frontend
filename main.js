function Connect() {
    var b_Text = document.getElementById("connect_button");

    let ws = new WebSocket("ws://dd06e998dffb.ngrok.io");
    
    ws.onopen = () => {
        let name = document.forms["message"].name.value;
        ws.send(`${name} has entered the chat!`);

        // this runs on successful connection
        // change Connect button to disconnect button here
        b_Text.innerHTML = "Disconnect";        
    }

    ws.onmessage = (mesg) => {
        // On receiving a message from the server
        console.log(`Message Received: ${mesg.data}`);
        let chatbox = document.getElementById("chatbox");
        let displayed_message = document.createElement("p");
        displayed_message.innerHTML = mesg.data;
        chatbox.appendChild(displayed_message);
    }

    ws.onclose = () => {
        let name = document.forms["message"].name;
        ws.send(`${name} has left the chat!`);
        b_Text.innerHTML = "Connect";        

        // This runs on disconnecting from the server
        // Change Disconnect button to connect here
    }

    ws.onerror = (e) => {
        console.log(e);
    }

    document.getElementById("send_button").addEventListener("click",
        () => {
            ws.send(document.getElementById("input_text").value);
        }
    )
}