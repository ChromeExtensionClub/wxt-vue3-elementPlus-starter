<script setup lang="ts">
import type { AppTheme } from '@/utils/storage'
import { useDarkMode } from '@/composables/useDarkMode'
import { i18n } from '@/lib/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { theme, setTheme } = useDarkMode()

async function handleThemeChange(value: string | number | boolean | undefined) {
  await setTheme(value as AppTheme)
}
</script>

<template>
  <el-space direction="vertical" fill size="large">
    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('sidepanel.tools') }}</span>
      </template>

      <el-space direction="vertical" fill>
        <p>{{ i18n.t('sidepanel.toolsDescription') }}</p>
        <el-button type="primary" @click="appStore.incrementCounter()">
          {{ i18n.t('popup.increment') }}
        </el-button>
      </el-space>
    </el-card>

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
  </el-space>
</template>
