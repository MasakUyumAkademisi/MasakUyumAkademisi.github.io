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

test("server-renders the MASAK v3 lesson shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MASAK Sınav Hazırlık<\/title>/i);
  assert.match(html, /Ana kaynak MASAK_Rehber_12-01-2026\.pdf/);
  assert.match(html, /Sınavda Çıkar/);
  assert.match(html, /Ana Anlatım/);
  assert.match(html, /Kritik Ayrımlar/);
  assert.match(html, /Örnek Olay/);
  assert.match(html, /Hızlı Tekrar/);
  assert.match(html, /Mini Test Hazırlığı/);
  assert.doesNotMatch(html, /Bugün/);
  assert.doesNotMatch(html, /<h2 class="section-title">Kaynaklar<\/h2>/);
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
  assert.match(component, /masak-prep-progress-v2/);
  assert.doesNotMatch(component, /SkeletonPreview|codex-preview/);
});

test("validates expanded lesson and question bank data", () => {
  const contentUrl = new URL("../app/content.ts", import.meta.url);
  return readFile(contentUrl, "utf8").then((content) => {
    assert.match(content, /questionCount:\s*50/);
    assert.match(content, /durationMinutes:\s*45/);
    assert.match(content, /passPerModule:\s*50/);
    assert.match(content, /averagePass:\s*65/);
    assert.match(content, /legislationCheckedAt:\s*"18 Temmuz 2026"/);
    assert.match(content, /spl\.com\.tr\/wp-content\/uploads\/2025\/12\/MASAK-Uyum-Gorevlisi-Yetkilendirme-Sinavi-Kilavuzu\.pdf/);
    assert.match(content, /masak\.hmb\.gov\.tr\/yukumlulukler/);
    assert.match(content, /kitap-modül1ve2\.docx/);
    assert.match(content, /Masak 500 Soru Çalışması Soru Cevap\.pdf/);
    assert.match(content, /lessonContentById:\s*Record<string,\s*LessonContent>/);
    assert.match(content, /pdfRange:/);
    assert.match(content, /mustKnow:/);
    assert.match(content, /confusions:/);
    assert.match(content, /legalAnchors:/);
    assert.match(content, /reviewCards:/);

    const lessonContentEntries = [...content.matchAll(/pdfRange:\s*"MASAK_Rehber/g)];
    assert.equal(lessonContentEntries.length, 14);
    assert.ok([...content.matchAll(/priority:\s*"high"/g)].length >= 5);

    const lessonBlocks = [...content.matchAll(/moduleId:\s*"(mod[12])"[\s\S]*?bankQuestionCount:\s*(\d+)/g)];
    const mod1 = lessonBlocks.filter((match) => match[1] === "mod1");
    const mod2 = lessonBlocks.filter((match) => match[1] === "mod2");
    assert.equal(mod1.length, 9);
    assert.equal(mod2.length, 5);
    assert.equal(mod1.reduce((sum, match) => sum + Number(match[2]), 0), 60);
    assert.equal(mod2.reduce((sum, match) => sum + Number(match[2]), 0), 60);
    assert.match(content, /options,\n\s*answer,/);
    assert.match(content, /trapNote:\s*lesson\.confusion/);
    assert.match(content, /sourceRef:\s*lesson\.sourceRef/);
  });
});
