export type DataType = 'books' | 'characters' | 'houses'
export type DataPayloadType = BookType | CharacterType | HouseType
export type PaginatorKeys = 'next' |'first' |'last' | 'prev';

export type PaginatorProps = {
  [key in PaginatorKeys]: string
}

type DefaultDataType = {
  "id": string,
  _dataType: DataType
}

export type CharacterType = DefaultDataType & {
  "url": string,
  "name": string,
  "gender": string,
  "culture": string,
  "born": string,
  "died": string,
  "titles": string[],
  "aliases": string[],
  "father": string,
  "mother": string,
  "spouse": string,
  "allegiances": string[],
  "books": string[],
  "povBooks": string[],
  "tvSeries": string[],
  "playedBy": string[]
} & {[key: string]: string | string[]}

export type BookType = DefaultDataType & {
  authors: string[],
  characters: string[],
  country: string,
  isbn: string,
  mediaType: string,
  name: string,
  numberOfPages: number,
  povCharacters: string[],
  publisher: string,
  released: string,
  url: string,
} & {[key: string]: string | string[]}

export type HouseType = DefaultDataType & {
  "url": string,
  "name": string,
  "region": string,
  "coatOfArms": string,
  "words": string,
  "titles": string[],
  "seats": string[],
  "currentLord": string,
  "heir": string,
  "overlord": string,
  "founded": string,
  "founder": string,
  "diedOut": string,
  "ancestralWeapons": string[],
  "cadetBranches": string[],
  "swornMembers": string[]
} & {[key: string]: string | string[]}

export type I_DataState = {
  readonly [key in DataType]: {
    [key: string]: DataPayloadType
  }
} & {
  readonly _paginate: {
    readonly [key in DataType]: PaginatorProps | null
  }
  readonly ids: {
    readonly [key in DataType]: string[]
  }
}