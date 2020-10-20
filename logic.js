var ws = null;

function Connect() {
    var b_Text = document.getElementById("connect_button");

    ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
        let name = document.forms["login_form"].name.value;
        ws.send(`${name} has entered the chat!`);
        // this runs on successful connection
        // change Connect button to disconnect button here
        b_Text.innerHTML = "Disconnect";
        b_Text.setAttribute("onclick", "ws.close();");        
    }

    ws.onmessage = (mesg) => {
        // On receiving a message from the server
        let chat_box = document.getElementById("chat_box");
        let displayed_message = document.createElement("p");
        displayed_message.innerHTML = mesg.data;
        chat_box.appendChild(displayed_message);
        chat_box.scrollTop = chat_box.scrollHeight;
    }

    ws.onclose = () => {
        let name = document.forms["login_form"].name;
        ws.send(`${name} has left the chat!`);
        b_Text.innerHTML = "Connect";
        // Refresh the page
        // location.reload();
        document.getElementById("connect_button").setAttribute("onclick", "Connect();");
    }

    ws.onerror = (e) => {
        console.log(e);
    }

    document.getElementById("send_button").addEventListener("click",
        () => {
            // Getting the input element
            let message = document.getElementById("message");
            ws.send(message.value);
            // Clearing the text from the element after the message is sent
            message.value = "";
        }
    )
}