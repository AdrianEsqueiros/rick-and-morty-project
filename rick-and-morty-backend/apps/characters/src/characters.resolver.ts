import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(private charactersService: CharactersService) {}

  @Query(() => Character, { name: 'characters' })
  async getCharacters(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Character> {
    return this.charactersService.getCharacters(page);
  }
}
