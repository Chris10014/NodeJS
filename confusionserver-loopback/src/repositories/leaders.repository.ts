import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Leaders, LeadersRelations} from '../models';

export class LeadersRepository extends DefaultCrudRepository<
  Leaders,
  typeof Leaders.prototype.id,
  LeadersRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Leaders, dataSource);
  }
}
