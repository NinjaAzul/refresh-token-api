import { TEMPLATE_TRANSLATIONS } from 'src/modules/email/i18n';

export const getRecoverPasswordContext = (language: string) => {
  return {
    paragraph1:
      TEMPLATE_TRANSLATIONS[language].recover_password_template.paragraph1,
    paragraph2:
      TEMPLATE_TRANSLATIONS[language].recover_password_template.paragraph2,
    paragraph3:
      TEMPLATE_TRANSLATIONS[language].recover_password_template.paragraph3,
    paragraph4:
      TEMPLATE_TRANSLATIONS[language].recover_password_template.paragraph4,
    copyright: {
      developedBy:
        TEMPLATE_TRANSLATIONS[language].recover_password_template.developedBy,
      copyright:
        TEMPLATE_TRANSLATIONS[language].recover_password_template.copyright,
      developedURL:
        TEMPLATE_TRANSLATIONS[language].recover_password_template.developedURL,
    },
    button: TEMPLATE_TRANSLATIONS[language].recover_password_template.button,
  } as const;
};
