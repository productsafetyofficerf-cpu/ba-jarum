import { useEffect, useState } from "react";
import { supabase, type Photo } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export function GalleryPage() {
  const { user, profile } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPhotos = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("user_id", user.id)
      .order("photo_date", { ascending: false });
    if (error) {
      console.error("Failed to fetch photos:", error.message);
    } else {
      setPhotos((data as Photo[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [user]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAdding(true);
    setAddError(null);
    const { error } = await supabase.from("photos").insert({
      image_url: newUrl,
      caption: newCaption || null,
      photo_date: newDate,
    });
    setAdding(false);
    if (error) {
      setAddError(error.message);
      return;
    }
    setNewUrl("");
    setNewCaption("");
    setNewDate(new Date().toISOString().slice(0, 10));
    setShowAdd(false);
    fetchPhotos();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("photos").delete().eq("id", deleteId);
    if (error) {
      console.error("Delete failed:", error.message);
    }
    setDeleteId(null);
    fetchPhotos();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const photoCount = photos.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Galeri Foto
          </h1>
          <p className="mt-1 text-sm text-foreground/50">
            Selamat datang, {profile?.display_name ?? profile?.username ?? "Pengguna"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="btn-accent animate-shutter-pulse"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Tambah Foto
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="rounded-full bg-muted px-4 py-2">
          <span className="font-mono text-sm text-foreground/60">
            Total: <span className="font-semibold text-foreground">{photoCount}</span> foto
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <p className="font-mono text-sm text-foreground/40">Memuat foto...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/30">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <p className="text-sm text-foreground/50">Belum ada foto. Klik "Tambah Foto" untuk mulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="card-surface group overflow-hidden animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={photo.caption ?? "Foto"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => setDeleteId(photo.id)}
                  className="absolute right-2 top-2 rounded-lg bg-destructive/90 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Hapus foto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {photo.caption ?? "Tanpa keterangan"}
                </p>
                <p className="mt-2 font-mono text-xs text-foreground/40">
                  {formatDate(photo.photo_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 no-print" onClick={() => setShowAdd(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-card p-6 shadow-form animate-form-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 font-display text-xl font-bold tracking-tight">Tambah Foto Baru</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label htmlFor="url" className="label-field">URL Foto</label>
                <input
                  id="url"
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="caption" className="label-field">Keterangan</label>
                <input
                  id="caption"
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Deskripsi singkat..."
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="date" className="label-field">Tanggal Foto</label>
                <input
                  id="date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              {addError && (
                <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {addError}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="btn-ghost flex-1">
                  Batal
                </button>
                <button type="submit" disabled={adding} className="btn-accent flex-1">
                  {adding ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 no-print" onClick={() => setDeleteId(null)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-form animate-form-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 font-display text-lg font-bold tracking-tight">Hapus Foto?</h2>
            <p className="mb-4 text-sm text-foreground/50">Foto yang dihapus tidak dapat dikembalikan.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteId(null)} className="btn-ghost flex-1">
                Batal
              </button>
              <button type="button" onClick={handleDelete} className="btn-danger flex-1">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
