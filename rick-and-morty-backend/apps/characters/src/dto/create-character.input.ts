import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  status: string;
  @Field()
  species: string;
  @Field()
  gender: string;
  @Field()
  image: string;
  @Field()
  url: string;
}
