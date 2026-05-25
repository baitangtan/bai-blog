export function DarkBgOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 block"
    >
      {/* ── Light mode ── */}
      <div className="absolute inset-0 block dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(138,43,226,0.35) 0%, rgba(138,43,226,0) 60%),
              radial-gradient(ellipse at 80% 50%, rgba(0,191,255,0.3) 0%, rgba(0,191,255,0) 70%),
              radial-gradient(ellipse at 50% 80%, rgba(50,205,50,0.2) 0%, rgba(50,205,50,0) 65%),
              linear-gradient(135deg, #ffffff 0%, #f8f4ff 100%)
            `,
            animation: "aurora-drift 25s infinite alternate ease-in-out",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 60px)`,
            animation: "grid-shift 20s linear infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.9) 100%)",
            animation: "aurora-pulse 8s infinite alternate",
          }}
        />
      </div>

      {/* ── Dark mode ── */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(138,43,226,0.8) 0%, rgba(138,43,226,0) 60%),
              radial-gradient(ellipse at 80% 50%, rgba(0,191,255,0.7) 0%, rgba(0,191,255,0) 70%),
              radial-gradient(ellipse at 50% 80%, rgba(50,205,50,0.6) 0%, rgba(50,205,50,0) 65%),
              linear-gradient(135deg, #000000 0%, #0a0520 100%)
            `,
            backgroundBlendMode: "overlay, screen, hard-light",
            animation: "aurora-drift 25s infinite alternate ease-in-out",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)`,
            animation: "grid-shift 20s linear infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 70%, rgba(10,5,32,0.9) 100%)",
            animation: "aurora-pulse 8s infinite alternate",
          }}
        />
      </div>
    </div>
  );
}
