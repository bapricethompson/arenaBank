const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";

export async function PostGame({ hostId, groupSize, rounds, gameName }) {
  try {
    console.log(JSON.stringify({ hostId, groupSize, rounds, name: gameName }));
    console.log("I AM HERE", BASE_URL);
    const body = {
      hostId,
      groupSize: Number(groupSize), // convert string to number
      rounds: Number(rounds), // convert string to number
      name: gameName,
    };
    const response = await fetch(`${BASE_URL}/games`, {
      method: "POST",
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
    console.error("create game error PostGame:", error.message);
    throw error;
  }
}
