import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {

    const items = ref([])
    const maxProducts = 5;

    function addItem(item){
        items.value.push({...item, quantity: 1})
    }



    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < 5 ? product.availability : maxProducts
    })


    return {
        items,
        addItem,
        isEmpty,
        checkProductAvailability
    }
})