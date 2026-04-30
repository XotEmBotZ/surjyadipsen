import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import { cache } from 'react';

export const getReader = cache(async () => {
  return createReader(process.cwd(), keystaticConfig);
});
