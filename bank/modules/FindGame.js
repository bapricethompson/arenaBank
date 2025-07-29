const BASE_URL = "http://127.0.0.1:5001/arenabank-3a693/us-central1/api";
export async function FindGame({ gameCode }) {
  try {
    console.log("here2", BASE_URL);
    const response = await fetch(`${BASE_URL}/games/code/${gameCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return data; // contains message + userId
  } catch (error) {
    console.error("find game by code error:", error.message);
    throw error;
  }
}
