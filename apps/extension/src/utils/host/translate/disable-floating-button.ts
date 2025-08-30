import type { Config } from '@/types/config/config'

export function shouldDisableFloatingButton(url: string, config: Config): boolean {
  const disabledFloatingButtonPatterns = config?.translate.page.disabledFloatingButtonPatterns
  if (!disabledFloatingButtonPatterns)
    return false

  return disabledFloatingButtonPatterns.some(pattern => url.toLowerCase().includes(pattern.toLowerCase()))
}
