import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  excerpt!: string;

  @Field()
  updatedAt!: Date;
}
