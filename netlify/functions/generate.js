const https = require("https");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt;

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No prompt provided" })
      };
    }

    const data = JSON.stringify({
      prompt: prompt,
      image_size: "square_hd"
    });

    const options = {
      hostname: "fal.run",
      path: "/fal-ai/flux/schnell",
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => resolve(body));
      });
      req.on("error", reject);
      req.write(data);
      req.end();
    });

    const json = JSON.parse(response);

    return {
      statusCode: 200,
      body: JSON.stringify({ image_url: json.images[0].url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
