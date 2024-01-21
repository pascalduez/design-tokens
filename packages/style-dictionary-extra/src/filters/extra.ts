import type { Filter } from '../../types/style-dictionary.ts';
import { hasExtension } from '../extensions/extra.ts';

export const abstract: Filter = {
  name: 'extra/abstract',
  matcher: token => (hasExtension('abstract')(token) ? false : true),
};
