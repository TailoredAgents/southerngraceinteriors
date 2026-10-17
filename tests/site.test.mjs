import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const routes = ["app/page.tsx", "app/shop/page.tsx", "app/cart/page.tsx", "app/design-services/page.tsx", "app/portfolio/page.tsx", "app/about/page.tsx", "app/journal/page.tsx", "app/contact/page.tsx"];

test("all primary routes exist", async () => {
  await Promise.all(routes.map((route) => access(new URL(route, root))));
});

test("catalog contains a complete assortment and fulfillment models", async () => {
  const source = await readFile(new URL("app/data/site.ts", root), "utf8");
  assert.ok((source.match(/id: "p\d+"/g) ?? []).length >= 18);
  for (const method of ["PARCEL", "FREIGHT", "LOCAL_DELIVERY", "QUOTE_REQUIRED"]) assert.match(source, new RegExp(method));
});

test("site indexing is launch-gated and checkout is intentionally disabled", async () => {
  const [seo, cart, robots] = await Promise.all([readFile(new URL("app/lib/seo.ts", root), "utf8"), readFile(new URL("app/cart/CartPage.tsx", root), "utf8"), readFile(new URL("app/robots.ts", root), "utf8")]);
  assert.match(seo, /SITE_INDEXABLE === "true"/);
  assert.match(robots, /siteIndexable/);
  assert.match(cart, /Online ordering is coming soon/);
  assert.doesNotMatch(cart, /credit.card|card number|CVV/i);
});

test("sitemap includes collection pages and uses stable content dates", async () => {
  const sitemap = await readFile(new URL("app/sitemap.ts", root), "utf8");
  assert.match(sitemap, /collections\.map/);
  assert.match(sitemap, /new Date\(entry\.date\)/);
  assert.doesNotMatch(sitemap, /lastModified: new Date\(\)/);
});
