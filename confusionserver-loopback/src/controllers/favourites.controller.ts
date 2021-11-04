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
import {Favourites} from '../models';
import {FavouritesRepository} from '../repositories';

export class FavouritesController {
  constructor(
    @repository(FavouritesRepository)
    public favouritesRepository : FavouritesRepository,
  ) {}

  @post('/favourites')
  @response(200, {
    description: 'Favourites model instance',
    content: {'application/json': {schema: getModelSchemaRef(Favourites)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Favourites, {
            title: 'NewFavourites',
            exclude: ['id'],
          }),
        },
      },
    })
    favourites: Omit<Favourites, 'id'>,
  ): Promise<Favourites> {
    return this.favouritesRepository.create(favourites);
  }

  @get('/favourites/count')
  @response(200, {
    description: 'Favourites model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Favourites) where?: Where<Favourites>,
  ): Promise<Count> {
    return this.favouritesRepository.count(where);
  }

  @get('/favourites')
  @response(200, {
    description: 'Array of Favourites model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Favourites, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Favourites) filter?: Filter<Favourites>,
  ): Promise<Favourites[]> {
    return this.favouritesRepository.find(filter);
  }

  @patch('/favourites')
  @response(200, {
    description: 'Favourites PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Favourites, {partial: true}),
        },
      },
    })
    favourites: Favourites,
    @param.where(Favourites) where?: Where<Favourites>,
  ): Promise<Count> {
    return this.favouritesRepository.updateAll(favourites, where);
  }

  @get('/favourites/{id}')
  @response(200, {
    description: 'Favourites model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Favourites, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Favourites, {exclude: 'where'}) filter?: FilterExcludingWhere<Favourites>
  ): Promise<Favourites> {
    return this.favouritesRepository.findById(id, filter);
  }

  @patch('/favourites/{id}')
  @response(204, {
    description: 'Favourites PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Favourites, {partial: true}),
        },
      },
    })
    favourites: Favourites,
  ): Promise<void> {
    await this.favouritesRepository.updateById(id, favourites);
  }

  @put('/favourites/{id}')
  @response(204, {
    description: 'Favourites PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() favourites: Favourites,
  ): Promise<void> {
    await this.favouritesRepository.replaceById(id, favourites);
  }

  @del('/favourites/{id}')
  @response(204, {
    description: 'Favourites DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.favouritesRepository.deleteById(id);
  }
}
