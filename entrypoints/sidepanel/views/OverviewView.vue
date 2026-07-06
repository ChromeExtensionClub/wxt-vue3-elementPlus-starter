<script setup lang="ts">
import { getBrowserLocale, i18n } from '@/lib/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<template>
  <el-space direction="vertical" fill size="large">
    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('sidepanel.overview') }}</span>
      </template>

      <el-space direction="vertical" fill>
        <p>{{ i18n.t('sidepanel.overviewDescription') }}</p>
        <el-tag>{{ i18n.t('common.counter') }}: {{ appStore.counter }}</el-tag>
        <el-tag>{{ i18n.t('common.browserLanguage') }}: {{ getBrowserLocale() }}</el-tag>
      </el-space>
    </el-card>
  </el-space>
</template>
