import {Entity, model, property} from '@loopback/repository';

@model()
export class Promotions extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    default: false,
  })
  featured?: boolean;


  constructor(data?: Partial<Promotions>) {
    super(data);
  }
}

export interface PromotionsRelations {
  // describe navigational properties here
}

export type PromotionsWithRelations = Promotions & PromotionsRelations;
