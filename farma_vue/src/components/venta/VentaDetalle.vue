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
    <div class="panel">
        <div class="panel-header">
            <div>
                <h2 class="h5 mb-1 section-title">
                    <i class="bi bi-cart-check"></i>
                    <span>Detalle de Venta</span>
                </h2>
                <p class="text-muted mb-0">
                    Productos agregados a la venta actual.
                </p>
            </div>
        </div>

        <div class="table-responsive">
            <DataTable :value="detalleVenta" tableStyle="min-width: 100%">
                <Column field="medicamento" header="Medicamento" />

                <Column header="Cantidad" style="width: 120px">
                    <template #body="{ data }">
                        <InputNumber v-model="data.cantidad" :min="1" inputStyle="width: 60px" @update:modelValue="
                            data.subtotal = data.cantidad * data.precio
                            " />
                    </template>
                </Column>

                <Column field="precio" header="Precio">
                    <template #body="{ data }">
                        Bs. {{ data.precio }}
                    </template>
                </Column>

                <Column field="subtotal" header="Subtotal">
                    <template #body="{ data }">
                        Bs. {{ data.subtotal }}
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="{ index }">
                        <div class="d-flex gap-2">
                            <Button icon="pi pi-trash" severity="danger" outlined rounded
                                @click="emit('eliminar', index)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <div class="d-flex justify-content-end mt-4">
            <h4 class="fw-bold mb-0">
                Total: Bs. {{ total }}
            </h4>
        </div>
    </div>
</template>