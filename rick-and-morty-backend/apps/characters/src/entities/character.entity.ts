import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Info {
  @Field()
  count: number;

  @Field()
  pages: number;

  @Field()
  next: string;

  @Field()
  prev: string;
}
@ObjectType()
export class Location {
  @Field()
  name: string;
  @Field()
  url: string;
}

@ObjectType()
export class Result {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  status: string;
  @Field()
  species: string;
  @Field()
  type: string;
  @Field()
  gender: string;
  @Field()
  origin: Location;
  @Field()
  location: Location;
  @Field()
  image: string;
  @Field(() => [String], { description: 'List of episodes' })
  episode: string[];
  @Field()
  url: string;
}

@ObjectType()
export class Character {
  @Field(() => Info)
  info: Info;

  @Field(() => [Result])
  results: Result[];
}
