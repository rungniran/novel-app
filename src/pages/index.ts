
import { Gatway } from "@/shares/services";

class _Base  {
  _makeUniqueRandom(numRandoms: []): any[]|null {

    const nums = numRandoms as any;
    if (nums) {
      const ranNums = [] as any;
      let i = nums.length as any;
      let j = 0 as any;
      while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
      }
      return ranNums;
    }else{
      return null
    }
  }
  _getRecommend(object: any[]): any[] | null {
    const data = [] as any;
    object.forEach((element: any) => {
      if (element.novel_data) {
        data.push({
          ...element.novel_data,
          novel_episode_data_total: element.novel_data.ep_total_preview,
        });
      }
    });
    return data.length !== 0 ? this._makeUniqueRandom(data) : null;
  }

  _sort(EpisodeDatas:any[], key:string , sort = true):any{
    const data = sort === true 
    ? EpisodeDatas.sort((a: any, b: any) =>  a[key] - b[key] )
    : EpisodeDatas.sort((a: any, b: any) =>  b[key] - a[key] )
    return data
  }

  async _momentEp(countEp: any[]):Promise<any[]> {
    let ep = 0;
    let eplast  =  50 ;
    const eplastStas =  50 ;
    const arraymoment = ([]) as any;
    const count = countEp.length / eplast;
    const momentCount = count + 0.0;
    if (countEp.length > 0) {
      for (let i = 0; i < ~~ momentCount + 1; i++) {
        if (countEp.length <= eplast) {
          const item_list = countEp.slice(ep, eplast)
          const list_last =item_list.length - 1
          arraymoment.push({
            moment: `บทที่ ${item_list[0]?.ep_no} - ${item_list[list_last]?.ep_no}`,
            ep: item_list,
          });
          ep = +eplast;
          eplast = eplast + eplast;
        } else {
          const item_list = countEp.slice(ep, eplast)
          const list_last = item_list.length - 1
          arraymoment.push({
            moment: `บทที่ ${item_list[0]?.ep_no} - ${item_list[list_last]?.ep_no}`,
            ep: item_list,
          });
          ep = +eplast;
          eplast = eplast + eplastStas;
        }
      }
    }
    return arraymoment
  }

  _dataUrl(item:any, type = "Novel"):string {
    console.log(type);
    
    if (item) {
      const cutpath = item.url.replaceAll('https://119.59.97.111/public/publicImages/', '')
      return cutpath === '' ? 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png' : item.url
    } else{
      return 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png'
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _findIndex(item:any[], key:any):number{
    return item.findIndex((object) => {
      return object.id === key;
    });
  }
  
}

class _BaseSetData {
  public RecommendedNovel:any|null
  async _RecommendedNovel(): Promise<any> {
    try {
      const getRecommend = await Gatway.getService("/guest/recommended-novel");
      this.RecommendedNovel = getRecommend.data.data
    } catch (error) {
      console.log(error);
    }
  }
}



class _PageComment {
  
}

export { _Base, _BaseSetData }

