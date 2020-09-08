import {selectText, copy} from '@/util/helpers';

export default {
  methods: {
    copyValue(e, it) {
      selectText(e.currentTarget.querySelector('.td-value'));

      copy(it.value);

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
  }
};
