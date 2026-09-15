export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { ring: "w-8 h-8", inner: "w-3 h-3", text: "text-base" },
    md: { ring: "w-10 h-10", inner: "w-4 h-4", text: "text-lg" },
    lg: { ring: "w-16 h-16", inner: "w-6 h-6", text: "text-3xl" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${s.ring} animate-logo-in shadow-logo`}>
        <div className="absolute inset-0 rounded-full bg-primary" />
        <div className={`absolute inset-0 rounded-full border-2 border-accent animate-shutter-spin`} style={{ animationDuration: "12s" }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${s.inner} rounded-full bg-accent`} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-tight ${s.text} text-foreground`}>
          FotoData
        </span>
        {size !== "sm" && (
          <span className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
            Product Safety Hium 3
          </span>
        )}
      </div>
    </div>
  );
}
