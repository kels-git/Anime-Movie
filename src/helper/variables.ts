/**
 * FontSize
 */
export const FontSize = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
};

/**
 * Metrics Sizes
 */
const zero = 0;
const tiny = 5; // 5
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const medium = tiny * 4; // 20
const large = regular * 2; // 30
const xlarge = medium * tiny; // 100

const xxlarge = large * 10.8; // 324

export const MetricsSizes = {
  zero,
  tiny,
  small,
  regular,
  medium,
  large,
  xlarge,
  xxlarge,
};
