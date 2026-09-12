const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 140) + "px";
}

function handleKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function suggest(text) {
  messageInput.value = text;
  autoResize(messageInput);
  messageInput.focus();
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);

  div.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });
}

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }

  addMessage(text, "user");

  messageInput.value = "";
  autoResize(messageInput);

  setTimeout(() => {
    addMessage(
      "Hey! 👋 I'm Nova AI. I got your message! This demo is working 🔥",
      "ai"
    );
  }, 600);
}

function newChat() {
  chat.innerHTML = `
    <section class="welcome" id="welcome">
      <div class="welcome-icon">🤖</div>
      <h2>What can I help you with?</h2>
      <p>Ask me anything. I'm here to help you learn, create and explore.</p>

      <div class="suggestions">
        <button type="button" onclick="suggest('Explain something to me')">
          💡 Explain something
        </button>
        <button type="button" onclick="suggest('Help me write something')">
          ✍️ Help me write
        </button>
        <button type="button" onclick="suggest('Give me an idea')">
          🚀 Give me an idea
        </button>
      </div>
    </section>
  `;

  messageInput.value = "";
  autoResize(messageInput);
  messageInput.focus();
}
