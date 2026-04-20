import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FALLBACK_IMAGES: Record<string, string> = {
  suv: "https://images.unsplash.com/photo-PNyyffLvWIs?auto=format&fit=crop&w=800&q=80",
  berlina: "https://images.unsplash.com/photo-iaIeB11kyQE?auto=format&fit=crop&w=800&q=80",
  compacto: "https://images.unsplash.com/photo-tan0stkCqkc?auto=format&fit=crop&w=800&q=80",
  utilitario: "https://images.unsplash.com/photo-gCAjhHla5hg?auto=format&fit=crop&w=800&q=80",
  default: "https://images.unsplash.com/photo-fiEhVRWA5d0?auto=format&fit=crop&w=800&q=80",
};

interface WikiSummary {
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string; width: number; height: number };
  title?: string;
}

async function fetchWikipediaImage(query: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "AportucocheCom/1.0 (https://aportucoche.com)" },
    });
    if (!res.ok) return null;
    const data: WikiSummary = await res.json();
    const img = data.originalimage?.source || data.thumbnail?.source;
    if (!img) return null;
    if (img.includes("Flag_") || img.includes("Logo_") || img.includes("logo") || img.includes("icon") || img.includes("Icon")) return null;
    return img;
  } catch {
    return null;
  }
}

async function searchWikipediaImage(query: string): Promise<string | null> {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json&origin=*`;
  try {
    const res = await fetch(searchUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const results: Array<{ title: string }> = data?.query?.search ?? [];
    for (const result of results) {
      const img = await fetchWikipediaImage(result.title);
      if (img) return img;
    }
    return null;
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const brand = (url.searchParams.get("brand") ?? "").trim();
    const model = (url.searchParams.get("model") ?? "").trim();
    const bodyType = (url.searchParams.get("bodyType") ?? "default").trim();

    if (!brand) {
      return new Response(
        JSON.stringify({ error: "brand is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let imageUrl: string | null = null;

    if (brand && model) {
      imageUrl = await fetchWikipediaImage(`${brand} ${model}`);
      if (!imageUrl) {
        imageUrl = await fetchWikipediaImage(`${brand}_${model}`);
      }
      if (!imageUrl) {
        imageUrl = await searchWikipediaImage(`${brand} ${model} car`);
      }
    }

    if (!imageUrl && brand) {
      imageUrl = await fetchWikipediaImage(brand);
    }

    if (!imageUrl) {
      imageUrl = FALLBACK_IMAGES[bodyType] ?? FALLBACK_IMAGES.default;
    }

    return new Response(
      JSON.stringify({ imageUrl, brand, model, source: "wikipedia" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err), imageUrl: FALLBACK_IMAGES.default }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
