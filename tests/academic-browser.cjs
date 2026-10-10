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
    assert.equal(await page.locator(".academic-chapter").count(), 7);
    assert.equal(await page.locator(".academic-case, .academic-sources").count(), 0);
    assert.ok(await page.getByRole("heading", { name: "Sınavda Çıkar", exact: true }).isVisible());
    await page.locator(".reading-nav select").selectOption("2");
    await page.waitForTimeout(1200);
    assert.equal(await page.evaluate(() => document.activeElement.id), "academic-masak-gorevleri-2");
    await page.reload();
    await page.waitForSelector(".reading-nav");
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
    assert.equal(await page.locator(".progress-sources details").count(), 14);
    assert.deepEqual(errors, []);
    console.log("Academic rendering, simplified UI, storage preservation, question flow and mobile widths passed");
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
