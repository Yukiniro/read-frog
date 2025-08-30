import { i18n } from '#imports'
import { Switch } from '@repo/ui/components/switch'
import { useAtom, useAtomValue } from 'jotai'
import { isCurrentSiteInDisabledPatternsAtom, toggleCurrentSiteDisabledAtom } from '../atoms/floating-button-disabled-sites'
import { isIgnoreTabAtom } from '../atoms/ignore'

export function FloatingButtonDisabledSites() {
  const isCurrentSiteInDisabledPatterns = useAtomValue(isCurrentSiteInDisabledPatternsAtom)
  const [, toggleCurrentSite] = useAtom(toggleCurrentSiteDisabledAtom)
  const isIgnoreTab = useAtomValue(isIgnoreTabAtom)

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[13px] font-medium">
        {i18n.t('popup.disableFloatingButtonOnSite')}
      </span>
      <Switch
        checked={isCurrentSiteInDisabledPatterns}
        onCheckedChange={toggleCurrentSite}
        disabled={isIgnoreTab}
      />
    </div>
  )
}
