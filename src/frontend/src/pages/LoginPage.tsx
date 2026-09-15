import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate("/", { replace: true });
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-auth px-4 py-12">
      <div className="mb-8 animate-logo-in">
        <Logo size="lg" />
      </div>

      <div className="w-full max-w-sm animate-form-in">
        <div className="rounded-2xl bg-card p-8 shadow-form">
          <h1 className="mb-1 text-center font-display text-2xl font-bold tracking-tight text-foreground">
            Masuk ke Akun
          </h1>
          <p className="mb-6 text-center text-sm text-foreground/50">
            Silakan masuk untuk mulai mencatat foto
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label-field">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@fotodata.id"
                required
                className="input-field"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-field">Kata Sandi</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 border-t border-muted pt-4">
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-foreground/40">
              Akun Demo
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemo("andi@fotodata.id", "andi123")}
                className="flex w-full items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-left transition-all hover:bg-muted"
              >
                <span className="text-sm font-semibold text-foreground">Andi Pratama</span>
                <span className="font-mono text-xs text-foreground/40">andi@fotodata.id</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo("budi@fotodata.id", "budi123")}
                className="flex w-full items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-left transition-all hover:bg-muted"
              >
                <span className="text-sm font-semibold text-foreground">Budi Santoso</span>
                <span className="font-mono text-xs text-foreground/40">budi@fotodata.id</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo("citra@fotodata.id", "citra123")}
                className="flex w-full items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-left transition-all hover:bg-muted"
              >
                <span className="text-sm font-semibold text-foreground">Citra Lestari</span>
                <span className="font-mono text-xs text-foreground/40">citra@fotodata.id</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
