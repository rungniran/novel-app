// import { Gatway } from "@/shares/services"
import { _Base,_BaseSetData } from "@/pages/index";

class _Category extends _Base {
  _novelAll(ojb: any[]):any {
    const NovelAll = [] as any;
    ojb.forEach((element: any) => {
      NovelAll.push(...element.novel_datas);
    });
    return NovelAll;
  }
}

class _CategorySetData extends _BaseSetData{
  
}


export { _Category, _CategorySetData }