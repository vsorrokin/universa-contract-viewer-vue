<template lang="pug">
  .universa-contract-viewer(:style="cssVars")
    template(v-if="contract || contractId")
      v-title(:contract="contract" :contract-id="contractId" :style-config="styleConfig" :key="'title' + keyContractId")

      v-status(:contract="contract" :contract-id="contractId" :style-config="styleConfig" :key="'status' + keyContractId")

    template(v-if="contract")
      v-general(:contract="contract" :key="'general' + keyContractId")

      v-owner(:contract="contract" :key="'owner' + keyContractId")

      v-signatures(:contract="contract" :key="'sign' + keyContractId")

      v-static-data(type="state" :contract="contract" :key="'state' + keyContractId")

      v-static-data(type="definition" :contract="contract" :key="'def' + keyContractId")

      v-storage(:data="storage" :key="'storage' + keyContractId" v-if="storage")
</template>

<style lang="stylus" scoped>
  .universa-contract-viewer
    min-width: 320px
</style>

<script>
  import VTitle from '@/components/blocks/Title';
  import VGeneral from '@/components/blocks/General';
  import VOwner from '@/components/blocks/Owner';
  import VStaticData from '@/components/blocks/StaticData';
  import VSignatures from '@/components/blocks/Signatures';
  import VStatus from '@/components/blocks/Status';
  import VStorage from '@/components/blocks/Storage';

  export default {
    name: 'universa-contract-viewer',

    props: {
      data: {
        required: false
      },
      contractId: {
        required: false
      },
      styleConfig: {
        type: Object,
        default() {
          return {
            textColor: '0, 0, 0',
            bgColor: '255, 255, 255'
          }
        }
      }
    },

    computed: {
      cssVars() {
        return {
          '--text-color': this.styleConfig.textColor,
          '--bg-color': this.styleConfig.bgColor
        }
      }
    },

    data() {
      return {
        contract: null,
        keyContractId: null,
        storage: null
      }
    },

    watch: {
      data() {
        this.loadContract();
      },
      contractId() {
        this.loadContract();
      }
    },

    created() {
      this.loadContract();
    },

    methods: {
      async loadContract() {
        this.storage = null;

        if (!this.data && !this.contractId) {
          this.keyContractId = '';
          return;
        }

        let contract;
        let contractId;

        try {
          const boss = Uni.decode64(this.data);
          contract = Uni.Boss.load(boss).contract;
          contractId = (await contract.hashId()).base64;
        } catch (e) {
          console.error(e);
          return;
        }

        const cloudResult = await this.loadFromCloud(contractId);

        if (cloudResult) {
          if (cloudResult.contract) {
            this.storage = cloudResult.url;
          }

          if (!contract && cloudResult.contract) {
            contract = cloudResult.contract;
          }
        }

        this.contract = contract;

        if (contract) {
          this.keyContractId = contractId;
        } else {
          this.keyContractId = this.contractId;
        }

      },

      async loadFromCloud(contractId) {
        if (!this.contractId && !contractId) return;

        const url = `https://xchange.mainnetwork.io/contracts/${encodeURIComponent(this.contractId || contractId)}/download`;

        let boss

        try {
          boss = new Uint8Array(await(await fetch(url)).arrayBuffer());
        } catch (e) {
          //console.error(e);
          return;
        }

        let contract;

        try {
          contract = Uni.Boss.load(boss).contract;
        } catch (e) {
          //console.error(e);
          return;
        }

        return {url, contract};
      }
    },

    components: {
      VTitle,
      VGeneral,
      VOwner,
      VStaticData,
      VSignatures,
      VStatus,
      VStorage
    }
  };
</script>
