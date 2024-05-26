<script setup>
import { ref } from "vue";
import VueTailwindDatepicker  from "vue-tailwind-datepicker";

const dateValue = ref("")

const formatter = ref({
    date: "DD/MM/YYYY",
    month: "MMMM"
})

</script>

<template>
   <h1 class="text-4xl font-black my-10">Resumen de ventas</h1> 
   <div class="md:flex md:items-start gap-5">
    <div class="lg:w-1/2 xl:w-1/3 bg-white justify-center p-5">
        <VueTailwindDatepicker v-model="dateValue" 
        i18n="es"
        as-single
        no-input
        :formatter="formatter" />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
        <p>Ventas aquí</p>
        {{ dateValue }}
    </div>
   </div>
       

</template>
