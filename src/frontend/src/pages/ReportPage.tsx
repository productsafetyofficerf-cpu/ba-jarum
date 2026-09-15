import { useEffect, useState } from "react";
import { supabase, type Photo } from "../lib/supabase";
import { useAuth } from "../lib/auth";

const MONTHS = [
  { value: 0, label: "Januari" },
  { value: 1, label: "Februari" },
  { value: 2, label: "Maret" },
  { value: 3, label: "April" },
  { value: 4, label: "Mei" },
  { value: 5, label: "Juni" },
  { value: 6, label: "Juli" },
  { value: 7, label: "Agustus" },
  { value: 8, label: "September" },
  { value: 9, label: "Oktober" },
  { value: 10, label: "November" },
  { value: 11, label: "Desember" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function ReportPage() {
  const { user, profile } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  const fetchReport = async () => {
    if (!user) return;
    setLoading(true);
    const startDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-01`;
    const endMonth = selectedMonth;
    const endDay = new Date(selectedYear, endMonth + 1, 0).getDate();
    const endDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`;

    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("user_id", user.id)
      .gte("photo_date", startDate)
      .lte("photo_date", endDate)
      .order("photo_date", { ascending: true });
    if (error) {
      console.error("Failed to fetch report:", error.message);
    } else {
      setPhotos((data as Photo[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
  }, [user, selectedMonth, selectedYear]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const monthLabel = MONTHS[selectedMonth].label;
  const years = [CURRENT_YEAR - 1, CURRENT_YEAR];

  return (
    <div className="space-y-6">
      <div className="no-print">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Laporan Foto
        </h1>
        <p className="mt-1 text-sm text-foreground/50">
          Pilih bulan dan tahun untuk melihat laporan foto
        </p>
      </div>

      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-end">
        <div>
          <label htmlFor="month" className="label-field">Bulan</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="input-field min-w-[160px] cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="label-field">Tahun</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="input-field min-w-[100px] cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
          </svg>
          Cetak Laporan
        </button>
      </div>

      <div className="rounded-2xl bg-muted/50 px-5 py-4 no-print">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="label-field mb-0">Pengguna</span>
            <span className="text-sm font-semibold text-foreground">{profile?.display_name ?? profile?.username ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-field mb-0">Periode</span>
            <span className="font-mono text-sm font-semibold text-foreground">{monthLabel} {selectedYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-field mb-0">Jumlah Foto</span>
            <span className="rounded-full bg-accent/20 px-3 py-0.5 font-mono text-sm font-semibold text-accent-dark">
              {loading ? "..." : photos.length}
            </span>
          </div>
        </div>
      </div>

      {/* Print header */}
      <div className="hidden print-block">
        <h1 className="text-2xl font-bold">Laporan Foto — {monthLabel} {selectedYear}</h1>
        <p className="text-sm">Pengguna: {profile?.display_name ?? profile?.username ?? "—"}</p>
        <p className="text-sm">Total Foto: {photos.length}</p>
        <hr className="my-4" />
      </div>

      {loading ? (
        <div className="py-20 text-center no-print">
          <p className="font-mono text-sm text-foreground/40">Memuat laporan...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="py-20 text-center no-print">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
          <p className="text-sm text-foreground/50">
            Tidak ada foto pada {monthLabel} {selectedYear}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="card-surface flex flex-col gap-4 p-4 sm:flex-row animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="sm:w-40 sm:flex-shrink-0">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={photo.image_url}
                    alt={photo.caption ?? "Foto"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm font-semibold text-foreground">
                  {photo.caption ?? "Tanpa keterangan"}
                </p>
                <p className="mt-1 font-mono text-xs text-foreground/40">
                  {formatDate(photo.photo_date)}
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-end">
                <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs font-semibold text-foreground/60">
                  #{String(i + 1).padStart(3, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
