import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  async getCharacters(page: number): Promise<Character> {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`,
    );
    return response.data;
  }
}
