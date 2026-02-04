function generatePrompt() {
  const input = document.getElementById("input").value.trim();
  const type = document.getElementById("type").value;
  const output = document.getElementById("output");

  if (!input) {
    output.innerText = "⚠️ Please enter something first.";
    return;
  }

  let prompt = "";

  if (type === "image") {
    prompt = `Ultra detailed, cinematic lighting, 8k resolution, highly realistic, ${input}, sharp focus, dramatic shadows, masterpiece, trending on ArtStation`;
  } 
  else if (type === "logo") {
    prompt = `Modern minimalist logo of ${input}, flat vector, clean lines, professional branding, dribbble style, white background`;
  } 
  else if (type === "video") {
    prompt = `Create a cinematic video scene of ${input}, slow motion, dramatic lighting, 4k quality, film grain, epic background music`;
  } 
  else if (type === "story") {
    prompt = `Write a short emotional story about ${input} with suspense, strong characters, and a powerful ending.`;
  } 
  else if (type === "code") {
    prompt = `Write clean and optimized code for: ${input}. Add comments and examples.`;
  }

  output.innerText = prompt;
}
