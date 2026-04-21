# sis257_Farmacia
Sistema de Gestión de Farmacia
El presente proyecto consiste en el desarrollo de un sistema web para la gestión de una farmacia. El sistema permitirá administrar la venta de medicamentos, el control de inventario, la gestión de proveedores y el registro de clientes.

El sistema busca automatizar procesos manuales, reducir errores en el control de stock y mejorar la eficiencia en la atención al cliente.

Modelo de BD
Proveedor
id_proveedor (PK)
nombre
telefono
direccion
correo

Medicamento
id_medicamento (PK)
nombre
descripcion
precio
stock
fecha_vencimiento
id_categoria (FK)
id_proveedor (FK)

Cliente
id_cliente (PK)
ci 
nombre
apellido
telefono
direccion

Usuario
id_usuario (PK)
nombre
correo
password
rol

Venta
id_venta (PK)
fecha
total
id_usuario (FK)
id_cliente (FK)

DetalleVenta
id_detalle (PK)
id_venta (FK)
id_medicamento (FK)
cantidad
precio_unitario
subtotal
Categoría

id_categoria (PK)
nombre
descripcion
