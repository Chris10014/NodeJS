import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Dishes} from '../models';
import {DishesRepository} from '../repositories';

export class DishesController {
  constructor(
    @repository(DishesRepository)
    public dishesRepository : DishesRepository,
  ) {}

  @post('/dishes')
  @response(200, {
    description: 'Dishes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dishes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dishes, {
            title: 'NewDishes',
            exclude: ['id'],
          }),
        },
      },
    })
    dishes: Omit<Dishes, 'id'>,
  ): Promise<Dishes> {
    return this.dishesRepository.create(dishes);
  }

  @get('/dishes/count')
  @response(200, {
    description: 'Dishes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dishes) where?: Where<Dishes>,
  ): Promise<Count> {
    return this.dishesRepository.count(where);
  }

  @get('/dishes')
  @response(200, {
    description: 'Array of Dishes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dishes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dishes) filter?: Filter<Dishes>,
  ): Promise<Dishes[]> {
    return this.dishesRepository.find(filter);
  }

  @patch('/dishes')
  @response(200, {
    description: 'Dishes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dishes, {partial: true}),
        },
      },
    })
    dishes: Dishes,
    @param.where(Dishes) where?: Where<Dishes>,
  ): Promise<Count> {
    return this.dishesRepository.updateAll(dishes, where);
  }

  @get('/dishes/{id}')
  @response(200, {
    description: 'Dishes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dishes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Dishes, {exclude: 'where'}) filter?: FilterExcludingWhere<Dishes>
  ): Promise<Dishes> {
    return this.dishesRepository.findById(id, filter);
  }

  @patch('/dishes/{id}')
  @response(204, {
    description: 'Dishes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dishes, {partial: true}),
        },
      },
    })
    dishes: Dishes,
  ): Promise<void> {
    await this.dishesRepository.updateById(id, dishes);
  }

  @put('/dishes/{id}')
  @response(204, {
    description: 'Dishes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dishes: Dishes,
  ): Promise<void> {
    await this.dishesRepository.replaceById(id, dishes);
  }

  @del('/dishes/{id}')
  @response(204, {
    description: 'Dishes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dishesRepository.deleteById(id);
  }
}
