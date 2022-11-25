import {_Base} from "@/pages/index"
import { Gatway } from "@/shares/services";
class _NovelPreview extends _Base{
  _defaultArrayID(item:any[]):string[]{
    const array = [] as string[]
    item.forEach((element) => {
      array.push(element.id)
    });
    return array
  }

  _arrayLike(array1:string[], array2:string[]):boolean{
    if(JSON.stringify(array1)  !== JSON.stringify(array2)) {
      return false
    }else{
      return  true
    }
  }

  _changeNodeList(ep:any[],arrayUuid:any[], changeCoin = null as number|null ):any[]{
    const data = [] as any
    ep.forEach((element1: any) => {
      const changecoin = arrayUuid.find((element) => {
        return Boolean(element == element1.id);
      });
      if(changecoin){
        changeCoin ? data.push({...element1, coin: changeCoin }) : null
      }else{
        data.push(element1)
      }
    });
    return data
    
  }
}

class _NovelPreviewData {
  public getEpisodeData:any|null
  public getEpisodeDataID:string | null | undefined
}

class _NovelPreviewSetData extends _NovelPreviewData{
  async _setEpisodeData(id:string):Promise<void>{
    try {
      this.getEpisodeDataID = id
      const resEpisodeData = await Gatway.getService(
        `/customers/episode_data/index/${id}`
      );
      this.getEpisodeData = resEpisodeData.data.data
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async _setCoin(object:any[]):Promise<any>{
    try {
      const res = await Gatway.PutService("/customers/user-info", "change-coin", object as any);
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async _setDelete(object:any[]):Promise<any>{
    try {
      const res = await Gatway.postService("/customers/user-info/delete-ep", object as any);
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  }
}
class _NovelPreviewElement {
  _more() {
    const story = document.getElementsByClassName("story")[0] as HTMLElement;
    const more = document.getElementsByClassName("more")[0] as HTMLElement;
    const ade = document.getElementsByClassName("ade")[0] as HTMLElement;
    if (story.style.height == "200px") {
      story.style.height = story.scrollHeight + "px";
      more.innerHTML = "ย่อลง";
      ade.style.display = "none";
    } else {
      story.style.height = 200 + "px";
      more.innerHTML = "ดูเพิ่มเติม";
      ade.style.display = "flex";
    }
  }
}
export {_NovelPreview, _NovelPreviewSetData, _NovelPreviewElement}