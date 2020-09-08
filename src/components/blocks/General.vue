<template lang="pug">
  v-data-block(:title="$t('viewer.general')" :data="info.general")
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
      this.fillGeneralInfo();
    },

    data() {
      return {
        info: {
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
              label: this.$t('viewer.expires'),
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
        }
      }
    },

    methods: {
      async fillGeneralInfo() {
        const branch = this.contract.state.branchId ? `${this.$t('viewer.branch')} ${this.contract.state.branchId}` : this.$t('viewer.root_branch');
        this.info.general.rev.value = `${this.$t('viewer.revision')} ${this.contract.state.revision}, ${branch}`;

        this.info.general.issued.value = this.contract.definition.createdAt.toISOString();

        this.info.general.expires.value = this.contract.state.expiresAt.toISOString();

        this.info.general.id.value = (await this.contract.hashId()).base64;

        if (this.contract.origin) {
          this.info.general.origin.value = this.contract.origin.base64;
          this.info.general.origin.long = true;
          this.info.general.origin.contractLink = true;
        } else {
          this.info.general.origin.value = this.$t('viewer.root_contract');
          this.info.general.origin.long = false;
          this.info.general.origin.contractLink = false;
        }

        if (this.contract.parent) {
          this.info.general.parent.value = this.contract.parent.base64;
          this.info.general.parent.long = true;
          this.info.general.parent.contractLink = true;
        } else {
          this.info.general.parent.value = this.$t('viewer.root_contract');
          this.info.general.parent.long = false;
          this.info.general.parent.contractLink = false;
        }

        this.info.general.api_level.value = this.contract.version;
      },
    },

    components: {
      VDataBlock
    }
  };
</script>
