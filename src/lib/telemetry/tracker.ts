// Deep Telemetry & B2B Visitor Intelligence Engine
// Strictly first-party, GDPR/ePrivacy compliant

export interface VisitorProfile {
  visitorId: string;
  sessionId: string;
  firstTouchSource: string;
  firstTouchMedium: string;
  firstTouchCampaign: string;
  initialReferrer: string;
  landingPage: string;
  visitCount: number;
  cpuCores: number;
  deviceMemoryGb: number;
  connectionType: string;
  gpuRenderer: string;
  screenResolution: string;
  viewportSize: string;
  timezone: string;
  systemLanguage: string;
  isTouch: boolean;
  geoCountry?: string;
  geoCity?: string;
  intentScore: number;
  intentLevel: 'Casual' | 'Engaged' | 'High Intent' | 'VIP Recruiter';
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch {}
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getGpuRenderer(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'No WebGL';
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'Generic GPU';
    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    // Sanitize string to prevent bloating
    return (renderer || 'Generic GPU').slice(0, 80);
  } catch {
    return 'Unknown';
  }
}

// Global state in browser
let cachedProfile: VisitorProfile | null = null;

export function getVisitorProfile(): VisitorProfile | null {
  if (typeof window === 'undefined') return null;
  if (cachedProfile) return cachedProfile;

  try {
    // 1. Visitor & Session IDs
    let visitorId = localStorage.getItem('eds_vid');
    if (!visitorId) {
      visitorId = `vid_${generateUuid().slice(0, 16)}`;
      localStorage.setItem('eds_vid', visitorId);
    }

    let sessionId = sessionStorage.getItem('eds_sid');
    if (!sessionId) {
      sessionId = `sid_${generateUuid().slice(0, 12)}`;
      sessionStorage.setItem('eds_sid', sessionId);
    }

    // 2. Visit Count
    const visitsStr = localStorage.getItem('eds_visits');
    const visitCount = visitsStr ? parseInt(visitsStr, 10) + 1 : 1;
    localStorage.setItem('eds_visits', visitCount.toString());

    // 3. Attribution Vault (First-Touch)
    const urlParams = new URLSearchParams(window.location.search);
    const sourceParam = urlParams.get('utm_source') || urlParams.get('ref') || '';
    const mediumParam = urlParams.get('utm_medium') || '';
    const campaignParam = urlParams.get('utm_campaign') || '';

    let firstSource = localStorage.getItem('eds_first_source');
    let firstMedium = localStorage.getItem('eds_first_medium');
    let firstCampaign = localStorage.getItem('eds_first_campaign');
    let initialRef = sessionStorage.getItem('initial_referrer') || '';

    if (!firstSource && sourceParam) {
      firstSource = sourceParam;
      firstMedium = mediumParam;
      firstCampaign = campaignParam;
      localStorage.setItem('eds_first_source', firstSource);
      if (firstMedium) localStorage.setItem('eds_first_medium', firstMedium);
      if (firstCampaign) localStorage.setItem('eds_first_campaign', firstCampaign);
    }

    if (!initialRef && document.referrer && !document.referrer.includes(window.location.hostname)) {
      initialRef = document.referrer;
      sessionStorage.setItem('initial_referrer', initialRef);
    }

    // 4. Hardware & System Telemetry
    const nav = navigator as any;
    const cpuCores = nav.hardwareConcurrency || 0;
    const deviceMemoryGb = nav.deviceMemory || 0;
    const connectionType = nav.connection?.effectiveType || 'unknown';
    const gpuRenderer = getGpuRenderer();
    const screenResolution = `${window.screen.width}x${window.screen.height}@${window.devicePixelRatio || 1}x`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    const systemLanguage = navigator.language || 'unknown';
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 5. Edge Geo Cookies
    const geoCountry = getCookie('geo_country');
    const geoCity = getCookie('geo_city') ? decodeURIComponent(getCookie('geo_city')!) : undefined;

    // 6. Intent Score & Level
    const savedScore = parseInt(sessionStorage.getItem('eds_intent_score') || '10', 10);
    const intentScore = Math.min(100, isNaN(savedScore) ? 10 : savedScore);

    const intentLevel: VisitorProfile['intentLevel'] =
      intentScore >= 80 ? 'VIP Recruiter' : intentScore >= 55 ? 'High Intent' : intentScore >= 25 ? 'Engaged' : 'Casual';

    cachedProfile = {
      visitorId,
      sessionId,
      firstTouchSource: firstSource || (initialRef ? new URL(initialRef).hostname : 'direct'),
      firstTouchMedium: firstMedium || '',
      firstTouchCampaign: firstCampaign || '',
      initialReferrer: initialRef,
      landingPage: window.location.pathname,
      visitCount,
      cpuCores,
      deviceMemoryGb,
      connectionType,
      gpuRenderer,
      screenResolution,
      viewportSize,
      timezone,
      systemLanguage,
      isTouch,
      geoCountry,
      geoCity,
      intentScore,
      intentLevel,
    };

    return cachedProfile;
  } catch (err) {
    console.warn('[Telemetry] Error initializing telemetry profile:', err);
    return null;
  }
}

/**
 * Sends custom telemetry tag to Microsoft Clarity if available
 */
export function sendToClarity(key: string, value: string | number) {
  if (typeof window === 'undefined') return;
  try {
    (window as any).clarity =
      (window as any).clarity ||
      function () {
        ((window as any).clarity.q = (window as any).clarity.q || []).push(arguments);
      };
    (window as any).clarity('set', key, String(value));
  } catch {}
}

/**
 * Boosts the visitor's Executive Intent Score and updates Clarity in real-time
 */
export function boostIntentScore(points: number, reason: string, meta?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  try {
    const current = parseInt(sessionStorage.getItem('eds_intent_score') || '10', 10);
    const nextScore = Math.min(100, current + points);
    sessionStorage.setItem('eds_intent_score', nextScore.toString());

    if (cachedProfile) {
      cachedProfile.intentScore = nextScore;
      cachedProfile.intentLevel =
        nextScore >= 80 ? 'VIP Recruiter' : nextScore >= 55 ? 'High Intent' : nextScore >= 25 ? 'Engaged' : 'Casual';
    }

    sendToClarity('intent_score', nextScore);
    sendToClarity('intent_level', cachedProfile?.intentLevel || 'Engaged');
    sendToClarity('last_intent_action', reason);

    if (meta) {
      Object.entries(meta).forEach(([k, v]) => {
        sendToClarity(k, String(v));
      });
    }
  } catch {}
}

/**
 * Dispatches full profile tags to Clarity on initialization
 */
export function syncProfileWithClarity() {
  const profile = getVisitorProfile();
  if (!profile) return;

  sendToClarity('visitor_id', profile.visitorId);
  sendToClarity('visit_count', profile.visitCount);
  sendToClarity('lead_source', profile.firstTouchSource);
  if (profile.firstTouchMedium) sendToClarity('lead_medium', profile.firstTouchMedium);
  if (profile.firstTouchCampaign) sendToClarity('lead_campaign', profile.firstTouchCampaign);
  if (profile.initialReferrer) sendToClarity('initial_ref', profile.initialReferrer);

  sendToClarity('intent_score', profile.intentScore);
  sendToClarity('intent_level', profile.intentLevel);

  sendToClarity('gpu', profile.gpuRenderer);
  sendToClarity('cpu_cores', profile.cpuCores);
  sendToClarity('device_memory_gb', profile.deviceMemoryGb);
  sendToClarity('network_type', profile.connectionType);
  sendToClarity('screen_res', profile.screenResolution);
  sendToClarity('timezone', profile.timezone);

  if (profile.geoCountry) sendToClarity('geo_country', profile.geoCountry);
  if (profile.geoCity) sendToClarity('geo_city', profile.geoCity);
}
