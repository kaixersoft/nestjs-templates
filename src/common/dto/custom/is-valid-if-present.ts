/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidIfPresent(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidIfPresent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (value !== null && value !== undefined && value !== '') {
            return (
              relatedValue !== null &&
              relatedValue !== undefined &&
              relatedValue !== ''
            );
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `$property is defined but ${relatedPropertyName} is not defined`;
        },
      },
    });
  };
}
