<template lang="pug">
  v-data-block(:title="$t('viewer.storage')" :data="info.storage")
</template>

<script>
  import VDataBlock from '../uikit/DataBlock';

  export default {
    name: 'contract-general-info',

    props: ['data'],

    computed: {
      info() {
        const res = {
          storage: null
        };

        if (!this.data) return res;

        res.storage = [
          {
            label: this.$t('viewer.uni_cloud'),
            html: true,
            copy: false,
            value: `<a href="${this.data}" class="link">${this.$t('viewer.download')}</a>`
          }
        ];

        return res;
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
