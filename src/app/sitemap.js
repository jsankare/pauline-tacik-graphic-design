import clientPromise from "@/lib/mongodb";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) || "http://localhost:3000";

export default async function sitemap() {
  const now = new Date();

  // Static pages (monthly)
  const staticRoutes = [
    "",
    "/about",
    "/workshops",
    "/contact",
    "/legals",
    "/privacy-policy",
  ].map((path) => ({
    url: new URL(path, BASE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1.0 : 0.6,
  }));

  // Dynamic entries from DB (weekly)
  let dynamicRoutes = [];
  try {
    const client = await clientPromise;
    const db = client.db();

    const projects = await db
      .collection("projects")
      .find({}, { projection: { _id: 1, updatedAt: 1, createdAt: 1 } })
      .toArray();

    const workshops = await db
      .collection("workshops")
      .find({}, { projection: { _id: 1, updatedAt: 1, createdAt: 1 } })
      .toArray();

    const mapDoc = (doc, basePath) => ({
      url: new URL(`${basePath}/${doc._id.toString()}`, BASE_URL).toString(),
      lastModified: doc.updatedAt || doc.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    dynamicRoutes = [
      ...projects.map((p) => mapDoc(p, "/project")),
      ...workshops.map((w) => mapDoc(w, "/workshop")),
    ];
  } catch (e) {
    console.warn("sitemap: failed to load dynamic routes from DB", e);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
