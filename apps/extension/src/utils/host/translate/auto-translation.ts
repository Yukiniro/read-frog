import type { Config } from '@/types/config/config'

export async function shouldEnableAutoTranslation(url: string, config: Config): Promise<boolean> {
  const autoTranslatePatterns = config?.translate.page.autoTranslatePatterns
  const autoTranslateLanguages = config?.translate.page.autoTranslateLanguages

  // Check URL patterns
  const matchesPattern = autoTranslatePatterns?.some(pattern =>
    url.toLowerCase().includes(pattern.toLowerCase()),
  ) ?? false

  // Check language-based auto translation
  const matchesLanguage = autoTranslateLanguages?.includes(config.language.detectedCode)

  return matchesPattern || matchesLanguage
}
