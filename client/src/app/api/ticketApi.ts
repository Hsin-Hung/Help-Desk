const server_url = process.env.SERVER_URL;

export async function createTicket(
  name: string,
  email: string,
  description: string
) {
  const response = await fetch(`${server_url}/ticket`, {
    method: "POST",
    body: JSON.stringify({ name, email, description }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function updateTicket(id: number, status: string) {
  const response = await fetch(`${server_url}/ticket/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function respondToTicket(id: number, responseText: string) {
  const response = await fetch(`${server_url}/ticket/${id}/response`, {
    method: "POST",
    body: JSON.stringify({ response: responseText }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function getTickets() {
  const response = await fetch(`${server_url}/tickets`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "reload",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function getTicket(id: number) {
  const response = await fetch(`${server_url}/ticket/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}
