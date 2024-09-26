import { ValidationArguments } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

/**
 * Retorna a mensagem de validação e um exemplo da mensagem.
 *
 * @param translation A chave da mensagem a ser retornada.
 * @param args Argumentos opcionais para a mensagem.
 * @returns Um objeto contendo a mensagem de validação e um exemplo da mensagem.
 */
export const polyglot = (
  translation: {
    KEY: string;
    message: string;
  },
  args?: Record<string, unknown>,
): { message: (args: ValidationArguments) => string } => {
  // Crie uma função que retorna a mensagem traduzida
  const messageFunction = (validationArgs: ValidationArguments): string => {
    return i18nValidationMessage(translation.KEY, args)(validationArgs);
  };

  return {
    message: messageFunction,
  };
};

export * from './i18n';
