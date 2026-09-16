import { ImageResponse } from 'next/og';

export const alt = 'Eduardo de Sousa | Staff Operations, Quality & High-Tech Process Leader';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#07090e',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0f172a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          border: '12px solid #0f172a',
          position: 'relative',
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)',
          }}
        />

        {/* Top Bar: Brand & Telemetry Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090e',
                fontSize: '24px',
                fontWeight: 900,
              }}
            >
              ED
            </div>
            <span
              style={{
                color: '#94a3b8',
                fontSize: '18px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Executive Portfolio
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              background: 'rgba(6, 182, 212, 0.1)',
              color: '#38bdf8',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            VERIFIED CREDENTIALS // ASML & TÜV
          </div>
        </div>

        {/* Middle Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 10,
            marginTop: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-1.5px',
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Eduardo de Sousa
          </h1>
          <p
            style={{
              fontSize: '28px',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #38bdf8, #34d399)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Staff Operations, Quality & High-Tech Process Leader
          </p>
          <p
            style={{
              fontSize: '20px',
              color: '#cbd5e1',
              maxWidth: '900px',
              lineHeight: 1.4,
              margin: '8px 0 0 0',
            }}
          >
            Operations leadership in high-tech cleanrooms, automotive manufacturing, and global factory auditing. Specialized in DMAIC Lean Six Sigma Black Belt methodology.
          </p>
        </div>

        {/* Bottom Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.15)',
            paddingTop: '28px',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '14px',
            }}
          >
            {['Lean Six Sigma Black Belt', 'ASML Cleanroom ISO 14644', 'ISO 9001 Lead Auditor', 'Automotive OEM Quality'].map(
              (badge) => (
                <div
                  key={badge}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#e2e8f0',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {badge}
                </div>
              )
            )}
          </div>

          <div
            style={{
              color: '#64748b',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            eduardodesousa.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
