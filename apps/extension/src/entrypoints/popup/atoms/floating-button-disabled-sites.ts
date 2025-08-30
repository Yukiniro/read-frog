import type { Config } from '@/types/config/config'
import { atom } from 'jotai'
import { configFields } from '@/utils/atoms/config'
import { getActiveTabUrl } from '@/utils/utils'

export const isCurrentSiteInDisabledPatternsAtom = atom<boolean>(false)

export async function getIsInDisabledPatterns(translateConfig: Config['translate']) {
  const activeTabUrl = await getActiveTabUrl()
  if (!activeTabUrl)
    return false
  return translateConfig.page.disabledFloatingButtonPatterns.some(pattern =>
    activeTabUrl.includes(pattern),
  )
}

export const initIsCurrentSiteInDisabledPatternsAtom = atom(
  null,
  async (get, set) => {
    const translateConfig = get(configFields.translate)
    set(isCurrentSiteInDisabledPatternsAtom, await getIsInDisabledPatterns(translateConfig))
  },
)

export const toggleCurrentSiteDisabledAtom = atom(
  null,
  async (get, set, checked: boolean) => {
    // eslint-disable-next-line no-console
    console.log('toggleCurrentSiteDisabledAtom', checked)
    const translateConfig = get(configFields.translate)
    const activeTabUrl = await getActiveTabUrl()

    if (!activeTabUrl)
      return

    const currentPatterns = translateConfig.page.disabledFloatingButtonPatterns
    const hostname = new URL(activeTabUrl).hostname

    if (checked) {
      // Add hostname to patterns if not already present
      if (!currentPatterns.some(pattern => hostname.includes(pattern))) {
        set(configFields.translate, {
          ...translateConfig,
          page: {
            ...translateConfig.page,
            disabledFloatingButtonPatterns: [...currentPatterns, hostname],
          },
        })
      }
    }
    else {
      // Remove patterns that match the current hostname
      const filteredPatterns = currentPatterns.filter(pattern =>
        !hostname.includes(pattern),
      )
      set(configFields.translate, {
        ...translateConfig,
        page: {
          ...translateConfig.page,
          disabledFloatingButtonPatterns: filteredPatterns,
        },
      })
    }

    // Update the local state
    set(isCurrentSiteInDisabledPatternsAtom, checked)
  },
)
