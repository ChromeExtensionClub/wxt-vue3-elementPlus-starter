import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { getBrowserLocale, isChineseLocale } from '@/lib/i18n'

export function resolveElementPlusLocale() {
  const locale = getBrowserLocale()
  return isChineseLocale(locale) ? zhCn : en
}
