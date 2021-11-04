import {Entity, model, property} from '@loopback/repository';

@model()
export class Favourites extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
    required: true,
  })
  user: object;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  dishes: object[];

  @property({
    type: 'date',
    id: true,
  })
  createdAt?: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;


  constructor(data?: Partial<Favourites>) {
    super(data);
  }
}

export interface FavouritesRelations {
  // describe navigational properties here
}

export type FavouritesWithRelations = Favourites & FavouritesRelations;
