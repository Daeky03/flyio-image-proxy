export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");
    if (!targetUrl) {
      return new Response("Eksik url parametresi", { status: 400 });
    }
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "Referer": "https://optraco.top/",
          "Origin": "https://optraco.top/",
          "User-Agent": "Mozilla/5.0"
        }
      });
      if (!response.ok) {
        return new Response(`Resim alınamadı: ${response.status}`, { status: response.status });
      }
      return new Response(response.body, {
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
          "Cache-Control": "public, max-age=86400"
        }
      });
    } catch (error) {
      return new Response("Sunucu hatası", { status: 500 });
    }
  }
}
