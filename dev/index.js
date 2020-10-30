import Vue from 'vue';
import VueI18n from 'vue-i18n';

import Dev from './Dev.vue';

Vue.config.productionTip = false;

// Configure i18n
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('@/i18n/en.yml'),
    ru: require('@/i18n/ru.yml')
  }
});

new Vue({
  render: h => h(Dev),
  i18n
}).$mount('#app');
