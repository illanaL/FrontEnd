// src/components/ui/Spinner/Spinner.tsx

export type SpinnerVariant =
  | "arc"
  | "dual"
  | "conic"
  | "dots"
  | "pulse"
  | "morph";
export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

// ─── Tailles ─────────────────────────────────────────────────────────────────
const sizes: Record<SpinnerSize, number> = {
  sm: 18,
  md: 28,
  lg: 44,
  xl: 60,
};

const borderWidths: Record<SpinnerSize, number> = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

// ─── Keyframes (injectés une seule fois) ─────────────────────────────────────
const KEYFRAMES_ID = "__soslock-spinner-kf__";

function injectKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;

  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes sl-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes sl-dot-bounce {
      0%, 80%, 100% { transform: translateY(0);   opacity: .6; }
      40%           { transform: translateY(-8px); opacity: 1;  }
    }
    @keyframes sl-pulse-ring {
      0%   { transform: scale(.5); opacity: 1; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes sl-morph {
      0%, 100% { border-radius: 50%;  transform: rotate(0deg)   scale(1);  }
      25%      { border-radius: 20%;  transform: rotate(90deg)  scale(.9); }
      50%      { border-radius: 50%;  transform: rotate(180deg) scale(1);  }
      75%      { border-radius: 20%;  transform: rotate(270deg) scale(.9); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Composant ───────────────────────────────────────────────────────────────
export function Spinner({
  variant = "arc",
  size = "md",
  label = "Chargement…",
  className = "",
}: SpinnerProps) {
  injectKeyframes();

  const px = sizes[size];
  const bw = borderWidths[size];

  const renderSpinner = (): React.ReactNode => {
    switch (variant) {
      case "arc":
        return (
          <span
            style={{
              display: "inline-block",
              width: px,
              height: px,
              borderRadius: "50%",
              border: `${bw}px solid var(--color-teal-200)`,
              borderTopColor: "var(--color-primary)",
              animation: "sl-spin .9s cubic-bezier(.5,.1,.5,1) infinite",
            }}
          />
        );

      case "dual":
        return (
          <span
            style={{
              display: "inline-block",
              width: px,
              height: px,
              borderRadius: "50%",
              border: `${bw}px solid var(--color-teal-200)`,
              borderTopColor: "var(--color-primary)",
              borderBottomColor: "var(--color-teal-500)",
              animation: "sl-spin .9s linear infinite",
            }}
          />
        );

      case "conic": {
        // conic-gradient ne supporte pas les var() oklch sur tous les navigateurs
        // → simulation avec une bordure multi-côtés tournante
        const inner = Math.round(px * 0.65);
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: px,
              height: px,
              borderRadius: "50%",
              border: `${bw}px solid var(--color-teal-200)`,
              borderTopColor: "var(--color-primary)",
              borderRightColor: "var(--color-teal-400)",
              animation: "sl-spin .9s linear infinite",
            }}
          >
            <span
              style={{
                width: inner,
                height: inner,
                borderRadius: "50%",
                background: "var(--color-bg)", // s'adapte au dark mode
                display: "block",
              }}
            />
          </span>
        );
      }

      case "dots": {
        const dot = Math.max(5, Math.round(px * 0.28));
        const gap = Math.max(3, Math.round(px * 0.18));
        const colors = [
          "var(--color-primary)",
          "var(--color-teal-500)",
          "var(--color-teal-300)",
        ];
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap,
              height: px,
            }}
          >
            {colors.map((color, i) => (
              <span
                key={i}
                style={{
                  width: dot,
                  height: dot,
                  borderRadius: "50%",
                  background: color,
                  display: "inline-block",
                  animation: "sl-dot-bounce .9s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </span>
        );
      }

      case "pulse": {
        const core = Math.round(px * 0.45);
        const offset = Math.round((px - core) / 2);
        return (
          <span
            style={{
              display: "inline-block",
              position: "relative",
              width: px,
              height: px,
            }}
          >
            {[
              { color: "var(--color-primary)", delay: "0s" },
              { color: "var(--color-teal-400)", delay: "0.7s" },
            ].map(({ color, delay }, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `2px solid ${color}`,
                  animation: "sl-pulse-ring 1.4s ease-out infinite",
                  animationDelay: delay,
                }}
              />
            ))}
            <span
              style={{
                position: "absolute",
                top: offset,
                left: offset,
                width: core,
                height: core,
                borderRadius: "50%",
                background: "var(--color-primary)",
              }}
            />
          </span>
        );
      }

      case "morph":
        return (
          <span
            style={{
              display: "inline-block",
              width: px,
              height: px,
              background: "var(--color-primary)",
              animation: "sl-morph 1.4s ease-in-out infinite",
            }}
          />
        );
    }
  };

  return (
    <span
      role="status"
      aria-label={label}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {renderSpinner()}
    </span>
  );
}
