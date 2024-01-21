export const chain =
  (...matchers) =>
  token =>
    matchers.reduce((result, matcher) => result && matcher(token), true);
