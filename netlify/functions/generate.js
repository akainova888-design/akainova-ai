export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt;

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No prompt provided" })
      };
    }

    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        image_size: "square_hd"
      })
    });

    const data = await response.json();
    console.log("FAL RAW:", data);

    const image =
      data?.images?.[0]?.url ||
      data?.data?.[0]?.url ||
      null;

    if (!image) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No image returned", raw: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ image_url: image })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
