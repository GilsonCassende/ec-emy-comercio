import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
};

function ensureMeta(selector: string, createAttrs: Record<string, string>) {
  const element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (element) {
    return element;
  }

  const tagName = selector.startsWith("link") ? "link" : "meta";
  const created = document.createElement(tagName);
  Object.entries(createAttrs).forEach(([key, value]) => created.setAttribute(key, value));
  document.head.appendChild(created);
  return created;
}

export function useSeo({ title, description, canonicalPath, image }: SeoOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription =
      document.head.querySelector('meta[name="description"]')?.getAttribute("content");
    const previousCanonical = document.head
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href");
    const previousOgTitle =
      document.head.querySelector('meta[property="og:title"]')?.getAttribute("content");
    const previousOgDescription = document.head
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content");
    const previousOgImage =
      document.head.querySelector('meta[property="og:image"]')?.getAttribute("content");
    const previousTwitterTitle = document.head
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content");
    const previousTwitterDescription = document.head
      .querySelector('meta[name="twitter:description"]')
      ?.getAttribute("content");
    const previousTwitterImage = document.head
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content");
    const hadCanonical = Boolean(document.head.querySelector('link[rel="canonical"]'));
    const previousOgUrl =
      document.head.querySelector('meta[property="og:url"]')?.getAttribute("content");

    document.title = title;

    const descriptionMeta = ensureMeta('meta[name="description"]', { name: "description" });
    descriptionMeta.setAttribute("content", description);

    const ogTitleMeta = ensureMeta('meta[property="og:title"]', { property: "og:title" });
    ogTitleMeta.setAttribute("content", title);

    const ogDescriptionMeta = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    });
    ogDescriptionMeta.setAttribute("content", description);

    const twitterTitleMeta = ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" });
    twitterTitleMeta.setAttribute("content", title);

    const twitterDescriptionMeta = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    });
    twitterDescriptionMeta.setAttribute("content", description);

    if (image) {
      const ogImageMeta = ensureMeta('meta[property="og:image"]', { property: "og:image" });
      ogImageMeta.setAttribute("content", image);

      const twitterImageMeta = ensureMeta('meta[name="twitter:image"]', { name: "twitter:image" });
      twitterImageMeta.setAttribute("content", image);
    }

    if (canonicalPath) {
      const canonicalLink = ensureMeta('link[rel="canonical"]', { rel: "canonical", href: canonicalPath });
      canonicalLink.setAttribute("href", canonicalPath);

      const ogUrlMeta = ensureMeta('meta[property="og:url"]', { property: "og:url" });
      ogUrlMeta.setAttribute("content", canonicalPath);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription != null) {
        descriptionMeta.setAttribute("content", previousDescription);
      }
      if (previousCanonical != null) {
        const canonicalLink = document.head.querySelector('link[rel="canonical"]');
        canonicalLink?.setAttribute("href", previousCanonical);
      } else if (hadCanonical) {
        document.head.querySelector('link[rel="canonical"]')?.remove();
      }
      if (previousOgTitle != null) {
        ogTitleMeta.setAttribute("content", previousOgTitle);
      }
      if (previousOgDescription != null) {
        ogDescriptionMeta.setAttribute("content", previousOgDescription);
      }
      if (previousOgImage != null) {
        const ogImageMeta = document.head.querySelector('meta[property="og:image"]');
        ogImageMeta?.setAttribute("content", previousOgImage);
      }
      if (previousTwitterTitle != null) {
        twitterTitleMeta.setAttribute("content", previousTwitterTitle);
      }
      if (previousTwitterDescription != null) {
        twitterDescriptionMeta.setAttribute("content", previousTwitterDescription);
      }
      if (previousTwitterImage != null) {
        const twitterImageMeta = document.head.querySelector('meta[name="twitter:image"]');
        twitterImageMeta?.setAttribute("content", previousTwitterImage);
      }
      const ogUrlMeta = document.head.querySelector('meta[property="og:url"]');
      if (previousCanonical != null) {
        if (previousOgUrl != null) {
          ogUrlMeta?.setAttribute("content", previousOgUrl);
        } else {
          ogUrlMeta?.remove();
        }
      } else if (previousOgUrl != null) {
        ogUrlMeta?.setAttribute("content", previousOgUrl);
      } else {
        ogUrlMeta?.remove();
      }
    };
  }, [canonicalPath, description, image, title]);
}
