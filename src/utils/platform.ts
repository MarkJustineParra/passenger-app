import { Capacitor } from '@capacitor/core';

export const getPlatform = () => {
  return Capacitor.getPlatform();
};

export const isIOS = () => {
  return Capacitor.getPlatform() === 'ios';
};

export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};

export const isWeb = () => {
  return Capacitor.getPlatform() === 'web';
};

export const isNative = () => {
  return Capacitor.isNativePlatform();
};

export const isMobile = () => {
  return isIOS() || isAndroid();
};

/**
 * Get safe area insets for the current platform
 * Returns default values for web platform
 */
export const getSafeAreaInsets = () => {
  if (!isNative()) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  }

  // For native platforms, CSS env() variables handle this
  return {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
    right: 'env(safe-area-inset-right)',
  };
};

/**
 * Check if device has a notch (iOS) or similar cutout (Android)
 */
export const hasNotch = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for safe area insets
  const div = document.createElement('div');
  div.style.paddingTop = 'env(safe-area-inset-top)';
  document.body.appendChild(div);
  const hasSafeArea = parseInt(window.getComputedStyle(div).paddingTop) > 0;
  document.body.removeChild(div);
  
  return hasSafeArea;
};

/**
 * Detect screen size category
 */
export const getScreenSize = () => {
  const width = window.innerWidth;
  
  if (width < 480) return 'xs';  // Small phones
  if (width < 768) return 'sm';  // Large phones
  if (width < 1024) return 'md'; // Tablets
  if (width < 1280) return 'lg'; // Small desktops
  return 'xl';                   // Large desktops
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = () => {
  return window.innerWidth > window.innerHeight;
};

/**
 * Check if device is in portrait mode
 */
export const isPortrait = () => {
  return window.innerHeight > window.innerWidth;
};

/**
 * Get platform-specific class names
 */
export const getPlatformClasses = () => {
  const classes: string[] = [];
  
  if (isIOS()) classes.push('platform-ios');
  if (isAndroid()) classes.push('platform-android');
  if (isWeb()) classes.push('platform-web');
  if (hasNotch()) classes.push('has-notch');
  if (isLandscape()) classes.push('landscape');
  if (isPortrait()) classes.push('portrait');
  
  return classes.join(' ');
};
