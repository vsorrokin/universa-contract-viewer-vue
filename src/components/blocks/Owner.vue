<template lang="pug">
  v-data-block(:title="$t('viewer.owner')" :data="info.ownerAdresses")
</template>

<script>
  import VDataBlock from '../uikit/DataBlock';

  export default {
    name: 'contract-general-info',

    props: {
      contract: {
        required: true
      }
    },

    computed: {
      info() {
        const res = {
          ownerAdresses: null
        };

        if (!this.contract) return res;

        res.ownerAdresses = this.contract.owner.addresses.map((it, idx) => {
          return {label: `${this.$t('viewer.Key')} #` + (idx + 1), value: it.base58, long: true};
        });

        return res;
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
