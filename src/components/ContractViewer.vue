<template lang="pug">
  .universa-contract-viewer(:style="cssVars" v-if="contract")

    // General information
    .data-block
      .title {{$t('viewer.general')}}

      table: tbody
        tr(v-for="(it, idx) in info.general" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(@click="activateLong(it, $event)"
                      v-if="it.value"
                      :class="{long: it.long, active: it.long && it.value === activeLongValue}")
              |{{it.value}}

    // State data
    .data-block(v-if="info.state")
      .title {{$t('viewer.state_data')}}

      table: tbody
        tr(v-for="it in info.state" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(v-if="it.value")
              |{{it.value}}

    // Definition data
    .data-block(v-if="info.definition")
      .title {{$t('viewer.def_data')}}

      table: tbody
        tr(v-for="it in info.definition" @click="copyValue($event, it)")
          td {{it.label}}
          td
            .copied-notification {{$t('viewer.value_copied')}}
            .td-value(v-if="it.value")
              |{{it.value}}
</template>

<style lang="stylus" scoped>

  trans(props...)
    transition-timing-function: ease
    transition-duration: .3s
    transition-property: unquote(props)

  .data-block
    margin-bottom: 50px
    &:last-child
      margin-bottom: 0
    .title
      font-size: 20px
      margin-bottom: 20px
      font-weight: 700

  table
    width: 100%
    border-collapse: collapse
    table-layout: fixed
    font-size: 15px
    word-break: break-word

  td
    padding: 12px 0px 12px 0px
    border-bottom: "1px solid rgba(%s, 0.4)" % var(--text-color)
    height: 55px
    position: relative
    trans('padding')

    &:first-child
      padding-left: 10px

  tr
    cursor: pointer
    trans('background-color')
    &:hover
      background-color: "rgba(%s, 0.1)" % var(--text-color)
      td:first-child
        padding-left: 20px
    &:last-child
      td
        border-bottom: none

  .copied-notification
    position: absolute
    font-weight: 500
    color: "rgba(%s, 1)" % var(--text-color)
    //background-color: "rgba(%s, 1)" % var(--bg-color)
    background-color: #147b14
    border-radius: 4px
    padding: 6px 12px 4px 12px
    transform: translateY(-50%)
    top: 50%
    left: 0
    opacity: 1
    pointer-events: none
    display: none
    z-index: 20
    &.visible
      display: block
      trans('opacity, transform')
      transition-duration: 1.5s
    &.active
      opacity: 0
      transform: translateY(-10px)

  .long
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    max-width: 70%
    display: inline-block
    line-height: 1
    margin-bottom: -0.25em
    border: "1px solid rgba(%s, 1)" % var(--text-color)
    padding: 6px 14px
    cursor: pointer
    font-size: 13px
    position: absolute
    transform: translateY(-50%)
    top: 50%

    trans('background-color, color, padding, trasform, box-shadow')
    transition-duration: .15s
    user-select: none

    &:hover
      background-color: "rgba(%s, 1)" % var(--text-color)
      color: "rgba(%s, 1)" % var(--bg-color)

    &.active
      word-break: break-all
      overflow: auto
      text-overflow: initial
      white-space: initial
      background: "rgba(%s, 1)" % var(--bg-color)
      z-index: 10
      padding: 27px
      box-shadow: "0px 0px 76px -20px rgba(%s, 1)" % var(--text-color)

      user-select: all
      &:hover
        color: "rgba(%s, 1)" % var(--text-color)

</style>

<script>
  function cap(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function selectText(el) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
  };

  export default {
    name: 'universa-contract-viewer',

    props: {
      data: {
        required: true
      },
      styleConfig: {
        type: Object,
        default() {
          return {
            textColor: '255, 255, 255',
            bgColor: '0, 0, 0'
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
        activeLongValue: null,
        contract: null,
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
          },

          definition: null,
          state: null
        }
      }
    },

    watch: {
      data() {
        this.loadContract();
      }
    },

    mounted() {
      document.addEventListener('click', e => {
        if (e.target.classList.contains('long')) return;
        this.activeLongValue = null;
      });
    },

    methods: {
      loadContract() {
        if (!this.data) return;

        const boss = Uni.decode64(this.data);

        this.contract = Uni.Boss.load(boss).contract;

        console.log(this.contract);

        this.fillGeneralInfo();
        this.fillStaticData('state');
        this.fillStaticData('definition');
      },

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

      fillStaticData(key) {
        const result = [];

        Object.keys(this.contract[key].data).forEach(label => {
          result.push({
            label,
            value: this.contract[key].data[label]
          });
        });

        this.info[key] = result;
      },

      copyValue(e, it) {
        selectText(e.currentTarget.querySelector('.td-value'));

        navigator.clipboard.writeText(it.value);

        const copied = e.currentTarget.querySelector('.copied-notification');

        copied.classList.add('visible');

        setTimeout(() => {
          copied.classList.add('active');
        }, 500);

        setTimeout(() => {
          copied.classList.remove('visible');
          copied.classList.remove('active');
        }, 1500);
      },

      activateLong(it, e) {
        if (!it.long) return;

        this.activeLongValue = it.value;

        selectText(e.target);

        navigator.clipboard.writeText(it.value);
      }
    }
  };
</script>
