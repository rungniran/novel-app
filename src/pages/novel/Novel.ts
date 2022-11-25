/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Gatway, Publics } from "@/shares/services";
import {_Base,_BaseSetData} from "@/pages/index"

class _Novel extends _Base{
  _readNext(item:any[], id:string):string|null{
    if (item) {
      const index = item.findIndex((object:any) => object.id === id);
      return index !== -1 
      ? item[index]?.id_ep 
      : null ;
    }else{
      return null
    }
    // console.log(index);
    // if (item) {
    //   const index = item.findIndex((object:any) => object.id === id);
    //   return index !== -1 ? item[index]?.id_ep : dataMomentEp[0].ep[0].id;
    // } else {
    //   return dataMomentEp[0].ep[0].id;
    // }
    return ''
  }


  _Tags(res:any):any[]{
    if (res.tags.length !== 0) {
        const arrayTags = JSON.parse (res.tags)
        res?.novel_data_type_preview ? arrayTags.unshift(res?.novel_data_type_preview) : null
        res?.novel_rating_data_preview ? arrayTags.unshift(res?.novel_rating_data_preview) : null
        res?.status_end_novel === true ? arrayTags.unshift('นิยายจบแล้ว') :null
        res?.novel_category_data_preview ? arrayTags.unshift(res?.novel_category_data_preview) : null
        return arrayTags;
      }else{
        const arrayTags = [] as any
        res?.novel_data_type_preview ? arrayTags.unshift(res?.novel_data_type_preview) : null
        res?.novel_rating_data_preview ? arrayTags.unshift(res?.novel_rating_data_preview) : null
        res?.status_end_novel === true ? arrayTags.unshift('นิยายจบแล้ว') : null
        res?.novel_category_data_preview ? arrayTags.unshift(res?.novel_category_data_preview) : null
        console.log('assssssss',arrayTags);
        return  arrayTags;
      }
  }
}


class _NovelSetdata extends _BaseSetData {
  public _getReview : any|null
  async _setCommentAll(object:any, path:string){
    try {
      const res = await Publics.postService("/guest/comments/" + path , object);
      if(path === 'comment-preview'){
        this._getReview = res.data.data
      }
      return res.data.data
    } catch (error) {
      console.log(error);
      
    }
  }
  async _cleckfollow(userID:string){
    try {
      const res = await Gatway.postService("/customers/follow-datas/check-follow", { user_id: userID } as any);
      return res
    } catch (error) {
      console.log(error);
      
    }
  }

  _setModelComment(html:any, id:string){
    const data = {
      click_dislike: "",
      click_like: "",
      comment: html,
      comment_data_type_id: "",
      created_at: "",
      id: "",
      menu_order: "",
      novel_data_id: "",
      novel_episode_data: "",
      ref: "",
      ref_comment_id: "",
      reply_comment: "",
      star: "",
      table: "",
      timestamp: "",
      user: {
        user_profile_datas: [
          {
            user_nickname: id,
          },
        ],
      },
      user_id: "",
    }

    return data
  }
}


class _NovelElement {
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
  _openEp(key: number, open = 0): void {
    const con_ep = document.getElementsByClassName("container-ep")[
      key
    ] as HTMLElement;

    const chevron = document.getElementsByClassName("fa-chevron-right")[
      key
    ] as HTMLElement;
    if (open === 1) {
      con_ep?.classList.add("container-ep-show");
      chevron?.classList.add("fa-chevron-right-show");
    } else if (open === 2) {
      con_ep?.classList.remove("container-ep-show");
      chevron?.classList.remove("fa-chevron-right-show");
    } else {
      con_ep?.classList.toggle("container-ep-show");
      chevron?.classList.toggle("fa-chevron-right-show");
    }
  }
  status_hide(item:any){
    if(  item.status_hide_ep){
      return !item.bought 
      ? {
          style:'border-bottom: 1px solid #e8e5e5;     color: #b9b9b9;',
          status: true,
          view:true
        }  
      : {
          style:'border-bottom: 1px solid #e8e5e5;     color:#b9b9b9;',
          status: false,
          view:true
        }  
    } else{
      return {
          style:'border-bottom: 1px solid #79dddf;',
          status: false,
          view:false
        }

    }
    
  }
   
  
}
export { _Novel ,_NovelSetdata, _NovelElement}