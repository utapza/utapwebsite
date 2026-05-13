export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Use dataLayer for Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...properties,
    });
  }
  
  // Use PostHog if available on window
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  }

  // Fallback to console in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, properties || {});
  }
}
