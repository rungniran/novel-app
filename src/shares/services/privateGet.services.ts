import { Gatway } from '.';
// import api from './baseURL';
export const GetService = {
  getNovel(uuid:string):any{
    return Gatway.getIDService('/customers/novel', uuid)
  },
}

