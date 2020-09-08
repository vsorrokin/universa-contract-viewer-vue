<template lang="pug">
  .universa-contract-viewer(:style="cssVars")
    template(v-if="contract || contractId")
      v-title(:contract="contract" :contract-id="contractId" :style-config="styleConfig")

      v-status(:contract="contract" :contract-id="contractId" :style-config="styleConfig")

    template(v-if="contract")
      v-general(:contract="contract")

      v-owner(:contract="contract")

      v-signatures(:contract="contract")

      v-static-data(type="state" :contract="contract")

      v-static-data(type="definition" :contract="contract")
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
        contract: null
      }
    },

    watch: {
      data() {
        this.loadContract();
      }
    },

    created() {
      this.loadContract();
    },

    methods: {
      loadContract() {
        if (!this.data) return;

        try {
          const boss = Uni.decode64(this.data);
          this.contract = Uni.Boss.load(boss).contract;
        } catch (e) {
          console.error(e);
        }

        console.log(this.contract);
      }
    },

    components: {
      VTitle,
      VGeneral,
      VOwner,
      VStaticData,
      VSignatures,
      VStatus
    }
  };
</script>
