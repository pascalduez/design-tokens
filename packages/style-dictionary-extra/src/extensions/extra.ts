export const namespace = 'org.tokens.extra';

export const getExtension = token => token.$extensions?.[namespace];

export const hasExtension = extension => token =>
  getExtension(token)?.use === extension;
