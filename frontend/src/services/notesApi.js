const API_BASE = import.meta.env.VITE_API_URL || "";

export async function createNoteApi({ userId, note }) {
  const response = await fetch(`${API_BASE}/api/v1/notes/create_note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, note }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || "Failed to create note on server");
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getNotesByUserIdApi(userId) {
  const response = await fetch(
    `${API_BASE}/api/v1/notes/get_notes?userId=${encodeURIComponent(userId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 404 || response.status === 503) {
      return { data: [], offline: response.status === 503 };
    }
    throw new Error(data?.message || "Failed to fetch notes from server");
  }

  return data;
}

export async function getNoteByIdApi(noteId) {
  const response = await fetch(
    `${API_BASE}/api/v1/notes/get_note?noteId=${encodeURIComponent(noteId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch note by ID");
  }

  return data;
}

export async function deleteNoteApi(noteId) {
  const response = await fetch(`${API_BASE}/api/v1/notes/delete_note`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noteId }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete note on server");
  }

  return data;
}
