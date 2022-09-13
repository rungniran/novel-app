export const CreateNovel = {
    selfNovel:{
        label: "นิยายแต่งเอง",
        value:27,

    },
    translatedNovel:{
        label: "นิยายแปล",
        value:28,

    }
}

export const CreateNovelAarry = [
    {
        label: "นิยายแต่งเอง",
        value:1,
    },
    {
        label: "นิยายแปล",
        value:2,

    }
]


export const monthset = {
    "01": "ม.ค.",
    "02": "ก.พ.",
    "03": "มี.ค.",
    "04": "เม.ย.",
    "05": "พ.ค.",
    "06": "มิ.ย.",
    "07": "ก.ค.",
    "08": "ส.ค.",
    "09": "ก.ย.",
    "10": "ต.ค.",
    "11": "พ.ย.",
    "12": "ธ.ค.",
  };

  export const  novel_promotion_type_data_id = {
    '9e6e98e6-e77f-4522-ae95-0d964ce6973f':{
        name:'ส่วนลด เปอร์เซ็น',
        name_preview:'ได้ส่วนลด ',
        value:'%'
    },
    'e214ff72-35fa-4d68-b0c3-9786f3925324':{
        name:'ส่วนลด ตอนละ',
        name_preview:'ลดราคาตอนละ',
        value:'เหรียญ'
    },
    'ac123486-d555-41a3-bc69-671266b7f547':{
        name:'ส่วนลด coin',
        name_preview:'ส่วนลด',
        value:'เหรียญ'
    }
  }

  export const  novel_promotion_type_fix_data_id = {
    'be084528-696d-40ea-ba35-2fb23e5e28ab':{
        name:'กำหนด ช่วงตอน',
        name_preview:'โปรโมชัน ตั้งแต่ตอนที่',
    },
    '4d0e3f6d-b458-458d-8e31-81c4a9d17836':{
        name:'ซื้อ มากกว่า',
        name_preview:'โปรโมชัน ซื้อนิยายยกชุด',
    },
    'ff37897a-4c02-4ba2-9849-b79ae51bff5f':{
        name:'ซื้อครบทุกตอน',
        name_preview:'โปรโมชัน ซื้อครบทุกตอน (ถึงตอนล่าสุดของนิยาย)',
    }

  }


 


// ['id' => 'be084528-696d-40ea-ba35-2fb23e5e28ab', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_fix_data_id', 'name' => 'กำหนด ช่วงตอน', 'name_preview' => 'โปรโมชัน ซื้อตั้งแต่ตอน', 'value' => ''],
//             ['id' => '4d0e3f6d-b458-458d-8e31-81c4a9d17836', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_fix_data_id', 'name' => 'ซื้อ มากกว่า',    'name_preview' => 'โปรโมชัน ซื้อนิยายยกชุด',    'value' => ''],
//             ['id' => 'ff37897a-4c02-4ba2-9849-b79ae51bff5f', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_fix_data_id', 'name' => 'ซื้อ ยกชุด', 'name_preview' => 'ซื้อ ยกชุด',    'value' => ''],




 // ['id' => '9e6e98e6-e77f-4522-ae95-0d964ce6973f', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_data_id', 'name' => 'ส่วนลด เปอร์เซ็น',   'name_preview' => 'ได้ส่วนลด เปอร์เซ็น',  'value' => '%'],
// ['id' => 'e214ff72-35fa-4d68-b0c3-9786f3925324', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_data_id', 'name' => 'ส่วนลด ตอนละ',   'name_preview' => 'ลดเหลือตอนละ',    'value' => '-'],
// ['id' => 'ac123486-d555-41a3-bc69-671266b7f547', 'table' => 'novel_promotion_datas', 'tag' => 'novel_promotion_type_data_id', 'name' => 'ส่วนลด coin',      'name_preview' => 'ได้ส่วนลด เหรียญ',     'value' => '-'],
