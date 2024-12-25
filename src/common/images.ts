import React from 'react';

export const ALL_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/apng',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
export const IMAGE_TYPE_ERROR_MESSAGE = 'Поддерживается только JPEG и PNG';

export const grabImageFilePath = (file: File) => (e: React.SyntheticEvent<HTMLImageElement>) => {
  if (!ALL_IMAGE_TYPES.includes(file.type)) return;

  const imageSrc = URL.createObjectURL(file);
  const imageElement = e.currentTarget;

  imageElement.src = imageSrc;
};

export const deleteTempUrlObject = (e: React.SyntheticEvent<HTMLImageElement>) => {
  URL.revokeObjectURL(e.currentTarget.src);
};
