<template lang="pug">
  v-data-block(:title="$t('viewer.storage')" :data="info.storage")
</template>

<script>
  import VDataBlock from '@/components/uikit/DataBlock';

  export default {
    name: 'contract-general-info',

    props: ['data'],

    created() {
      this.fillStorageData();
    },

    data() {
      return {
        info: {
          storage: null
        }
      }
    },

    methods: {
      fillStorageData() {
        this.info.storage = [
          {
            label: this.$t('viewer.uni_cloud'),
            html: true,
            copy: false,
            value: `<a href="${this.data}" class="link">${this.$t('viewer.download')}</a>`
          }
        ];
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
