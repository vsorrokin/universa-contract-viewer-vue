<template lang="pug">
  .status-block
    .title: i18n(path="viewer.checked_by_nodes")
      template(v-slot:count) 33/33
</template>

<style lang="stylus" scoped>
  @import '../../assets/style/title'
</style>

<script>

  let privateKey = `JgAcAQABvID2aGSNX6bzGyUAQjReoePsIwjrcKXvKR6mODV588tuxy2bJKiU
                    DoFuMwN2RDB+1RVEIxDN2oaU2phiu6cnNMEv99eQ02P2oxODzKKmO/80rLhI
                    TazKSa5vsyKcSeoa+iGKEtc/hCcK2qTcv10cq0qEXaNSMvw0K+A/LvCe5PgK
                    nbyA8Sk8tTUR5prey5zC6pl4utzITXuGmOAHIfeglUi/ilphXXXIYlcOKUBu
                    KzUH7k7nFn0R3JcxDAlwYJVuXsYSmjZyCaknLrCU1RV5fCJ0dunKdX6+glNM
                    p2eiCXdXCaE+HbKQZQFCz3zNSvBI45RIRFhKYR76OiD2xnJhQCATwJM=`;

  export default {
    name: 'contract-title',

    props: {
      contract: {
        required: true
      },
      styleConfig: {
        required: true
      }
    },

    created() {
      this.fillNetworkInfo();
    },

    data() {
      return {
        topologySize: null
      }
    },

    methods: {
      async fillNetworkInfo() {
        const boss = Uni.decode64(privateKey);
        privateKey = await Uni.PrivateKey.unpack(boss);

        const network = new Uni.Network(privateKey, {topologyKey: 'universa_topology'});

        try {
          await network.connect();
        } catch (err) {
          console.log("network connection error: ", err);
          return;
        }

        this.topologySize = network.size();

        let isApproved;

        try {
          const approvedId = (await this.contract.hashId()).base64
          isApproved = await network.isApproved(approvedId, 0.6);
        }
        catch (err) {
          console.log("on network command:", err);
          return;
        }

        console.log(isApproved);
      }
    }
  };
</script>
