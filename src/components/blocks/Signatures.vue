<template lang="pug">
  v-data-block(:title="$t('viewer.signatures_no_ref')" :data="info.signatures")
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
      this.fillSignatures();
    },

    data() {
      return {
        info: {
          signatures: null
        }
      }
    },

    methods: {
      async fillSignatures() {
        const keys = await this.contract.getSignatureKeys();

        const keyAddresses = [];
        keys.forEach((key, idx) => {
          keyAddresses.push({
            label: `Key #${idx + 1} (short)`,
            value: key.shortAddress58,
            long: true
          });

          keyAddresses.push({
            label: `Key #${idx + 1} (long)`,
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

          if (roles[key].availableFor({roles, keys})) {
            rolesList.push(roles[key].name);
          }

        }

        this.info.signatures = [
          {label: this.$t('viewer.Roles'), value: rolesList.join(', ')},
          ...keyAddresses
        ];
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
