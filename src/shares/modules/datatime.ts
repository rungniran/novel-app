export function datatime(dt:Date):string {

const year = dt.getFullYear();

const month =dt.getMonth() + 1;
const numOfDay = dt.getDate();


const hour = dt.getHours().toString().padStart(2, "0");
const minutes = dt.getMinutes().toString().padStart(2, "0");

// console.log(`${year}-${pad(month)}-${pad(numOfDay)}T${hour}:${minutes}:00`);

return `${year}-${pad(month)}-${pad(numOfDay)}T${hour}:${minutes}:00`;
}


export function redatatime(dt:Date):string {
  const date2 =	new Date(dt)
  const year = date2.getFullYear();
  
  const month =date2.getMonth() + 1;
  const numOfDay = date2.getDate();
  
  
  const hour = date2.getHours().toString().padStart(2, "0");
  const minutes = date2.getMinutes().toString().padStart(2, "0");
  
  // console.log(`${year}-${pad(month)}-${pad(numOfDay)}T${hour}:${minutes}:00`);
  
  return `${year}-${pad(month)}-${pad(numOfDay)}T${hour}:${minutes}`;
  }
function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
