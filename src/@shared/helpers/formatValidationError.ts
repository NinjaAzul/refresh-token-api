import { ValidationError } from 'class-validator';
import { I18nContext } from 'nestjs-i18n';
import { translations } from 'src/i18n';

// Função para formatar erros de validação
export const formatValidationError = (errors: ValidationError[]) => {
  const i18n = I18nContext.current();
  const language = i18n?.lang || 'en';

  if (errors.length > 0) {
    const errorMessages = errors.map((err) => {
      const whitelistMessage = err.constraints?.whitelistValidation
        ? translations[language]?.MESSAGES?.WHITELIST_MESSAGE
        : undefined;

      return {
        property: err.property,
        error: whitelistMessage || err.constraints,
        children: err.children,
      };
    });

    const errorObject = {
      info: 'Validation failed',
      errors: errorMessages,
      statusCode: 400,
      message: 'Bad Request',
    };

    return errorObject;
  }

  return {
    info: 'Validation succeeded',
    errors: [],
    statusCode: 200,
    message: 'Success',
  };
};
