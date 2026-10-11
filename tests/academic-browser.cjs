const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:3003/");
    await page.waitForSelector(".academic-chapter");
    assert.ok(await page.getByRole("dialog", { name: "Çerez ve Tarayıcı Depolaması", exact: true }).isVisible());
    await page.getByRole("button", { name: "Okudum", exact: true }).click();
    assert.equal(await page.locator(".academic-chapter").count(), 7);
    assert.equal(await page.locator(".academic-case, .academic-sources").count(), 0);
    assert.ok(await page.getByRole("heading", { name: "Sınavda Çıkar", exact: true }).isVisible());
    await page.locator(".reading-nav select").selectOption("2");
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => document.activeElement.id), "academic-masak-gorevleri-2");
    await page.reload();
    await page.waitForSelector(".reading-nav");
    assert.equal(await page.getByRole("dialog", { name: "Çerez ve Tarayıcı Depolaması", exact: true }).isVisible(), false);
    await page.getByRole("button", { name: "Kaldığın yer · 3", exact: true }).click();
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => document.activeElement.id), "academic-masak-gorevleri-2");
    assert.equal(await page.locator(".academic-recall-question").count(), 0);
    assert.equal(await page.getByRole("button", { name: "Hafıza", exact: true }).count(), 0);
    const saved = await page.evaluate(() => {
      const keys = ["masak-academic-recall-v1", "masak-prep-srs-v1"];
      return keys.map((key) => [key, localStorage.getItem(key)]);
    });
    await page.reload();
    await page.waitForSelector(".academic-chapter");
    assert.deepEqual(await page.evaluate((entries) => entries.map(([key]) => [key, localStorage.getItem(key)]), saved), saved);
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Overflow at ${width}`);
    }
    await page.screenshot({ path: "/tmp/masak-main-academic-mobile.png" });
    await page.getByRole("button", { name: /Soruları Çöz/ }).click();
    assert.ok(await page.locator(".study-question-card").isVisible());
    await page.getByRole("button", { name: /İlerleme/ }).click();
    assert.ok(await page.getByRole("heading", { name: "Kaynak ve Güncellik Kontrolü" }).isVisible());
    assert.equal(await page.locator(".progress-sources details").count(), 15);
    assert.equal(await page.getByRole("button", { name: "Giriş", exact: true }).count(), 0);
    await page.getByText("Çerez ve Tarayıcı Depolaması Bilgilendirmesi", { exact: true }).click();
    assert.ok(await page.getByText(/Bu sürümde hesap açma veya e-posta toplama/).isVisible());
    await page.getByRole("button", { name: "Şemalar", exact: true }).click();
    assert.equal(await page.locator("#schema-topic option").count(), 9);
    for (const module of ["Modül 1", "Modül 2"]) {
      await page.getByRole("button", { name: module, exact: true }).click();
      const topics = await page.locator("#schema-topic option").evaluateAll((options) => options.map((option) => option.value));
      for (const topic of topics) {
        await page.getByLabel("Konu", { exact: true }).selectOption(topic);
        await page.locator(".schema-infographic img").scrollIntoViewIfNeeded();
        await page.waitForFunction((id) => {
          const img = document.querySelector(".schema-infographic img");
          return img?.src.endsWith(`${id}-detayli-sema.jpg`) && img.complete && img.naturalWidth > 0;
        }, topic);
        assert.ok(await page.locator(".schema-infographic a").getAttribute("href"));
      }
    }
    await page.getByRole("button", { name: "Modül 1", exact: true }).click();
    await page.getByLabel("Konu", { exact: true }).selectOption("aklama");
    await page.locator(".schema-infographic img").waitFor();
    await page.locator(".schema-infographic img").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".schema-infographic img").naturalWidth > 0);
    await page.getByLabel("Konu", { exact: true }).selectOption("sib");
    await page.locator(".schema-infographic img").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".schema-infographic img").naturalWidth > 0);
    await page.getByRole("button", { name: "Modül 2", exact: true }).click();
    assert.equal(await page.locator("#schema-topic option").count(), 5);
    await page.getByLabel("Konu", { exact: true }).selectOption("musterinin-taninmasi");
    await page.locator(".schema-infographic img").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".schema-infographic img").naturalWidth > 0);
    for (const width of [320, 390, 1400]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    }
    await page.screenshot({ path: "/tmp/masak-schemas.png" });
    await page.getByRole("button", { name: "İlgili dersi aç" }).click();
    assert.ok(await page.locator(".study-lesson-card").isVisible());
    await page.getByRole("button", { name: "İlerleme", exact: true }).click();
    const beforeReset = await page.evaluate(() => ({ progress: localStorage.getItem("masak-prep-progress-v2"), theme: localStorage.getItem("masak-prep-theme"), notice: localStorage.getItem("masak-storage-notice-read-v1") }));
    page.once("dialog", (dialog) => dialog.dismiss());
    await page.getByRole("button", { name: "İlerlemeyi sıfırla", exact: true }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem("masak-prep-progress-v2")), beforeReset.progress);
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "İlerlemeyi sıfırla", exact: true }).click();
    await page.getByRole("status").filter({ hasText: "İlerleme sıfırlandı" }).waitFor();
    await page.reload();
    await page.waitForSelector(".academic-chapter");
    const reset = await page.evaluate(() => ({ progress: JSON.parse(localStorage.getItem("masak-prep-progress-v2")), reading: localStorage.getItem("masak-reading-position:masak-gorevleri"), theme: localStorage.getItem("masak-prep-theme"), notice: localStorage.getItem("masak-storage-notice-read-v1") }));
    assert.deepEqual(reset.progress.completedLessons, []);
    assert.deepEqual(reset.progress.answered, {});
    assert.deepEqual(reset.progress.examHistory, []);
    assert.equal(reset.reading, null);
    assert.equal(reset.theme, beforeReset.theme);
    assert.equal(reset.notice, beforeReset.notice);
    assert.deepEqual(errors, []);
    console.log("Academic rendering, simplified UI, storage preservation, question flow and mobile widths passed");
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
