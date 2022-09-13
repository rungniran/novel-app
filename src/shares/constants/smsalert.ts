/*หน้าหลัก(Mainpage)*/

/*หน้าประเภท(Typepage)*/

/*หน้า ชั้นหนังสือ(Bookshelf)*/
export function sms_alert_Bookshelf (novelname:string):string{
    return `ลบนิยายเรื่อง ${novelname} จากชั้นหนังสือสำเร็จ`  /*สำเร็จ*/

}

/*หน้า นักเขียน(Authorpage)*/

/*หน้า รายละเอียดนิยาย*/
export function sms_alert_Add_BookShelf (novelname:string):string{
    return `เพิ่มนิยาย ${novelname} ลงชั้นหนังสือสำเร็จ` /*สำเร็จ*/
  
}
export function sms_alert_ (novelname:string):string{
    return `ลบนิยาย ${novelname} จากชั้นหนังสือสำเร็จ` // ในรูปเเบบหน้าจอขนาดมือถือ /*สำเร็จ*/
  
}
export function sms_alert_Review (novelname:string):string{
    return `รีวิวนิยาย ${novelname} สำเร็จ`
  
}

export function sms_alert_BuyEpisode (epname:string, coin:string):string{
    return `ซื้อตอน ${epname} สำเร็จ -${coin} เหรียญ` /*สำเร็จ*/
}


export function sms_alert_Subscribe (Writername:string):string{
    return `ติดตาม คุณ ${Writername} สำเร็จ`

}
export function sms_alert_Comment (novelname:string):string{
    return `เเสดงความคิดเห็นนิยาย ${novelname} สำเร็จ` /*สำเร็จ*/
  
}
/********** ซื้อเป็นชุด ************/
export function sms_alert_Buyset (epnamestart:string,epnameend:string, coin:string):string{
    return `ซื้อตอนที่ ${epnamestart} ถึง ${epnameend}  สำเร็จ -${coin} เหรียญ` /*ซื้อเป็นช่วงปกติสำเร็จ*/
}
export enum sms_alert_Buysetalreadyhave {
    successful= "ขออภัยคุณไม่สามารถซื้อตอนที่เคยซื้อได้" /*alert เมื่อซื้อตอนที่เคยซื้อไปเเล้ว*/ 
  
}
export enum sms_alert_Buysetnocoin {
    successful= "ขออภัยยอดเหรียญของคุณไม่เพียงพอ" /*alert จำนวนเหรียญไม่พอ*/ 
  
}
/*หน้า อ่านตอนนิยาย*/
export function sms_alert_BuyEpisoderead (epname:string,coin:string):string{
    return `ซื้อตอน ${epname} สำเร็จ -${coin} เหรียญ`
}
export function sms_alert_CommentEp (epname:string):string{
    return `เเสดงความคิดเห็นนิยาย ${epname} สำเร็จ`

}
export enum sms_alert_DeleteEp {
        successful = "ขออภัยตอนนี้ถูกลบจากระบบ"
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
export function sms_alert_DelNovelep (novelname:string):string{
    return `ลบตอนนิยาย ${novelname} สำเร็จ`
}

/*หน้า เเก้ไขนิยาย*/ 
export function sms_alert_EditNovel (novelname:string):string{
    return `อัพเดทข้อมูลนิยายเรื่อง ${novelname} สำเร็จ`
}

/*หน้า เเก้ไขตอนนิยาย*/ 
export function sms_alert_EditEPNovel (epname:string):string{
    return `อัพเดทข้อมูลตอนนิยาย ${epname} สำเร็จ`
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
export function sms_alert_Buyitems (productname:string,diamond:string):string{
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
export enum sms_alert_Update_Usernamerepeat{
    successful = "ขออภัยมีชื่อผู้ใช้งานนี้อยู่ในระบบเเล้ว"

}
