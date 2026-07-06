import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { getBrowserLocale, isChineseLocale } from '@/lib/i18n'

export function resolveElementPlusLocale() {
  const locale = getBrowserLocale()
  return isChineseLocale(locale) ? zhCn : en
}
