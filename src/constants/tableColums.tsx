import {CharacterType, DataType} from "../types/data-types";
import RenderItemTitle from "../components/common/ItemTitle";
import * as React from "react";

export interface I_ColumnObject {
  dataKey: string,
  formatter: (val: any) => any,
  title: string,
  width?: string,
  sorter?: any
}

type ColumnsKeys = 'character' | 'alive' | 'gender' | 'culture' | 'allegiances' | 'books';

const tableColumns: {[key in ColumnsKeys] : I_ColumnObject} = {
  character: {
    dataKey: 'name',
    formatter: (val: CharacterType) => [val.name, ...val.aliases].filter(str => str).join(', '),
    title: 'Character',
  },
  alive: {
    dataKey: '',
    formatter: (val: CharacterType) => {
      if (!val.died) return 'Yes';
      if (!val.born) return `No, ${val.died.toString()}`;
      let {born, died}: {born: string, died: string} = val;
      let bornToNum = born.split(' ').filter(num => Number.isInteger(+num))[0];
      let diedToNum = died.split(' ').filter(num => Number.isInteger(+num))[0];
      if (bornToNum && diedToNum) return `No, Died at ${+diedToNum - +bornToNum} years old.`;
      return died;
    },
    title: 'Alive',
  },
  gender: {
    dataKey: 'gender',
    formatter: (val: CharacterType) => val.gender.toString(),
    title: 'Gender',
  },
  culture: {
    dataKey: 'culture',
    formatter: (val: CharacterType) => val.culture ? val.culture.toString() : 'Unknown',
    title: 'Culture',
  },
  allegiances: {
    dataKey: 'allegiances',
    formatter: (val: CharacterType) => val.allegiances.map(url => (<RenderItemTitle link={url} />)),
    title: 'Allegiances',
  },
  books: {
    dataKey: 'books',
    formatter: (val: CharacterType) => val.books.map(url => (<RenderItemTitle link={url} />)),
    ///Discided to display links to books
    title: '# of Books',
  },
};

const selectColumnsKeys = (_dataType: DataType): ColumnsKeys[] => {
  ///TODO can be used for display of other dataTypes tables
  switch (_dataType) {
    case "books": return [];
    case "characters": return ['character', 'alive', 'gender', 'culture', 'allegiances', 'books'];
    case "houses": return [];
  }
};

export const selectTableColumns = (_dataType: DataType): I_ColumnObject[] => {
  const arr = selectColumnsKeys(_dataType);
  return arr.map(key => tableColumns[key])
};