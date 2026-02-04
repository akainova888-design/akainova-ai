import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: "square_hd"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ image: data.images[0].url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
