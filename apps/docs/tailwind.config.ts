import type { Config } from 'tailwindcss';
import uiConfig from '@repo/ui/tailwind.config';

const config: Config = {
  ...uiConfig,
  // Add any web-specific Tailwind configuration here
};

export default config;
