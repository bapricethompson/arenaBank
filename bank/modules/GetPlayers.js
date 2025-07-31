const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";

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
    console.error("create game error GetPlayers:", error.message);
    throw error;
  }
}
