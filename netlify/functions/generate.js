async function generatePrompt() {
  const input = document.getElementById("input").value;
  const type = document.getElementById("type").value;
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "⚠️ Please enter a prompt!";
    return;
  }

  output.innerText = "⏳ Generating image...";

  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input,
        type: type
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.image_url) {
      output.innerHTML = `
        <img src="${data.image_url}" style="max-width:100%;border-radius:12px;margin-top:10px;" />
      `;
    } else if (data.error) {
      output.innerText = "❌ " + data.error;
    } else {
      output.innerText = "❌ Unknown response.";
    }

  } catch (err) {
    console.error(err);
    output.innerText = "🚫 Network error.";
  }
}
