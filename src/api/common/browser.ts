export function getBrowserLanguage() {
  const en = 'en';
  const ru = 'ru';

  const defaultLanguage = en;

  const languages: Record<string, string> = {
    'en-US': en,
    'ru-RU': ru,
  };

  return languages[navigator.language] ?? defaultLanguage;
}
