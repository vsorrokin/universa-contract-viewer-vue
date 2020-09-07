<template lang="pug">
  #app
    input(type="file" @change="submit")
    v-contract-viewer(:data="contract")
</template>

<style lang="stylus" scoped>
  #app
    margin: 100px

  .universa-contract-viewer
    margin-top: 100px
</style>


<script>
  import VContractViewer from '@/components/ContractViewer';

  export default {
    name: 'universa-contract-viewer-page',

    data() {
      return {
        contract: null
      }
    },

    methods: {
      submit(event) {
        const reader = new FileReader();

        reader.onload = (file) => {
          this.contract = reader.result.split('base64,')[1];
        }

        reader.readAsDataURL(event.target.files[0]);
      }
    },

    components: {
      VContractViewer
    }
  };
</script>
