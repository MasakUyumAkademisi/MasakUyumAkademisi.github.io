"use client";
import { useEffect, useRef, useState } from "react";
import { setStorageOwner } from "./account-storage";

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
      else result = await client.current.auth[mode === "login" ? "signInWithPassword" : "signUp"]({ email, password });
      setPassword("");
      if (result.error) setMessage("İşlem tamamlanamadı. Bilgilerinizi, doğrulamanızı ve bağlantınızı kontrol edin.");
      else if (mode === "reset") setMessage("Hesap mevcutsa yenileme bağlantısı e-postanıza gönderilir.");
      else if (mode === "password") { setRecovery(false); setMessage("Şifre güncellendi."); }
      else if (mode === "logout") await load(null);
      else if (result.data.session) await load(result.data.session);
      else setMessage("E-posta doğrulamasını tamamlayıp giriş yapın.");
    } catch { setMessage("Bağlantı hatası. Daha sonra tekrar deneyin."); }
    finally { setBusy(false); }
  }
  return <>
    <button className="theme-toggle" onClick={() => setOpen(true)} type="button">{user ? "Hesabım ✓" : "Giriş"}</button>
    {open && <div className="account-backdrop"><section className="account-panel" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <h2 id="account-title">Uyum Akademisi</h2><p role="status">{message}</p>
      {(!user || recovery) && <form onSubmit={(event) => { event.preventDefault(); void action(recovery ? "password" : "login"); }}>
        {!recovery && <label>E-posta<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>}
        <label>Şifre<input type="password" autoComplete={recovery ? "new-password" : "current-password"} minLength={10} required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button disabled={busy} type="submit">{recovery ? "Şifreyi güncelle" : "Giriş yap"}</button>
        {!recovery && <><button disabled={busy || !email || password.length < 10} type="button" onClick={() => void action("signup")}>Kayıt ol</button><button disabled={busy || !email} type="button" onClick={() => void action("reset")}>Şifremi unuttum</button></>}
      </form>}
      {user && !recovery && <><button disabled={busy} onClick={() => void save()}>Eşitle</button><button disabled={busy} onClick={() => void action("logout")}>Çıkış yap</button></>}
      <p>Ders ve deneme kayıtları hesabınıza bağlıdır. Hafıza kayıtları bu cihazda, kullanıcıya özel tutulur. Misafir ilerlemesi otomatik aktarılmaz.</p>
      <button onClick={() => setOpen(false)} type="button">Kapat</button>
    </section></div>}
  </>;
}
