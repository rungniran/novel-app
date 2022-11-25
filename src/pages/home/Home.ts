import { Gatway, Publics } from "@/shares/services";
import { _Base,_BaseSetData } from "@/pages/index";
// const Base = new _Bases


//  ___________________________________________________________logic_________________________________________________________________


class _Home extends _Base {
  public Base = new _Base
  _NovelData(model: any[], res: any[]): any {
    const data = [] as any;
    model.forEach((element: any) => {
      res.forEach((elementres: any) => {
        if (elementres) {
          if (elementres.id === element.id) {
            data.push({ ...element, datail: elementres });
          }
        }
      });
    });
    return data
  }


  _statusname(object: any[]): any[] {
    const statusname = object.filter((element: any) => {
      return !element.table;
    });
    const fixedbanner = [] as any;
    const notfixedbanner = [] as any;
    statusname.forEach((element) => {
      if (element.random_status === true) {
        fixedbanner.push(element);
      } else {
        notfixedbanner.unshift(element);
      }
    });
    return fixedbanner.concat(this.Base._makeUniqueRandom(notfixedbanner))
  }

  async _setBanner2(object:any[]):Promise <any> {
    if (object.length === 0) {
      return null;
    } else {
      const randomdata = [] as any;
      object.filter((element: any) => {
        if (element.ref) {
          randomdata.push(element);
        }
      });
      const data =  this.Base._makeUniqueRandom(randomdata)
      return data
    }
   }

}


// ___________________________________________________________รับค่า________________________________________________________________________



class _HomeData  {
  public BaseSetData = _BaseSetData
  public Banner: any | null
  public NovelHot: any | null
  public RecommendedNovel: any | null
  public ThaiNationalBookFair: any | null
  public NovelLastUpdate: any | null
  public NovelDataReadNext: any | null
  public Banner2: any | null
  public NovelDataReadNextModel: any | null
  public Campaign:any | null
  public CampaignList:any[] | null | undefined
}


// ___________________________________________________________เซตค่า________________________________________________________________________


class _HomeSetData extends _HomeData {
  public logic = new _Home
  public Base = new _Base


  async _Banner(): Promise<void> {
    try {
      const banner = await Publics.getService("/guest/banner");
      this.Banner = banner.data.data
    } catch (error) {
      console.log(error);
    }
  }
  async _Campaign(): Promise<void> {
    try {
      // console.log(this.CampaignList);
      
      const campaign = await Publics.getService("guest/campaign-novel-datas");
      
      const campaignData = campaign.data.data.novel_in_campaign
      this.CampaignList = await this.logic.Base._makeUniqueRandom(
        campaignData as any
      );
      this.Campaign = campaign.data.data
    } catch (error) {
      console.log(error);
    }
  }
  async _NovelHot(): Promise<void> {
    try {
      const res = await Gatway.getService("/guest/index/novel-hot");
      this.NovelHot = res.data.data
    } catch (error) {
      console.log(error);
    }
  }

  async _RecommendedNovel(): Promise<void> {
    try {
      const getRecommend = await Publics.getService("/guest/recommended-novel");
      this.RecommendedNovel = getRecommend.data.data
    } catch (error) {
      console.log(error);
    }
  }

  async _ThaiNationalBookFair(): Promise<void> {
    try {
      const bookweek = await Gatway.getService("/guest/index/thai-national-book-fair");
      this.ThaiNationalBookFair = bookweek.data.data
    } catch (error) {
      this.ThaiNationalBookFair = null
      console.log(error);
      
    }
  }

  async _NovelLastUpdate(): Promise<void> {
    try {
      const res = await Publics.getService("/guest/index/novel-last-update");
      this.NovelLastUpdate = res.data.data
    } catch (error) {
      console.log(error);
    }
  }

  async _NovelData(model: any[]): Promise<void> {
    try {
      
      const res = await Gatway.postService("/customers/remembers/novel-data", model as any);
      this.NovelDataReadNextModel = model
      console.log(this.logic._NovelData(model, res.data.data));
      
      this.NovelDataReadNext =  this.logic._NovelData(model, res.data.data)
    } catch (error) {
      console.log(error);

    }

  }

  async _Banner2(): Promise<void>{
    try {
      const res = await Publics.getService("/guest/banner2");
      this.Banner2 = res.data.data
    } catch (error) {
      console.log(error);
    }
  } 


}
export { _Home, _HomeSetData }
