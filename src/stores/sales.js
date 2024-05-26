import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSalesStore = defineStore("sales", () => {
    const dateValue = ref("")

    const db = useFirestore();

    const salesSource = computed(() => {
        if(dateValue.value){
            const q = query(
                collection(db, "sales"),
                where("fecha", "==", dateValue.value)
            )
            return q;
        }
    })
    const salesCollection = useCollection(salesSource);

    const isDateSelected = computed(() => dateValue.value)

    const noSales = computed(() => !salesCollection.length && dateValue.value)

    const totalSalesOfDay = computed(() => {
        return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0

        
    })

    return {
        dateValue,
        isDateSelected,
        salesCollection,
        noSales,
        totalSalesOfDay
    }
})