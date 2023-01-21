const { maxTouchPoints, platform, userAgent, vendor } = navigator;

// @ts-expect-error using vendor-specific flag
export const isChrome = Boolean(window.chrome || userAgent.includes('HeadlessChrome'));

export const isFirefox = userAgent.toLowerCase().includes('firefox');

export const isDesktopSafari =
  /Safari/i.test(userAgent) && vendor.includes('Apple Computer') && !/Mobi|Android/i.test(userAgent);

// @ts-expect-error using vendor-specific flag
const isIphone = /iPad|iPhone/.test(userAgent) && !window.MSStream;

export const isIOS = isIphone || (platform === 'MacIntel' && maxTouchPoints > 1);
