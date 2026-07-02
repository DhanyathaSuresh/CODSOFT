// ======================================================
// Dino AI Premium Chatbot
// script.js - Part 1
// ======================================================

// --------------------
// Get Elements
// --------------------

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

const sendBtn = document.getElementById("send-btn");
const emojiBtn = document.getElementById("emoji-btn");

const themeBtn = document.getElementById("theme-toggle");
const clearBtn = document.getElementById("clear-btn");

const typing = document.getElementById("typing");

// --------------------
// Get Current Time
// --------------------

function getTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// --------------------
// Create Chat Message
// --------------------

function createMessage(message, sender) {

    const wrapper = document.createElement("div");

    wrapper.className = sender + "-message";

    if (sender === "bot") {

        wrapper.innerHTML = `

        <div class="message-avatar">

            🤖

        </div>

        <div class="message-content">

            <h4>Dino AI</h4>

            <p>${message}</p>

            <span class="time">

                ${getTime()}

            </span>

        </div>

        `;

    }

    else {

        wrapper.innerHTML = `

        <div class="message-content">

            <p>${message}</p>

            <span class="time">

                ${getTime()}

            </span>

        </div>

        <div class="message-avatar">

            👤

        </div>

        `;

    }

    chatBox.appendChild(wrapper);

    chatBox.scrollTop = chatBox.scrollHeight;

}

// --------------------
// Typing Animation
// --------------------

function showTyping() {

    typing.style.display = "flex";

    chatBox.scrollTop = chatBox.scrollHeight;

}

function hideTyping() {

    typing.style.display = "none";

}

// --------------------
// Send Message
// --------------------

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    createMessage(message, "user");

    userInput.value = "";

    userInput.focus();

    showTyping();

    try {

        const response = await fetch("/get_response", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message

            })

        });

        const data = await response.json();

        setTimeout(() => {

            hideTyping();

            createMessage(data.response, "bot");

        }, 1000);

    }

    catch (error) {

        hideTyping();

        createMessage(

            "❌ Unable to connect to the server.",

            "bot"

        );

    }

}

// --------------------
// Events
// --------------------

sendBtn.addEventListener(

    "click",

    sendMessage

);

userInput.addEventListener(

    "keypress",

    function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    }

);

// ======================================================
// Dino AI Premium Chatbot
// script.js - Part 2
// ======================================================

// --------------------
// Load Saved Theme
// --------------------

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    const icon = themeBtn.querySelector("i");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        if (icon) {

            icon.className = "fa-solid fa-sun";

        }

    } else {

        document.body.classList.remove("light");

        if (icon) {

            icon.className = "fa-solid fa-moon";

        }

    }

    userInput.focus();

});

// --------------------
// Theme Toggle
// --------------------

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        if (icon) {

            icon.className = "fa-solid fa-sun";

        }

    } else {

        localStorage.setItem("theme", "dark");

        if (icon) {

            icon.className = "fa-solid fa-moon";

        }

    }

});

// --------------------
// Emoji Picker
// --------------------

const picker = new EmojiButton({

    position: "top-start",

    autoHide: true

});

emojiBtn.addEventListener("click", () => {

    picker.togglePicker(emojiBtn);

});

picker.on("emoji", emoji => {

    userInput.value += emoji;

    userInput.focus();

});

// --------------------
// Clear Chat
// --------------------

function clearChat() {

    chatBox.innerHTML = `

<div class="bot-message">

    <div class="message-avatar">

        🤖

    </div>

    <div class="message-content">

        <h4>Dino AI</h4>

        <p>

        👋 Chat cleared successfully.

        <br><br>

        Welcome back to <b>Dino AI</b>!

        <br><br>

        How can I help you today?

        </p>

        <span class="time">

        ${getTime()}

        </span>

    </div>

</div>

`;

}

clearBtn.addEventListener(

    "click",

    clearChat

);

// --------------------
// Auto Scroll
// --------------------

const observer = new MutationObserver(() => {

    chatBox.scrollTop = chatBox.scrollHeight;

});

observer.observe(chatBox, {

    childList: true,

    subtree: true

});

// --------------------
// Prevent Long Messages
// --------------------

userInput.addEventListener("input", () => {

    if (userInput.value.length > 500) {

        userInput.value = userInput.value.substring(0, 500);

    }

});

// --------------------
// Focus Input
// --------------------

chatBox.addEventListener("click", () => {

    userInput.focus();

});

// ======================================================
// Dino AI Premium Chatbot
// script.js - Part 3
// ======================================================

// --------------------
// Welcome Animation
// --------------------

window.addEventListener("load", () => {

    setTimeout(() => {

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 500);

});

// --------------------
// Keyboard Shortcuts
// --------------------

// Ctrl + Delete = Clear Chat

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "Delete") {

        clearChat();

    }

});

// ESC = Focus Input

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        userInput.focus();

    }

});

// --------------------
// Button Click Animation
// --------------------

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mousedown", () => {

        button.style.transform = "scale(.94)";

    });

    button.addEventListener("mouseup", () => {

        button.style.transform = "";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

// --------------------
// Smooth Auto Scroll
// --------------------

function scrollBottom() {

    chatBox.scrollTo({

        top: chatBox.scrollHeight,

        behavior: "smooth"

    });

}

setInterval(scrollBottom, 300);

// --------------------
// Dynamic Placeholder
// --------------------

const placeholders = [

    "Ask Dino AI anything...",

    "Need Python help? 🐍",

    "Ask about Flask 🚀",

    "Learn HTML & CSS 🌐",

    "Need JavaScript help? ⚡",

    "Ask today's date 📅",

    "What time is it? ⏰",

    "Need AI information? 🤖",

    "Ask me something interesting 😊"

];

let placeholderIndex = 0;

setInterval(() => {

    placeholderIndex++;

    if (placeholderIndex >= placeholders.length) {

        placeholderIndex = 0;

    }

    userInput.placeholder = placeholders[placeholderIndex];

}, 3500);

// --------------------
// Disable Right Click
// --------------------

document.addEventListener("contextmenu", (e) => {

    e.preventDefault();

});

// --------------------
// Console Message
// --------------------

console.log(

    "%c🦖 Dino AI Premium Loaded Successfully!",

    "color:#3b82f6;font-size:18px;font-weight:bold;"

);

// ======================================================
// End of Dino AI Premium
// ======================================================