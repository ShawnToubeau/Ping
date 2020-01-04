import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    const getUrl = `${this.rootUrl}/${id}`;
    return axios.get(getUrl);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      const putUrl = `${this.rootUrl}/${id}`;
      return axios.put(putUrl, data);
    } else {
      const postUrl = `${this.rootUrl}`;
      return axios.post(postUrl, data);
    }
  }
}
