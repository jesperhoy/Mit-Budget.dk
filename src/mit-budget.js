// @prepros-append posteringer.js

Vue.directive('validity', function (el, binding) {
  el.setCustomValidity(binding.value);
})

// @prepros-append vue/tmp/bs-checkbox.js
// @prepros-append vue/tmp/bs-radio.js
// @prepros-append vue/tmp/bs-modal.js
// @prepros-append vue/tmp/b-icon.js
// @prepros-append vue/tmp/b-amount.js
// @prepros-append vue/tmp/b-item.js
// @prepros-append vue/tmp/app.js 
