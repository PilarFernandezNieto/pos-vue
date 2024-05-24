import { ref, watch,computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore("coupon", () => {
  const cart = useCartStore();
  const couponInput = ref("");
  const couponValidationMessage = ref("");
  const discountPercentaje = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  watch(discountPercentaje, () => {
    discount.value = (cart.total * discountPercentaje.value).toFixed(2);
  });

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = "Aplicando...";

      setTimeout(() => {
        discountPercentaje.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount;
        couponValidationMessage.value = "¡Descuento aplicado!";
      }, 3000);
    } else {
      couponValidationMessage.value = "No existe ese cupón";
      setTimeout(() => {
        couponValidationMessage.value = "";
      }, 6000);
    }
  }

  function $reset(){
    couponInput.value = ""
    couponValidationMessage.value = ""
    discountPercentaje.value = 0
    discount.value = 0
  }

  const isValidCoupon = computed(() => discountPercentaje.value > 0)
  return {
    discount,
    couponValidationMessage,
    isValidCoupon,
    couponInput,
    applyCoupon,
    $reset
  };
});
