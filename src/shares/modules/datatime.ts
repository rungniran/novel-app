export function datatime(dt:Date):string {
   
   const date = dt.toString().split(' ')
   const Month = dt.getMonth() + 1
   const day = date[2]
   const Year = dt.getFullYear()

   
  //  console.log(`${Year}-${pad(Month)}-${day}T${date[4]}`);
   
  return `${Year}-${pad(Month)}-${day}T${date[4]}`
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
