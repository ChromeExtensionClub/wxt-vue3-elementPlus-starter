<script setup lang="ts">
import type { AppTheme } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { useDarkMode } from '@/composables/useDarkMode'
import { getBrowserLocale, i18n } from '@/lib/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { theme, setTheme } = useDarkMode()

async function handleThemeChange(value: string | number | boolean | undefined) {
  await setTheme(value as AppTheme)
}

async function handleResetAll() {
  await appStore.resetAll()
  ElMessage.success(i18n.t('options.resetSuccess'))
}
</script>

<template>
  <el-space direction="vertical" fill size="large">
    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('common.theme') }}</span>
      </template>

      <el-radio-group :model-value="theme" @change="handleThemeChange">
        <el-radio-button value="system">
          {{ i18n.t('common.followSystem') }}
        </el-radio-button>
        <el-radio-button value="light">
          {{ i18n.t('common.light') }}
        </el-radio-button>
        <el-radio-button value="dark">
          {{ i18n.t('common.dark') }}
        </el-radio-button>
      </el-radio-group>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('common.browserLanguage') }}</span>
      </template>

      <el-space direction="vertical" fill>
        <el-tag>{{ getBrowserLocale() }}</el-tag>
        <p>{{ i18n.t('options.currentLocaleHint') }}</p>
      </el-space>
    </el-card>

    <el-button type="danger" @click="handleResetAll">
      {{ i18n.t('options.resetAll') }}
    </el-button>
  </el-space>
</template>
