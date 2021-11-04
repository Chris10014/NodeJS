import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Leaders extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
    required: true,
  })
  designation: string;

  @property({
    type: 'string',
    required: true,
  })
  abbr: string;

  @property({
    type: 'boolean',
    default: false,
  })
  featured?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Leaders>) {
    super(data);
  }
}

export interface LeadersRelations {
  // describe navigational properties here
}

export type LeadersWithRelations = Leaders & LeadersRelations;
