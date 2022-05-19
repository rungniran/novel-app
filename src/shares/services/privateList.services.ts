import { Gatway } from '.';
// import api from './baseURL';
export const ListService = {
  listRating():any{
    return Gatway.getService('/miscellaneous/fetch/novel_data/novel_rating_data_id')
  },
  listCategory():any{
    return Gatway.getService('/miscellaneous/fetch/novel_data/novel_category_data_id')
  },
  listNoveltype():any{
    return Gatway.getService('/miscellaneous/fetch/novel_data/novel_data_type_id')
  },
  listNovel():any{
    return Gatway.getService('/customers/novel')
  },
  
}
