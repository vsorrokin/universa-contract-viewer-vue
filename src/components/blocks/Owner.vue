<template lang="pug">
  v-data-block(:title="$t('viewer.owner')" :data="info.ownerAdresses")
</template>

<script>
  import VDataBlock from '@/components/uikit/DataBlock';

  export default {
    name: 'contract-general-info',

    props: {
      contract: {
        required: true
      }
    },

    created() {
      this.fillOwnerInfo();
    },

    data() {
      return {
        info: {
          ownerAdresses: null
        }
      }
    },

    methods: {
      fillOwnerInfo() {
        this.info.ownerAdresses = this.contract.owner.addresses.map((it, idx) => {
          return {label: 'Key #' + (idx + 1), value: it.base58, long: true};
        });
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
