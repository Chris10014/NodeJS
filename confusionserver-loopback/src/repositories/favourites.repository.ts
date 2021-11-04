import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Favourites, FavouritesRelations} from '../models';

export class FavouritesRepository extends DefaultCrudRepository<
  Favourites,
  typeof Favourites.prototype.createdAt,
  FavouritesRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Favourites, dataSource);
  }
}
