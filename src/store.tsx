import { BehaviorSubject, map, combineLatestWith } from "rxjs";

export interface IPokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power?: number;
  selected?: boolean;
}

// NOTE: observe 구분자 $
export const rawPokemon$ = new BehaviorSubject<IPokemon[]>([]);

// NOTE: pipe 오퍼레이터를 통해 파라미터로 전달된 새로운 observable 인스턴스를 반환
export const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((value) => ({
      ...value,
      power:
        value.hp +
        value.attack +
        value.defense +
        value.special_attack +
        value.special_defense +
        value.speed,
    }))
  )
);

export const selected$ = new BehaviorSubject<number[]>([]);

fetch("/pokemon-simplified.json")
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));
