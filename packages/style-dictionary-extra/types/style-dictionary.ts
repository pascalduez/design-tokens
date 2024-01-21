import * as StyleDictionary from 'style-dictionary';

type OmitTransformer<T = StyleDictionary.Transform> = T extends any
  ? Omit<T, 'transformer'>
  : never;

type TransformedToken = Omit<StyleDictionary.TransformedToken, 'value'> & {
  $value: any;
};

export type Transform<PlatformType = Record<string, any>> = OmitTransformer & {
  transformer: (
    token: TransformedToken,
    options: StyleDictionary.Platform<PlatformType>,
  ) => string | number;
};

export type Matcher = (token: TransformedToken) => boolean;

export type Filter = {
  name: string;
  matcher: Matcher;
};
