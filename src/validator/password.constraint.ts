import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { ObjectType } from "typeorm";




@Injectable()
@ValidatorConstraint({ name: "passwordEqual", async: true })
export class RegularValidationConstraint
  implements ValidatorConstraintInterface {

  validate(value: any, args?: ValidationArguments) {
    let rex: RegExp = args.constraints[0]
    if (!rex) {
      return false
    }
    //存在验证进行验证
    if (rex.test(value)) {
      return true
    } else {

      return false;
    }

  }

  defaultMessage(args?: ValidationArguments): string {
    let rex = args.constraints[0]
    if (!rex) {
      return "请输入具体规则"
    }
    return "条件不符合"
  }

}

export function IsRegular(rex: RegExp, args?: ValidationOptions) {
  return (obj: Record<any, any>, propertyName: any) => {
    registerDecorator({
      target: obj.constructor,
      propertyName,
      options: args,
      validator: RegularValidationConstraint,
      constraints: [rex]
    })
  }
}
