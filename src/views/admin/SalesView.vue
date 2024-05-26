<script setup>
import { ref } from "vue";
import { useSalesStore } from "@/stores/sales";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SaleDetails from "@/components/SaleDetails.vue"
import { formatCurrency } from '@/helpers';

const sales = useSalesStore()

const formatter = ref({
    date: "DD/MM/YYYY",
    month: "MMMM"
})
console.log(sales.salesCollection);

</script>

<template>
    <h1 class="text-4xl font-black my-10">Resumen de ventas</h1>
    <div class="md:flex md:items-start gap-5">
        <div class="lg:w-1/2 xl:w-1/3 bg-white justify-center p-5">
            <VueTailwindDatepicker v-model="sales.dateValue" i18n="es" as-single no-input :formatter="formatter" />
        </div>
        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
            <p v-if="sales.isDateSelected" class="text-center text-lg">Ventas de la fecha <span class="font-black">{{
                sales.dateValue }}</span></p>
            <p v-else class="text-center text-lg">Selecciona una fecha</p>

            <div v-if="sales.salesCollection.length" class="space-y-5">
                <p class="text-right text-2xl">Total del día: <span class="font-black">{{
                    formatCurrency(sales.totalSalesOfDay) }}</span></p>
                <SaleDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale" />
            </div>
            <p v-else-if="sales.noSales" class="text-center text-lg">No hay ventas en este día</p>

        </div>

    </div>


</template>
