const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chatFeed = document.getElementById("chatFeed");

function addMessage(type, text) {
  const message = document.createElement("div");
  message.className = `message ${type}`;

  const name = document.createElement("div");
  name.className = "name";
  name.textContent = type === "user" ? "You" : "Nova";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  message.append(name, bubble);
  chatFeed.appendChild(message);
  chatFeed.scrollTop = chatFeed.scrollHeight;
  return bubble;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const novaBubble = addMessage("nova", "Thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Something went wrong.");

    novaBubble.textContent = data.reply;
    chatFeed.scrollTop = chatFeed.scrollHeight;
  } catch (error) {
    novaBubble.textContent = "Oops 😭 Something went wrong. Check the server.";
    console.error(error);
  }
});
