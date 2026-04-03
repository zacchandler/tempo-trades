/** Returns the Next.js basePath so raw <img> src attributes resolve correctly on subpath deploys. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default basePath;
