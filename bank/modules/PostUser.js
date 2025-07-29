// api/userService.js

const BASE_URL = "http://127.0.0.1:5001/arenabank-3a693/us-central1/api";

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
