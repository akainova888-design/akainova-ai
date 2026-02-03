function generatePrompt() {
  const input = document.getElementById("input").value.trim();
  const type = document.getElementById("type").value;
  const output = document.getElementById("output");

  if (!input) {
    output.textContent = "Please enter something.";
    return;
  }

  let prompt = "";

  if (type === "image") {
    prompt = `Ultra detailed, cinematic, 8k, photorealistic image of ${input}, dramatic lighting, sharp focus`;
  } 
  else if (type === "logo") {
    prompt = `Modern, minimal, vector logo design for ${input}, flat style, professional branding`;
  } 
  else if (type === "video") {
    prompt = `Cinematic video scene of ${input}, slow motion, dynamic lighting, high contrast`;
  } 
  else if (type === "story") {
    prompt = `Write a compelling short story about ${input} with emotional depth and strong characters.`;
  } 
  else if (type === "code") {
    prompt = `Write clean, optimized code for: ${input}. Include comments and best practices.`;
  }

  output.textContent = prompt;
}
