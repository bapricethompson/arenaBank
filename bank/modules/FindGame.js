const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";
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
