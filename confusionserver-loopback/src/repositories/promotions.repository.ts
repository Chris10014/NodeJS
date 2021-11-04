import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Promotions, PromotionsRelations} from '../models';

export class PromotionsRepository extends DefaultCrudRepository<
  Promotions,
  typeof Promotions.prototype.id,
  PromotionsRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Promotions, dataSource);
  }
}
