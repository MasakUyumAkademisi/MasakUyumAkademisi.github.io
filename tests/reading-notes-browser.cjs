const { chromium } = require("playwright");
const assert = require("node:assert/strict");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:3003/");
    await page.getByRole("button", { name: "Okudum", exact: true }).click();
    await page.locator(".academic-chapter").first().waitFor();
    await page.evaluate(() => {
      const paragraphs = document.querySelectorAll(".academic-chapter p");
      const range = document.createRange();
      range.setStart(paragraphs[0].firstChild.firstChild, 0);
      range.setEnd(paragraphs[1].firstChild.firstChild, 30);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });
    const popup = page.getByRole("region", { name: "Vurgu ve not", exact: true });
    await popup.waitFor();
    assert.equal(await page.locator("dialog[open]").count(), 0);
    await page.getByLabel("Notun (isteğe bağlı)").fill("Analiz ile mahkeme hükmünü karıştırma.");
    await popup.scrollIntoViewIfNeeded();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: "/tmp/uyum-reading-note-mobile.png" });
    await page.getByRole("button", { name: "Vurgula ve kaydet", exact: true }).click();
    assert.equal(await page.locator(".academic-chapters mark").count(), 2);
    await page.reload();
    await page.locator(".academic-chapters mark").first().waitFor();
    await page.locator(".academic-chapters mark").first().click();
    assert.equal(await page.getByLabel("Notun (isteğe bağlı)").inputValue(), "Analiz ile mahkeme hükmünü karıştırma.");
    await page.getByLabel("Notun (isteğe bağlı)").fill("Güncellenmiş not");
    await page.getByRole("button", { name: "Notu kaydet", exact: true }).click();
    await page.locator(".academic-chapters mark").first().focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.getByLabel("Notun (isteğe bağlı)").inputValue(), "Güncellenmiş not");
    await page.keyboard.press("Escape");
    assert.equal(await popup.isVisible(), false);
    await page.locator(".academic-chapters mark").first().click();
    await page.getByRole("button", { name: "Vurguyu sil", exact: true }).click();
    assert.equal(await page.locator(".academic-chapters mark").count(), 0);
    await page.reload();
    await page.locator(".academic-chapter").first().waitFor();
    assert.equal(await page.locator(".academic-chapters mark").count(), 0);
    assert.deepEqual(errors, []);
    console.log("Multi-paragraph highlighting, notes, persistence, editing, keyboard, deletion and mobile passed");
  } finally { await browser.close(); }
})().catch((e) => { console.error(e); process.exitCode = 1; });
