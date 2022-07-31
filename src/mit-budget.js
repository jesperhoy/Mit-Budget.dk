Vue.directive('validity', function (el, binding) {
  el.setCustomValidity(binding.value);
})

import BSCheckbox from "./vue/tmp/bs-checkbox.js";
Vue.component("bs-checkbox", BSCheckbox);
import BSRadio from "./vue/tmp/bs-radio.js";
Vue.component("bs-radio", BSRadio);
import BSModal from "./vue/tmp/bs-modal.js";
Vue.component("bs-modal", BSModal);
import BIcon from "./vue/tmp/b-icon.js";
Vue.component("b-icon", BIcon);
import BAmount from "./vue/tmp/b-amount.js";
Vue.component("b-amount", BAmount);
import BItem from "./vue/tmp/b-item.js";
Vue.component("b-item", BItem);
import App from "./vue/tmp/app.js";
new Vue(App);
