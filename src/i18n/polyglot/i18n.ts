import { translations } from 'src/i18n';

const translation = translations['pt-BR'];

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const generateI18nEnum = (
  translation: TranslationObject,
  parentKey = '',
): Record<string, string> => {
  let enumObj: Record<string, string> = {};

  Object.keys(translation).forEach((key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof translation[key] === 'object') {
      const childEnum = generateI18nEnum(translation[key] as TranslationObject, newKey);
      enumObj = { ...enumObj, ...childEnum };
    } else {
      enumObj[newKey.toUpperCase()] = `translation.${newKey}`;
    }
  });

  return enumObj;
};

const generateI18nObject = (translation: TranslationObject, I18nEnum: Record<string, string>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const I18n: Record<string, any> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (obj: TranslationObject, parentObj: Record<string, any>, parentKey = '') => {
    Object.keys(obj).forEach((key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object') {
        parentObj[key] = {};
        traverse(obj[key] as TranslationObject, parentObj[key], newKey);
      } else {
        parentObj[key] = {
          KEY: I18nEnum[newKey.toUpperCase()],
          message: obj[key] as string,
        };
      }
    });
  };

  traverse(translation, I18n);
  return I18n;
};

type EnumFromTranslation<T extends TranslationObject> = {
  //@ts-ignore
  [K in keyof T as T[K] extends TranslationObject ? never : `${K}`]: `translation.${K}`;
};

type I18nObjectFromTranslation<T extends TranslationObject> = {
  [K in keyof T]: T[K] extends TranslationObject
    ? I18nObjectFromTranslation<T[K]>
    : {
        //@ts-ignore
        KEY: `translation.${K}`;
        message: T[K] extends string ? T[K] : never;
      };
};

type I18nEnumType = EnumFromTranslation<typeof translation>;
type I18nType = I18nObjectFromTranslation<typeof translation>;

const I18nEnum: I18nEnumType = generateI18nEnum(translation);
//@ts-ignore
export const I18n: I18nType = generateI18nObject(translation, I18nEnum);
