import NextImage, { type ImageProps } from "next/image";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

function resolveSiteImageSource(src: ImageProps["src"]): ImageProps["src"] {
  if (
    typeof src !== "string" ||
    !siteBasePath ||
    !src.startsWith("/") ||
    src === siteBasePath ||
    src.startsWith(`${siteBasePath}/`)
  ) {
    return src;
  }

  return `${siteBasePath}${src}`;
}

export default function SiteImage({ src, ...props }: ImageProps) {
  return <NextImage src={resolveSiteImageSource(src)} {...props} />;
}
