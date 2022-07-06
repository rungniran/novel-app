

export enum TypeStatusWallet {
  pending = '3f680d89-3c7f-49ab-9b95-835decaaabcd',
  successful = '98f7872f-fc93-4beb-b91d-abc2041d5914',
  failed = 'f8fbb972-3245-4e76-8e48-25084b2ec0d1'
}
export enum user_profile_data_type_id {
  Reader = 'a406c04d-3f50-4ea8-986e-315452753638',
  writer = 'ad794255-5441-4eb1-a7f5-31b5f6c6ff0f'
}

export enum shop_type_data_id {
  sticker = '9c1c64df-3516-4098-8575-1c3470206710',
  product = '7dc9abbc-d3b3-4b48-ac77-29d00a70469e',
  cover = 'a406c04d-3f50-4ea8-986e-315452753638',
  box = 'a406c04d-3f50-4ea8-986e-315452753638',
  utility = 'a406c04d-3f50-4ea8-986e-315452753638',
  
}

export enum sms_alert {
  Reader = 'a406c04d-3f50-4ea8-986e-315452753638',
  writer = 'ad794255-5441-4eb1-a7f5-31b5f6c6ff0f'
}

export enum transaction_type_data {
  AddMoney = '90199222-cb3e-4bcd-ba2b-806ca0f7d6f6',  
  BuyPet = '7db01d3d-5b0e-4548-83d5-5ca09538c974',
  Omise = 'd9f29607-1a36-4b6f-be37-a702268d3387',
  BuyNovel = 'c47de6c8-444c-4772-83ec-8aba82391abd',
  Activity = 'ef708dc4-208e-45b1-8b3c-8a28edd85b08',
  Free = 'c5b2a2a5-fda2-4415-9577-10dded75b12f',
  SellingNovels = 'c5b2a2a5-fda2-4415-9577-10dded75b122',

}

// ['id' => 'd9f29607-1a36-4b6f-be37-a702268d3387', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'เติ่มเงินผ่าน Omise',     'name_preview' => 'เติ่มเงินผ่าน Omise',     'value' => '+'],
// ['id' => '90199222-cb3e-4bcd-ba2b-806ca0f7d6f6', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'เติ่มเงิน',     'name_preview' => 'เติ่มเงิน',     'value' => '+'],
// ['id' => '7db01d3d-5b0e-4548-83d5-5ca09538c974', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'ซื้อสัตว์เลี้อง',  'name_preview' => 'ซื้อสัตว์เลี้อง',  'value' => '-'],
// ['id' => 'c47de6c8-444c-4772-83ec-8aba82391abd', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'ซื้อนิยาย',     'name_preview' => 'ซื้อนิยาย',  'value' => '-'],
// ['id' => 'ef708dc4-208e-45b1-8b3c-8a28edd85b08', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'activity',   'name_preview' => 'กิจกรรม',     'value' => '+'],
// ['id' => 'c5b2a2a5-fda2-4415-9577-10dded75b12f', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'free',       'name_preview' => 'ฟรี',         'value' => '+'],
// ['id' => 'c5b2a2a5-fda2-4415-9577-10dded75b122', 'table' => 'user_transaction_datas', 'tag' => 'transaction_type_data_id', 'name' => 'ขายนิยาย',       'name_preview' => 'ขายนิยาย',         'value' => '+'],