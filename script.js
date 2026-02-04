async function generatePrompt() {
  const input = document.getElementById("input").value;
  const type = document.getElementById("type").value;
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "Please enter a prompt first.";
    return;
  }

  output.innerHTML = "⏳ Generating image...";

  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input, type }),
    });

    const data = await res.json();
    console.log(data);

    if (data.image_url) {
      output.innerHTML = `
        <img src="${data.image_url}" 
             style="max-width:100%; border-radius:12px; margin-top:10px;" />
      `;
    } else if (data.prompt) {
      output.innerText = data.prompt;
    } else {
      output.innerText = "❌ No response from server.";
    }
  } catch (err) {
    console.error(err);
    output.innerText = "⚠️ Error connecting to server.";
  }
}
