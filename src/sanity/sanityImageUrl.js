import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function isSanityImageUrl(value) {
  return typeof value === 'string' && value.includes('cdn.sanity.io/images/');
}

export function buildSanityImageUrl(source, options = {}) {
  if (!source) {
    return '';
  }

  const {
    width,
    height,
    fit = 'max',
    quality = 75,
    autoFormat = true,
  } = options;

  let imageBuilder = builder.image(source);

  if (autoFormat) {
    imageBuilder = imageBuilder.auto('format');
  }

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  if (fit) {
    imageBuilder = imageBuilder.fit(fit);
  }

  if (quality) {
    imageBuilder = imageBuilder.quality(quality);
  }

  return imageBuilder.url();
}

export function urlFor(source) {
  return builder.image(source);
}