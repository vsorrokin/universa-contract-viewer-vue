<template lang="pug">
  v-data-block(:title="$t('viewer.signatures_no_ref')" :data="info.signatures")
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

    async created() {
      this.keys = await this.contract.getSignatureKeys();
    },

    data() {
      return {
        keys: null
      }
    },

    computed: {
      info() {
        const res = {
          signatures: null
        };

        if (!this.keys) return res;

        res.ownerAdresses = this.contract.owner.addresses.map((it, idx) => {
          return {label: `${this.$t('viewer.Key')} #` + (idx + 1), value: it.base58, long: true};
        });

        const keyAddresses = [];
        this.keys.forEach((key, idx) => {
          keyAddresses.push({
            label: `Key #${idx + 1} (short)`,
            value: key.shortAddress58,
            long: true
          });

          keyAddresses.push({
            label: `${this.$t('viewer.Key')} #${idx + 1} (long)`,
            value: key.longAddress58,
            long: true
          });
        });

        const roles = {
          ...this.contract.state.roles,
          owner: this.contract.owner,
          issuer: this.contract.issuer,
          creator: this.contract.creator
        };

        const rolesList = [];

        for (let key in roles) {

          if (roles[key].availableFor({roles, keys: this.keys})) {
            rolesList.push(roles[key].name);
          }

        }

        res.signatures = [
          {label: this.$t('viewer.Roles'), value: rolesList.join(', ')},
          ...keyAddresses
        ];

        return res;
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
