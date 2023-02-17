import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {CategoriaProducto} from './categoria-producto.model';
import {Categoria} from './categoria.model';
import {Imagen} from './imagen.model';
import {Marca} from './marca.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_marca_producto: {
        name: 'fk_marca_id_producto',
        entity: 'Producto',
        entityKey: 'id',
        foreignKey: 'id_marca',
      }
    },
  },
})
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  existencia?: number;

  @property({
    type: 'number',
    default: 0,
  })
  calificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;


  //Producto tiene una marca
  @hasMany(() => Categoria, {through: {model: () => CategoriaProducto, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => Imagen, {keyTo: 'id_producto'})
  imagenes: Imagen[];
  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
