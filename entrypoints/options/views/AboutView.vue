<script setup lang="ts">
import { i18n } from '@/lib/i18n'
</script>

<template>
  <el-space direction="vertical" fill size="large">
    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('options.about') }}</span>
      </template>

      <el-space direction="vertical" fill>
        <p>{{ i18n.t('appDescription') }}</p>
        <p>{{ i18n.t('options.aboutDescription') }}</p>
      </el-space>
    </el-card>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="WXT">
        0.20.x
      </el-descriptions-item>
      <el-descriptions-item label="Vue">
        3.5.x
      </el-descriptions-item>
      <el-descriptions-item label="Pinia">
        3.x
      </el-descriptions-item>
      <el-descriptions-item label="Element Plus">
        2.x
      </el-descriptions-item>
    </el-descriptions>
  </el-space>
</template>
