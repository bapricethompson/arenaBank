const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";
export async function PostPlayer({ gameId, userId }) {
  try {
    console.log(JSON.stringify({ gameId, userId }));
    console.log("I AM HERE", BASE_URL);
    const response = await fetch(`${BASE_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return data; // contains message + userId
  } catch (error) {
    console.error("createPlayer error:", error.message);
    throw error;
  }
}
