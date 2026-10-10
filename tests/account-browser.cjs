const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage();
    await page.route("https://esm.sh/**", (route) => route.fulfill({ contentType: "application/javascript", body: `export function createClient(){return {auth:{getSession:async()=>({data:{session:null}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),signUp:async()=>({error:{code:"email_address_not_authorized"}}),signInWithPassword:async()=>({error:{code:"invalid_credentials"}}),resetPasswordForEmail:async()=>({})}}}` }));
    await page.goto("http://127.0.0.1:3003/");
    await page.getByRole("button", { name: "Giriş", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Hesap oluştur", exact: true }).click();
    await dialog.getByLabel("E-posta", { exact: true }).fill("test@example.com");
    await dialog.getByLabel("Şifre", { exact: true }).fill("Test-password-123");
    await dialog.locator('button[type="submit"]').click();
    await page.waitForTimeout(100);
    assert.match(await dialog.getByRole("status").textContent(), /SMTP/);
    await dialog.getByRole("button", { name: "Giriş yap", exact: true }).click();
    await dialog.getByLabel("Şifre", { exact: true }).fill("short");
    await dialog.locator('button[type="submit"]').click();
    await page.waitForTimeout(100);
    assert.match(await dialog.getByRole("status").textContent(), /E-posta veya şifre hatalı/);
    await dialog.getByRole("button", { name: "Şifremi unuttum" }).click();
    assert.equal(await dialog.getByLabel("Şifre", { exact: true }).count(), 0);
    await dialog.locator('button[type="submit"]').click();
    await page.waitForTimeout(100);
    assert.match(await dialog.getByRole("status").textContent(), /yenileme bağlantısı/);
    console.log("Signup, login errors and password reset passed with mocked auth; no account created.");
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
