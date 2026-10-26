/**
 * FlowGuard AI Production Theme & Design System
 * Defined by GPT-6 Production Bible & Production Directives
 */

export const THEME = {
  colors: {
    // Backgrounds & Base
    midnight: '#07121D',       // Deep space dark canvas
    darkNavy: '#0A1826',       // Secondary dark tone
    darkPanel: '#102539',      // Elevated glass card background
    panelBorder: 'rgba(26, 217, 209, 0.2)', // Subtle glowing border
    panelBorderMuted: 'rgba(136, 169, 182, 0.2)',

    // Accents & Typography
    cyan: '#1AD9D1',           // Primary tech brand accent
    cyanGlow: 'rgba(26, 217, 209, 0.4)',
    ice: '#E8FAF9',            // Crisp primary text
    muted: '#88A9B6',          // Secondary labels & citations
    subtle: '#4A697A',         // Tertiary borders / inactive elements

    // Semantic States (Strictly gated by authenticity rules)
    failure: '#F66E72',        // ONLY for genuine lab failures (VERIFIED_FAIL)
    failureGlow: 'rgba(246, 110, 114, 0.35)',
    pass: '#36C68B',           // ONLY for genuine verified passes (VERIFIED_PASS)
    passGlow: 'rgba(54, 198, 139, 0.35)',
    warning: '#F59E0B',        // For POTENTIAL risks & unverified findings
    warningGlow: 'rgba(245, 158, 11, 0.35)',
  },

  fonts: {
    primary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", Helvetica, Arial, sans-serif',
    mono:
      '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Courier New", monospace',
  },

  typography: {
    heroTitle: {
      fontSize: 54,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      color: '#E8FAF9',
    },
    sceneTitle: {
      fontSize: 44,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#E8FAF9',
    },
    sectionSubtitle: {
      fontSize: 28,
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#88A9B6',
    },
    cardHeading: {
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#E8FAF9',
    },
    bodyText: {
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#E8FAF9',
    },
    sourceCitation: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: '#88A9B6',
    },
    badge: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    },
    codeSnippet: {
      fontSize: 20,
      fontFamily: '"JetBrains Mono", Consolas, monospace',
      lineHeight: 1.6,
      color: '#1AD9D1',
    },
  },

  shadows: {
    panel: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 1px rgba(26, 217, 209, 0.3)',
    glowCyan: '0 0 40px rgba(26, 217, 209, 0.25)',
    glowFail: '0 0 40px rgba(246, 110, 114, 0.25)',
    glowPass: '0 0 40px rgba(54, 198, 139, 0.25)',
  },

  dimensions: {
    width: 1920,
    height: 1080,
    safeMarginX: 120,
    safeMarginY: 80,
  },
};
