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
import {Leaders} from '../models';
import {LeadersRepository} from '../repositories';

export class LeadersController {
  constructor(
    @repository(LeadersRepository)
    public leadersRepository : LeadersRepository,
  ) {}

  @post('/leaders')
  @response(200, {
    description: 'Leaders model instance',
    content: {'application/json': {schema: getModelSchemaRef(Leaders)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaders, {
            title: 'NewLeaders',
            exclude: ['id'],
          }),
        },
      },
    })
    leaders: Omit<Leaders, 'id'>,
  ): Promise<Leaders> {
    return this.leadersRepository.create(leaders);
  }

  @get('/leaders/count')
  @response(200, {
    description: 'Leaders model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Leaders) where?: Where<Leaders>,
  ): Promise<Count> {
    return this.leadersRepository.count(where);
  }

  @get('/leaders')
  @response(200, {
    description: 'Array of Leaders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Leaders, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Leaders) filter?: Filter<Leaders>,
  ): Promise<Leaders[]> {
    return this.leadersRepository.find(filter);
  }

  @patch('/leaders')
  @response(200, {
    description: 'Leaders PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaders, {partial: true}),
        },
      },
    })
    leaders: Leaders,
    @param.where(Leaders) where?: Where<Leaders>,
  ): Promise<Count> {
    return this.leadersRepository.updateAll(leaders, where);
  }

  @get('/leaders/{id}')
  @response(200, {
    description: 'Leaders model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Leaders, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Leaders, {exclude: 'where'}) filter?: FilterExcludingWhere<Leaders>
  ): Promise<Leaders> {
    return this.leadersRepository.findById(id, filter);
  }

  @patch('/leaders/{id}')
  @response(204, {
    description: 'Leaders PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaders, {partial: true}),
        },
      },
    })
    leaders: Leaders,
  ): Promise<void> {
    await this.leadersRepository.updateById(id, leaders);
  }

  @put('/leaders/{id}')
  @response(204, {
    description: 'Leaders PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() leaders: Leaders,
  ): Promise<void> {
    await this.leadersRepository.replaceById(id, leaders);
  }

  @del('/leaders/{id}')
  @response(204, {
    description: 'Leaders DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.leadersRepository.deleteById(id);
  }
}
