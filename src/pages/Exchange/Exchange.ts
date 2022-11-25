
import { Gatway } from "@/shares/services";

class _Exchange {
  _AllProduct(item: any[]):any[] {
    const Product = [] as any;
    item.forEach((element: any) => {
      Product.push(...element.shop_item_datas);
    });
    return Product;
  }
}

class _ExchangeData{
  public getExchange:any|null
}


class _ExchangesetData extends _ExchangeData{
  private logic = new _Exchange
  async _setExchange():Promise<void>{
    try {
      const dataset = {
        shop_type_data_id: "7dc9abbc-d3b3-4b48-ac77-29d00a70469e",
      }
      const res = await Gatway.postService("/guest/shop-data/lists", dataset as any)
      console.log(this.logic._AllProduct(res.data.data));
      
      this.getExchange = this.logic._AllProduct(res.data.data)
    } catch (error) {
      console.log(error);
      
    }
  }
}
export { _Exchange, _ExchangesetData }