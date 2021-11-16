const { maxTouchPoints, platform, userAgent, vendor } = navigator;

// @ts-expect-error using vendor-specific flag
export const isChrome = Boolean(window.chrome || /HeadlessChrome/.test(userAgent));

export const isFirefox = userAgent.toLowerCase().indexOf('firefox') > -1;

export const isDesktopSafari =
  /Safari/i.test(userAgent) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(userAgent);

export const isIOS =
  (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || (platform === 'MacIntel' && maxTouchPoints > 1);
