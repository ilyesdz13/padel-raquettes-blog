import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const CATEGORY_TAGS: Record<string, { label: string; color: string }> = {
  guide: { label: "GUIDE", color: "#7dd3fc" },
  comparatif: { label: "COMPARATIF", color: "#fca5a5" },
  article: { label: "ARTICLE", color: "#7dd3fc" },
};

export function renderArticleOgImage(title: string, category: string) {
  const tag = CATEGORY_TAGS[category] ?? CATEGORY_TAGS.article;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b1220 0%, #14210a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#d7f83a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "5px solid #14210a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#14210a" }} />
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>Sweet Spot</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2,
            color: tag.color,
            marginBottom: 20,
          }}
        >
          {tag.label}
        </div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 800, lineHeight: 1.2, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
