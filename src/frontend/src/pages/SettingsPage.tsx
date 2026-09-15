import { useState } from "react";
import { useAuth } from "../lib/auth";

export function SettingsPage() {
  const { profile, updateUsername, updatePassword } = useAuth();
  const [username, setUsername] = useState(profile?.username ?? "");
  const [savingUsername, setSavingUsername] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === profile?.username) {
      setUsernameMsg({ type: "error", text: "Username baru tidak boleh sama dengan yang sekarang." });
      return;
    }
    setSavingUsername(true);
    setUsernameMsg(null);
    const { error } = await updateUsername(username);
    setSavingUsername(false);
    if (error) {
      setUsernameMsg({ type: "error", text: error });
    } else {
      setUsernameMsg({ type: "success", text: "Username berhasil diperbarui." });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Kata sandi minimal 6 karakter." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Konfirmasi kata sandi tidak cocok." });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    const { error } = await updatePassword(newPassword);
    setSavingPassword(false);
    if (error) {
      setPasswordMsg({ type: "error", text: error });
    } else {
      setPasswordMsg({ type: "success", text: "Kata sandi berhasil diperbarui." });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Pengaturan Akun
        </h1>
        <p className="mt-1 text-sm text-foreground/50">
          Ubah username dan kata sandi akun Anda
        </p>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-form animate-form-in">
        <h2 className="mb-1 font-display text-lg font-semibold tracking-tight">Ubah Username</h2>
        <p className="mb-4 text-sm text-foreground/50">
          Username saat ini: <span className="font-mono font-semibold text-foreground">{profile?.username ?? "—"}</span>
        </p>
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="label-field">Username Baru</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username_baru"
              required
              minLength={3}
              className="input-field"
            />
          </div>
          {usernameMsg && (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                usernameMsg.type === "success"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {usernameMsg.text}
            </div>
          )}
          <button type="submit" disabled={savingUsername} className="btn-primary w-full">
            {savingUsername ? "Menyimpan..." : "Simpan Username"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-form animate-form-in">
        <h2 className="mb-1 font-display text-lg font-semibold tracking-tight">Ubah Kata Sandi</h2>
        <p className="mb-4 text-sm text-foreground/50">
          Pastikan kata sandi baru minimal 6 karakter
        </p>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="label-field">Kata Sandi Baru</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label-field">Konfirmasi Kata Sandi</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="•••••••••"
              required
              minLength={6}
              className="input-field"
            />
          </div>
          {passwordMsg && (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                passwordMsg.type === "success"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {passwordMsg.text}
            </div>
          )}
          <button type="submit" disabled={savingPassword} className="btn-primary w-full">
            {savingPassword ? "Menyimpan..." : "Simpan Kata Sandi"}
          </button>
        </form>
      </div>
    </div>
  );
}
