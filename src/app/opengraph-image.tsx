import { ImageResponse } from 'next/og';

export const alt =
  'Eduardo de Sousa | European Industrial Operations, Direct Sourcing & Quality Advisory';
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
          backgroundColor: '#051C2C',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #0B2B44 2%, transparent 0%), radial-gradient(circle at 75px 75px, #071724 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          border: '12px solid #0B2B44',
          position: 'relative',
        }}
      >
        {/* Ambient Gradient Highlights */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0, 102, 204, 0.35) 0%, rgba(0, 102, 204, 0) 70%)',
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
            background:
              'radial-gradient(circle, rgba(22, 163, 74, 0.25) 0%, rgba(22, 163, 74, 0) 70%)',
          }}
        />

        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0066CC, #16A34A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '26px',
                fontWeight: 900,
                letterSpacing: '-1px',
              }}
            >
              ED
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                De Sousa Advisory
              </span>
              <span
                style={{
                  color: '#60A5FA',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Industrial Operations & Direct Sourcing
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              background: 'rgba(0, 102, 204, 0.2)',
              color: '#93C5FD',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            EUROPE // SPAIN · BENELUX · DACH
          </div>
        </div>

        {/* Central Proposition */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 10,
            marginTop: '15px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Eduardo de Sousa
          </h1>
          <p
            style={{
              fontSize: '27px',
              fontWeight: 700,
              color: '#38BDF8',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            European Industrial Operations, Direct Sourcing & Modular Systems
          </p>
          <p
            style={{
              fontSize: '19px',
              color: '#CBD5E1',
              maxWidth: '960px',
              lineHeight: 1.45,
              margin: '6px 0 0 0',
            }}
          >
            Factory-gate procurement (-75% cost desintermediation in Asia/LatAm), modular housing manufacturing scale (Almussafes / inHAUS), shop-floor assembly discipline, and Lean Six Sigma Black Belt quality rigor.
          </p>
        </div>

        {/* Bottom Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            paddingTop: '24px',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              'Direct Factory Sourcing (-75% BOM)',
              'Modular Systems & SCM',
              'High-Tech Assembly Discipline',
              'Lean Six Sigma Black Belt',
            ].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(11, 43, 68, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#E2E8F0',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          <div
            style={{
              color: '#94A3B8',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            desousaops.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
