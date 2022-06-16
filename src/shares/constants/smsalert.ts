/*หน้าหลัก(Mainpage)*/

/*หน้าประเภท(Typepage)*/

/*หน้า ชั้นหนังสือ(Bookshelf)*/
export function sms_alert_Bookshelf (novelname:string):string{
    return `ลบนิยาย ${novelname} จากชั้นหนังสือสำเร็จ`

}

/*หน้า นักเขียน(Authorpage)*/

/*หน้า รายละเอียดนิยาย*/
export function sms_alert_Bookdetail (novelname:string):string{
    return `เพิ่มนิยาย ${novelname} ลงชั้นหนังสือสำเร็จ`
  
}
export function sms_alert_Review (novelname:string):string{
    return `รีวิวนิยาย ${novelname} สำเร็จ`
  
}

export function sms_alert_BuyEpisode (epname:string, coin:string):string{
    return `ซื้อตอน ${epname} สำเร็จ -${coin} เหรียญ`
}


export function sms_alert_Subscribe (Writername:string):string{
    return `ติดตาม คุณ ${Writername} สำเร็จ`

}
export function sms_alert_Comment (novelname:string):string{
    return `เเสดงความคิดเห็นนิยาย ${novelname} สำเร็จ`
  
}

/*หน้า อ่านตอนนิยาย*/
export function sms_alert_BuyEpisoderead (epname:string,coin:string):string{
    return `ซื้อตอน ${epname} สำเร็จ -${coin} เหรียญ`

}
export function sms_alert_CommentEp (epname:string):string{
    return `เเสดงความคิดเห็นนิยาย ${epname} สำเร็จ`

}

/*หน้า เพิ่มนิยาย*/
export function sms_alert_AddNovel (Novelname:string):string{
    return `เพิ่มนิยาย ${Novelname} สำเร็จ`
}


/*หน้า เพิ่มตอนนิยาย*/
export function sms_alert_AddEp (epname:string):string{
    return `เพิ่มนิยายตอน ${epname} สำเร็จ`
}


/*หน้า จัดการนิยาย*/ 
export function sms_alert_DelNovel (novelname:string):string{
    return `ลบนิยายเรื่อง ${novelname} สำเร็จ`
}


/*หน้า เเจ้งเตือนระบบ*/

/*หน้า ค้นหานิยาย*/

/*หน้า เติมเหรียญ*/
export function sms_alert_Payment (coin:string,price:string):string{
    return `เติมเหรียญ +${coin} เหรียญสำเร็จ ราคา ${price} บาท`

}

/*หน้า เเลกของ*/
export function sms_alert_Exchange (productname:string,diamond:string):string{
    return `ส่งคำขอเเลกสินค้า ${productname} สำเร็จ ราคา ${diamond} เพชร (กรุณารอการอนุมัติจากทีมงาน)`

}
export function sms_alert_Buyitems (productname:string,diamond:string){
    return `ซื้อสินค้า ${productname} สำเร็จ ราคา ${diamond} เพชร `

}

/*หน้า คลังสมบัติ*/

/*หน้า ประวัติการใช้งาน*/ 

/*หน้า เเจ้งปัญหา*/
export function sms_alert_ProblemReport (name:string):string{
    return `ส่งคำขอการเเจ้งปัญหาของคุณ ${name} สำเร็จ`

}
/*หน้า โปรไฟล์นักอ่าน*/

/*หน้า โปรไฟล์นักเขียน*/

/*หน้า ตั้งค่า*/
export enum sms_alert_Update_UserInformation{
    successful = "อัพเดทข้อมูลผู้ใช้สำเร็จ"

}
export enum sms_alert_Change_Password {
    successful = "เปลี่ยนรหัสผ่านผู้ใช้สำเร็จ",
}