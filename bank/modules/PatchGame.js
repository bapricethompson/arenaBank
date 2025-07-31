const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";

export async function PatchGame({ gameId, inPlay, ended }) {
  try {
    // The body only needs the fields you're updating
    const body = { inPlay, ended };
    console.log("gameId", gameId, "inPlay", inPlay, "ended", ended);
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("data", data);

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return data;
  } catch (error) {
    // Renamed the console log for clarity
    console.error("Error in PatchGame function:", error);
    console.error("Error in PatchGame function:", error.message);
    throw error;
  }
}
