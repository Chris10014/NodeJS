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
import {Promotions} from '../models';
import {PromotionsRepository} from '../repositories';

export class PromotionsController {
  constructor(
    @repository(PromotionsRepository)
    public promotionsRepository : PromotionsRepository,
  ) {}

  @post('/promotions')
  @response(200, {
    description: 'Promotions model instance',
    content: {'application/json': {schema: getModelSchemaRef(Promotions)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotions, {
            title: 'NewPromotions',
            exclude: ['id'],
          }),
        },
      },
    })
    promotions: Omit<Promotions, 'id'>,
  ): Promise<Promotions> {
    return this.promotionsRepository.create(promotions);
  }

  @get('/promotions/count')
  @response(200, {
    description: 'Promotions model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Promotions) where?: Where<Promotions>,
  ): Promise<Count> {
    return this.promotionsRepository.count(where);
  }

  @get('/promotions')
  @response(200, {
    description: 'Array of Promotions model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Promotions, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Promotions) filter?: Filter<Promotions>,
  ): Promise<Promotions[]> {
    return this.promotionsRepository.find(filter);
  }

  @patch('/promotions')
  @response(200, {
    description: 'Promotions PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotions, {partial: true}),
        },
      },
    })
    promotions: Promotions,
    @param.where(Promotions) where?: Where<Promotions>,
  ): Promise<Count> {
    return this.promotionsRepository.updateAll(promotions, where);
  }

  @get('/promotions/{id}')
  @response(200, {
    description: 'Promotions model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Promotions, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Promotions, {exclude: 'where'}) filter?: FilterExcludingWhere<Promotions>
  ): Promise<Promotions> {
    return this.promotionsRepository.findById(id, filter);
  }

  @patch('/promotions/{id}')
  @response(204, {
    description: 'Promotions PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotions, {partial: true}),
        },
      },
    })
    promotions: Promotions,
  ): Promise<void> {
    await this.promotionsRepository.updateById(id, promotions);
  }

  @put('/promotions/{id}')
  @response(204, {
    description: 'Promotions PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() promotions: Promotions,
  ): Promise<void> {
    await this.promotionsRepository.replaceById(id, promotions);
  }

  @del('/promotions/{id}')
  @response(204, {
    description: 'Promotions DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.promotionsRepository.deleteById(id);
  }
}
