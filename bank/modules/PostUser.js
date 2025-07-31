const BASE_URL = "https://us-central1-arenabank-3a693.cloudfunctions.net/api";

export async function PostUser({ username, email }) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    return data; // contains message + userId
  } catch (error) {
    console.error("createUser error:", error.message);
    throw error;
  }
}
