const MVG_BASE = 'https://www.mvg.de/api/bgw-pt/v3';

export async function onRequestGet({ request }) {
  try {
    const url = new URL(request.url);
    const response = await fetch(`${MVG_BASE}/departures?${url.searchParams}`);
    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch departures' }, { status: 500 });
  }
}
