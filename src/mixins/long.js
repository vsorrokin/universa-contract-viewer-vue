import {selectText, copy} from '@/util/helpers';

export default {
  data() {
    return {
      activeLongValue: null
    }
  },

  mounted() {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('long')) return;
      this.activeLongValue = null;
    });
  },

  methods: {
    activateLong(it, e) {
      if (!it.long) return;

      this.activeLongValue = it.value;

      selectText(e.target);

      copy(it.value);
    }
  }
};
