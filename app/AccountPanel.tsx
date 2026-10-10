"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { setStorageOwner } from "./account-storage";

export function authErrorMessage(error: { code?: string; status?: number }): string {
  const messages: Record<string, string> = {
    invalid_credentials: "E-posta veya şifre hatalı.",
    email_not_confirmed: "Önce e-postanıza gelen doğrulama bağlantısını açın. Spam klasörünü de kontrol edin.",
    email_address_not_authorized: "E-posta servisi bu adrese gönderime izin vermiyor. Site yöneticisi SMTP ayarlarını tamamlamalı.",
    over_email_send_rate_limit: "E-posta gönderim sınırına ulaşıldı. Bir süre sonra tekrar deneyin.",
    over_request_rate_limit: "Çok fazla deneme yapıldı. Bir süre sonra tekrar deneyin.",
    signup_disabled: "Hesap oluşturma sunucu ayarlarında kapalı.",
    weak_password: "Şifreniz yeterince güçlü değil. En az 10 karakterli, harf ve rakam içeren bir şifre deneyin.",
    user_already_exists: "Bu hesap için giriş yapmayı veya şifre yenilemeyi deneyin.",
    email_address_invalid: "Geçerli bir e-posta adresi yazın.",
  };
  return messages[error.code ?? ""] ?? (error.status === 429 ? messages.over_request_rate_limit : `Hesap işlemi tamamlanamadı. Hata kodu: ${error.code ?? error.status ?? "bağlantı"}.`);
}

type Client = {
  auth: {
    getSession(): Promise<any>;
    signInWithPassword(input: object): Promise<any>;
    signUp(input: object): Promise<any>;
    resetPasswordForEmail(email: string, input: object): Promise<any>;
    updateUser(input: object): Promise<any>;
    signOut(): Promise<any>;
    onAuthStateChange(callback: (event: string, session: any) => void): { data: { subscription: { unsubscribe(): void } } };
  };
  from(table: string): any;
};

export default function AccountPanel({ progress, empty, onLoad }: { progress: object; empty: object; onLoad: (value: any, owner: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState("Hesap bağlantısı yükleniyor.");
  const [busy, setBusy] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [formMode, setFormMode] = useState<"login" | "signup" | "reset">("login");
  const [connected, setConnected] = useState(false);
  const client = useRef<Client | null>(null);
  const owner = useRef<string | null>(null);
  const ready = useRef(false);
  const current = useRef(progress);
  const guest = useRef(progress);
  const change = useRef(onLoad);
  const queue = useRef(Promise.resolve());
  current.current = progress; change.current = onLoad;
  if (!owner.current) guest.current = progress;

  async function load(session: any) {
    ready.current = false;
    const id = session?.user?.id ?? null;
    owner.current = id; setUser(id); setStorageOwner(id);
    change.current(id ? empty : guest.current, id);
    if (!id) { setMessage("Misafir olarak çalışıyorsunuz."); return; }
    setMessage("Hesap ilerlemesi yükleniyor.");
    const { data, error } = await client.current!.from("study_progress").select("data").eq("user_id", id).maybeSingle();
    if (owner.current !== id) return;
    if (error) { setMessage("İlerleme yüklenemedi. Uzak kayıt değiştirilmedi; yeniden giriş yapın."); return; }
    const main = data?.data?.main;
    change.current(main && main.version === 2 ? { ...empty, ...main } : empty, id);
    ready.current = true;
    setMessage("Hesabınız açık. Ders ve deneme ilerlemesi eşitlenir.");
  }
  async function save() {
    const id = owner.current;
    if (!id || !ready.current || !client.current) return;
    const snapshot = structuredClone(current.current);
    queue.current = queue.current.catch(() => undefined).then(async () => {
      if (owner.current !== id || !ready.current) return;
      const { data, error: readError } = await client.current!.from("study_progress").select("data").eq("user_id", id).maybeSingle();
      if (readError || owner.current !== id) { setMessage("Eşitleme yapılamadı; yeniden deneyin."); return; }
      const { error } = await client.current!.from("study_progress").upsert({ user_id: id, data: { ...data?.data, main: snapshot }, updated_at: new Date().toISOString() });
      if (owner.current === id) setMessage(error ? "Eşitlenemedi; cihaz kaydı korundu." : "İlerleme eşitlendi.");
    });
    await queue.current;
  }
  useEffect(() => {
    const timer = setTimeout(() => { if (ready.current) void save(); }, 700);
    return () => clearTimeout(timer);
    // The snapshot is read only when progress changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);
  useEffect(() => {
    let disposed = false;
    let subscription: { unsubscribe(): void } | undefined;
    async function init() {
      const url = "https://esm.sh/@supabase/supabase-js@2.57.4";
      const sdk = await import(/* @vite-ignore */ url);
      if (disposed) return;
      client.current = sdk.createClient("https://ohjukulpqsrmdcomqolw.supabase.co", "sb_publishable_rtSsgTeP7h4aRFWaDXhl-A_j_eUbtxn");
      setConnected(true);
      subscription = client.current!.auth.onAuthStateChange((event, session) => {
        if (event === "PASSWORD_RECOVERY") { setRecovery(true); setOpen(true); }
        if (event === "SIGNED_OUT") void load(null);
        if (event === "SIGNED_IN" && session?.user?.id !== owner.current) setTimeout(() => void load(session), 0);
      }).data.subscription;
      const { data, error } = await client.current!.auth.getSession();
      if (error) throw error;
      if (!disposed) await load(data.session);
    }
    void init().catch(() => setMessage("Hesap hizmetine ulaşılamadı. Misafir çalışma kullanılabilir."));
    return () => { disposed = true; subscription?.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function action(mode: "login" | "signup" | "reset" | "logout" | "password") {
    if (busy || !client.current) return;
    setBusy(true);
    try {
      let result;
      if (mode === "logout") result = await client.current.auth.signOut();
      else if (mode === "reset") result = await client.current.auth.resetPasswordForEmail(email, { redirectTo: location.href.split("#")[0] });
      else if (mode === "password") result = await client.current.auth.updateUser({ password });
      else if (mode === "signup") result = await client.current.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: location.origin + location.pathname } });
      else result = await client.current.auth.signInWithPassword({ email: email.trim(), password });
      setPassword("");
      if (result.error) setMessage(authErrorMessage(result.error));
      else if (mode === "reset") setMessage("Hesap mevcutsa yenileme bağlantısı e-postanıza gönderilir.");
      else if (mode === "password") { setRecovery(false); setMessage("Şifre güncellendi."); }
      else if (mode === "logout") await load(null);
      else if (result.data.session) await load(result.data.session);
      else setMessage("E-postanıza gelen doğrulama bağlantısını açın, ardından giriş yapın. Spam klasörünü de kontrol edin.");
    } catch { setMessage("Bağlantı hatası. Daha sonra tekrar deneyin."); }
    finally { setBusy(false); }
  }
  return <>
    <button className="theme-toggle" onClick={() => setOpen(true)} type="button">{user ? "Hesabım ✓" : "Giriş"}</button>
    {open && createPortal(<div className="account-backdrop"><section className="account-panel" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <h2 id="account-title">Uyum Akademisi</h2><p role="status">{message}</p>
      {!user && !recovery && <div className="account-modes" role="group" aria-label="Hesap işlemi">
        <button type="button" aria-pressed={formMode === "login"} onClick={() => setFormMode("login")}>Giriş yap</button>
        <button type="button" aria-pressed={formMode === "signup"} onClick={() => setFormMode("signup")}>Hesap oluştur</button>
      </div>}
      {(!user || recovery) && <form onSubmit={(event) => { event.preventDefault(); void action(recovery ? "password" : formMode); }}>
        {!recovery && <label>E-posta<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>}
        {formMode !== "reset" || recovery ? <label>Şifre<input type="password" autoComplete={recovery || formMode === "signup" ? "new-password" : "current-password"} minLength={recovery || formMode === "signup" ? 10 : undefined} required value={password} onChange={(e) => setPassword(e.target.value)} /></label> : null}
        {(formMode === "signup" || recovery) && <p>En az 10 karakter kullanın. Kayıt sonrası e-posta doğrulaması gerekir.</p>}
        <button disabled={busy || !connected} type="submit">{busy ? "İşlem yapılıyor…" : recovery ? "Şifreyi güncelle" : formMode === "signup" ? "Hesap oluştur" : formMode === "reset" ? "Yenileme bağlantısı gönder" : "Giriş yap"}</button>
        {!recovery && <button type="button" onClick={() => setFormMode(formMode === "reset" ? "login" : "reset")}>{formMode === "reset" ? "Girişe dön" : "Şifremi unuttum"}</button>}
      </form>}
      {user && !recovery && <><button disabled={busy} onClick={() => void save()}>Eşitle</button><button disabled={busy} onClick={() => void action("logout")}>Çıkış yap</button></>}
      <p>Ders ve deneme kayıtları hesabınıza bağlıdır. Misafir ilerlemesi otomatik aktarılmaz.</p>
      <button onClick={() => setOpen(false)} type="button">Kapat</button>
    </section></div>, document.body)}
  </>;
}
