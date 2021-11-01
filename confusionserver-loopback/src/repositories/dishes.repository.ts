import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Dishes, DishesRelations} from '../models';

export class DishesRepository extends DefaultCrudRepository<
  Dishes,
  typeof Dishes.prototype._id,
  DishesRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Dishes, dataSource);
  }
}
