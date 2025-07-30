const BASE_URL = "http://127.0.0.1:5001/arenabank-3a693/us-central1/api";

export async function PatchGame({ gameId, inPlay, ended }) {
  try {
    console.log(JSON.stringify({ gameId, inPlay, ended }));
    const body = {
      gameId,
      inPlay,
      ended,
    };
    const response = await fetch(`${BASE_URL}/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("create game error:", error.message);
    throw error;
  }
}
