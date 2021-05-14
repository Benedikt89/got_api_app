import {PersonItemType} from "../../types/data-types";
import axios from "axios";

export const dataAPI = {
  getData: async (): Promise<never | PersonItemType[]> => {
    let result: PersonItemType[] = [];
    const res = await axios.get('https://anapioficeandfire.com/api/books');

    if (res.data) {
      console.log(res);
    }
    return result;
  }
};