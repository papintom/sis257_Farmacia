<script setup lang="ts">
import type { Medicamento } from '@/models/medicamento'
import type { Proveedor } from '@/models/proveedor'
import type { Lote } from '@/models/lote'

import http from '@/plugins/axios'

import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

import { computed, ref, watch } from 'vue'

const ENDPOINT = 'lotes'

const props = defineProps({
  mostrar: Boolean,
  lote: {
    type: Object as () => Lote,
    default: () => ({}) as Lote,
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

const medicamentos = ref<Medicamento[]>([])
const proveedores = ref<Proveedor[]>([])

const lote = ref<Lote>({ ...props.lote })

watch(
  () => props.lote,
  (newVal) => {
    lote.value = { ...newVal }
  },
)

async function obtenerMedicamentos() {
  medicamentos.value = await http.get('medicamentos').then((res) => res.data)
}

async function obtenerProveedores() {
  proveedores.value = await http.get('proveedores').then((res) => res.data)
}
async function obtenerCodigo() {
  const response = await http.get('lotes/siguiente-codigo')

  codigoPreview.value = response.data.codigo
}

const DIAS_MINIMOS_VIGENCIA = 30

async function handleSave() {
  try {
    const body = {
      idMedicamento: lote.value.idMedicamento,
      idProveedor: lote.value.idProveedor,
      stock: lote.value.stock,
      fechaVencimiento: lote.value.fechaVencimiento,
    }

    console.log(body)

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${lote.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')

    lote.value = {} as Lote

    dialogVisible.value = false
  } catch (error: any) {
    console.log(error.response?.data)

    alert(error?.response?.data?.message)
  }
}
const fechaMinima = ref(new Date())

fechaMinima.value.setDate(
  fechaMinima.value.getDate() + DIAS_MINIMOS_VIGENCIA
)

const codigoPreview = ref('')

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerMedicamentos()
      obtenerProveedores()

      if (!props.modoEdicion) {
        obtenerCodigo()
      }

      if (props.lote?.id) {
        lote.value = { ...props.lote }
      } else {
        lote.value = {
          idMedicamento: 0,
          idProveedor: 0,
          stock: 0,
        } as Lote
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Lote'"
      style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label class="font-semibold w-3">
          Código
        </label>

        <InputText v-model="codigoPreview" disabled class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="medicamento" class="font-semibold w-3">
          Medicamento
        </label>

        <Select id="medicamento" v-model="lote.idMedicamento" :options="medicamentos" optionLabel="nombre"
          optionValue="id" class="flex-auto" autofocus />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="proveedor" class="font-semibold w-3">
          Proveedor
        </label>

        <Select id="proveedor" v-model="lote.idProveedor" :options="proveedores" optionLabel="nombre" optionValue="id"
          class="flex-auto" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-3">
          Stock
        </label>

        <InputNumber id="stock" v-model="lote.stock" class="flex-auto" :min="0" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fechaVencimiento" class="font-semibold w-3">
          Fecha
        </label>

        <DatePicker v-model="lote.fechaVencimiento" :minDate="fechaMinima" showIcon class="flex-auto" />
      </div>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary" @click="dialogVisible = false" />

        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>