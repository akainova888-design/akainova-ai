async function generatePrompt() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  output.innerText = "Generating image...";

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();

  if (data.image) {
    output.innerHTML = `<img src="${data.image}" style="max-width:100%;border-radius:10px;">`;
  } else {
    output.innerText = "Error generating image";
  }
}
  
