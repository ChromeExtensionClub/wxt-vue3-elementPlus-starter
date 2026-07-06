<script setup lang="ts">
import { useRoute } from 'vue-router'
import { i18n } from '@/lib/i18n'

const route = useRoute()
</script>

<template>
  <el-container class="options-page">
    <el-header class="page-header">
      <div>
        <h1>{{ i18n.t('options.title') }}</h1>
        <p>{{ i18n.t('appDescription') }}</p>
      </div>
    </el-header>

    <el-main class="page-main">
      <el-menu mode="horizontal" :default-active="route.path" router>
        <el-menu-item index="/">
          {{ i18n.t('options.general') }}
        </el-menu-item>
        <el-menu-item index="/about">
          {{ i18n.t('options.about') }}
        </el-menu-item>
      </el-menu>

      <div class="view-container">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.options-page {
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 32px 32px 8px;

  h1 {
    color: $cus-color-primary;
    margin-bottom: 6px;
  }

  p {
    color: $cus-text-color-secondary;
  }
}

.page-main {
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px 32px;
}

.view-container {
  margin-top: 24px;
}
</style>
