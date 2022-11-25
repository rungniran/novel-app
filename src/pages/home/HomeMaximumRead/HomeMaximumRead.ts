import { Gatway } from "@/shares/services";
import { _Base } from "@/pages/index";
//  ___________________________________________________________logic_________________________________________________________________

class _HomeMaximumRead extends _Base {
  _ReduceNovel(object:any[]):any[]{
    const result = object.reduce((resultArray: any, item, index) => {
      const chunkIndex = Math.floor(index / 3) as any;
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] as any;
      }
      resultArray[chunkIndex].push({ ...item, ranking: index });
      return resultArray;
    }, []);
    return result
  }

  async _SortData(object:any[]):Promise<any[]>{
    const result = object.sort((a, b) => {
      return parseInt(b.novel_transaction_datas_count) - parseInt(a.novel_transaction_datas_count);
    });
    return result
  }
}

class _HomeMaximumReadSetData extends _HomeMaximumRead {
  public NovelMaximumRead:any|null
  public NovelMaximumReadValue:any|null
  async _NovelReadNext(value:string):Promise<any>{
    try {
      const getNextread = await Gatway.getService( `/guest/index/novel-maximum-read?day=${value}`);
      this.NovelMaximumReadValue = value
      this.NovelMaximumRead = getNextread.data.data
    } catch (error) {
      console.log(error)
    }
    
    
  }
}

export { _HomeMaximumRead,_HomeMaximumReadSetData }