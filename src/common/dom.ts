import React from 'react';

export function scrollElementIntoView(id: string) {
  const element = document.getElementById(id);

  element?.scrollIntoView({ behavior: 'smooth' });
}

export function getCssCustomPropertyValue(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

export function composeCssCustomPropertyUsage(property: string) {
  return `var(${property})`;
}

export function addAlphaToHexColor(hexColor: string, opacity: number) {
  const convertedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  const alpha = convertedOpacity.toString(16);

  return `${hexColor}${alpha}`;
}

export function stopPropagation(e: Event | React.SyntheticEvent) {
  e.stopPropagation();
}
