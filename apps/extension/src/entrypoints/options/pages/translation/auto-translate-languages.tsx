import type { LangCodeISO6393 } from '@/types/config/languages'
import { i18n } from '#imports'
import { Icon } from '@iconify/react'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { useAtom } from 'jotai'
import { LANG_CODE_TO_EN_NAME, LANG_CODE_TO_LOCALE_NAME, langCodeISO6393Schema } from '@/types/config/languages'
import { configFields } from '@/utils/atoms/config'
import { ConfigCard } from '../../components/config-card'

export function AutoTranslateLanguages() {
  return (
    <ConfigCard
      title={i18n.t('options.translation.autoTranslateLanguages.title')}
      description={i18n.t('options.translation.autoTranslateLanguages.description')}
    >
      <AutoTranslateLanguagesSelector />
    </ConfigCard>
  )
}

function AutoTranslateLanguagesSelector() {
  const [translateConfig, setTranslateConfig] = useAtom(configFields.translate)
  const selectedLanguages = translateConfig.page.autoTranslateLanguages

  // 获取所有支持的语言代码
  const allLanguages = langCodeISO6393Schema.options

  const handleLanguageToggle = (language: LangCodeISO6393, checked: boolean) => {
    setTranslateConfig({
      page: {
        ...translateConfig.page,
        autoTranslateLanguages: checked
          ? [...selectedLanguages, language]
          : selectedLanguages.filter(lang => lang !== language),
      },
    })
  }

  const removeLanguage = (language: LangCodeISO6393) => {
    setTranslateConfig({
      page: {
        ...translateConfig.page,
        autoTranslateLanguages: selectedLanguages.filter(lang => lang !== language),
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-start md:justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-40 justify-between">
              <span className="truncate">{i18n.t('options.translation.autoTranslateLanguages.selectLanguages')}</span>
              <Icon icon="tabler:chevron-down" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {allLanguages.map(language => (
              <DropdownMenuCheckboxItem
                key={language}
                checked={selectedLanguages.includes(language)}
                onCheckedChange={checked => handleLanguageToggle(language, checked)}
              >
                {`${LANG_CODE_TO_EN_NAME[language]} (${LANG_CODE_TO_LOCALE_NAME[language]})`}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {selectedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLanguages.map(language => (
            <div
              key={language}
              className="inline-flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
            >
              <span>{`${LANG_CODE_TO_EN_NAME[language]} (${LANG_CODE_TO_LOCALE_NAME[language]})`}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeLanguage(language)}
              >
                <Icon icon="tabler:x" className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
