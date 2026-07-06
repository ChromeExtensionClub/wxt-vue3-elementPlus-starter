import { i18n } from '#i18n'

export { i18n }

export function getBrowserLocale() {
  return browser.i18n.getUILanguage()
}

export function isChineseLocale(locale = getBrowserLocale()) {
  return locale.toLowerCase().startsWith('zh')
}
