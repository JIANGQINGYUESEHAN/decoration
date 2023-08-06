import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from "class-validator";
import { DataSource, ObjectType, Repository } from "typeorm";
import { isNil } from 'lodash'
type Condition = {
  entity: ObjectType<any>
  IsTrue?: boolean
  map?: string

}
@Injectable()
@ValidatorConstraint({ async: true, name: 'UniqueConstraint' })
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(protected dataSource: DataSource) { }
  async validate(value: any, args?: ValidationArguments) {
    let map, IsTrue
    let Repo: Repository<any>
    map = args.constraints[0].map ?? args.property
    IsTrue = args.constraints[0].IsTrue || false

    //获取entity
    if (('entity' in args.constraints[0])) {

      Repo = this.dataSource.getRepository(args.constraints[0].entity)
    } else {
      Repo = this.dataSource.getRepository(args.constraints[0])
    }

    //进行查询
    let IsExit = await Repo.createQueryBuilder()
      .where({ [map]: value })
      .getOne()
    if (!IsTrue) {
      //验证存在时
      if (IsExit == null) {

        return true
      }
    } else {
      //验证不存在时
      if (IsExit == null) {

        return false
      }
    }




  }
  defaultMessage?(args?: ValidationArguments) {
    const { entity, property } = args.constraints[0];
    const queryProperty = property ?? args.property;
    if (!entity) {
      return 'Model not been specified!';
    }
    return `${queryProperty} of ${entity.name} must been unique!`;
  }



}
export function UniqueConstraintFun(param: Condition | ObjectType<any>, args?: ValidatorOptions) {
  return (obj: Record<string, any>, propertyName: any) => {
    registerDecorator({
      target: obj.constructor,
      propertyName,
      validator: UniqueConstraint,
      options: args,
      constraints: [param]

    })
  }
}
