<script setup lang="ts">
import { InputNumber } from 'primevue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

defineProps({
    detalleVenta: {
        type: Array,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['eliminar'])
</script>

<template>

    <div class="card p-4">

        <h2 class="text-2xl font-bold mb-4">
            Detalle Venta
        </h2>

        <DataTable :value="detalleVenta">

            <Column field="medicamento" header="Medicamento" />

            <Column header="Cantidad">
                <template #body="{ data }">
                    <InputNumber v-model="data.cantidad" :min="1" @update:modelValue="
                        data.subtotal =
                        data.cantidad * data.precio
                        " />
                </template>
            </Column>

            <Column field="precio" header="Precio" />

            <Column field="subtotal" header="Subtotal" />

            <Column header="Acción">

                <template #body="{ index }">

                    <Button icon="pi pi-trash" severity="danger" text @click="emit('eliminar', index)" />

                </template>

            </Column>

        </DataTable>

        <div class="mt-4">

            <h2 class="text-2xl font-bold">
                Total: Bs. {{ total }}
            </h2>

        </div>

    </div>

</template>