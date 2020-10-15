<template lang="pug">
  v-data-block(:title="$t('viewer.general')" :data="info.general")
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

    data() {
      return {
        contractId: null
      }
    },

    async created() {
      this.contractId = (await this.contract.hashId()).base64;
    },

    computed: {
      info() {
        const res = {
          general: {
            rev: {
              label: this.$t('viewer.Revision'),
              value: null
            },
            issued: {
              label: this.$t('viewer.issued'),
              value: null
            },
            expires: {
              label: this.$t('viewer.Expires'),
              value: null
            },
            id: {
              label: 'ID',
              value: null,
              long: true
            },
            origin: {
              label: this.$t('viewer.origin'),
              value: null,
              long: true,
              contractLink: true
            },
            parent: {
              label: this.$t('viewer.parent'),
              value: null,
              long: true,
              contractLink: true
            },
            api_level: {
              label: this.$t('viewer.api_level'),
              value: null
            }
          }
        };

        if (!this.contractId) return res;

        const branch = this.contract.state.branchId ? `${this.$t('viewer.branch')} ${this.contract.state.branchId}` : this.$t('viewer.root_branch');
        res.general.rev.value = `${this.$t('viewer.revision')} ${this.contract.state.revision}, ${branch}`;

        res.general.issued.value = this.contract.definition.createdAt.toISOString();

        res.general.expires.value = this.contract.state.expiresAt.toISOString();

        res.general.id.value = this.contractId;

        if (this.contract.origin) {
          res.general.origin.value = this.contract.origin.base64;
          res.general.origin.long = true;
          res.general.origin.contractLink = true;
        } else {
          res.general.origin.value = this.$t('viewer.root_contract');
          res.general.origin.long = false;
          res.general.origin.contractLink = false;
        }

        if (this.contract.parent) {
          res.general.parent.value = this.contract.parent.base64;
          res.general.parent.long = true;
          res.general.parent.contractLink = true;
        } else {
          res.general.parent.value = this.$t('viewer.root_contract');
          res.general.parent.long = false;
          res.general.parent.contractLink = false;
        }

        res.general.api_level.value = this.contract.version;

        res.general = Object.values(res.general);

        return res;
      }
    },

    components: {
      VDataBlock
    }
  };
</script>
