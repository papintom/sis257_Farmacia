<script setup lang="ts">
import type { FormaFarmaceutica } from '@/models/formaFarmaceutica'
import http from '@/plugins/axios'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'formas-farmaceuticas'
const props = defineProps({
    mostrar: Boolean,
    formasFarmaceutica: {
        type: Object as () => FormaFarmaceutica,
        default: () => ({}) as FormaFarmaceutica,
    },
    modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    },
})

const formasFarmaceutica = ref<FormaFarmaceutica>({ ...props.formasFarmaceutica })
watch(
    () => props.formasFarmaceutica,
    (newVal) => {
        formasFarmaceutica.value = { ...newVal }
    },
)

async function handleSave() {
    try {
        const body = {
            nombre: formasFarmaceutica.value.nombre,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${formasFarmaceutica.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        formasFarmaceutica.value = {} as FormaFarmaceutica
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}
</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="nombre" class="font-semibold w-3">Nombre</label>
                <InputText id="nombre" v-model="formasFarmaceutica.nombre" class="flex-auto" autocomplete="off"
                    autofocus />
            </div>


            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                    @click="dialogVisible = false"></Button>
                <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>
