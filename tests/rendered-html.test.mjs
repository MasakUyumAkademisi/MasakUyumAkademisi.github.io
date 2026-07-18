import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the MASAK prep shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MASAK Sınav Hazırlık<\/title>/i);
  assert.match(html, /Ders anlatımı ve açıklamalı soru çözüm kokpiti/);
  assert.match(html, /Bugünkü Plan/);
  assert.match(html, /Sınavda sorulur/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /apple-touch-icon/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps PWA assets and source attribution available", async () => {
  const [manifest, serviceWorker, page, layout, component] = await Promise.all([
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/MasakPrepApp.tsx", import.meta.url), "utf8"),
  ]);

  const parsedManifest = JSON.parse(manifest);
  assert.equal(parsedManifest.display, "standalone");
  assert.equal(parsedManifest.start_url, "/");
  assert.equal(parsedManifest.icons[0].src, "/app-icon.svg");
  assert.match(serviceWorker, /CACHE_NAME = "masak-prep-v1"/);
  assert.match(serviceWorker, /offline\.html/);
  assert.match(page, /<MasakPrepApp \/>/);
  assert.match(layout, /lang="tr"/);
  assert.match(component, /localStorage/);
  assert.match(component, /mufettis\.org\/category\/masak-uyum-gorevlisi-yetkilendirme-ders-notlari/);
  assert.doesNotMatch(component, /SkeletonPreview|codex-preview/);
});
