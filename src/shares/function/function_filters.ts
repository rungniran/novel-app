interface formatBytes {
	size?:number
	value?:string
}

const filters = {
	// NumbertoText(num) {
	// 	const si = [
	// 		{ value: 1, symbol: "" },
	// 		{ value: 1E3, symbol: "k" },
	// 		{ value: 1E6, symbol: "M" },
	// 		{ value: 1E9, symbol: "G" },
	// 		{ value: 1E12, symbol: "T" },
	// 		{ value: 1E15, symbol: "P" },
	// 		{ value: 1E18, symbol: "E" }
	// 	];
	// 	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	// 	const i = 0 as any;
	// 	for (let i = si.length - 1; i > 0; i--) {
	// 		if (num >= si[i].value) {
	// 			break;
	// 		}
	// 	}
	// 	return (num / si[i].value).toFixed(0).replace(rx, "$1") + si[i].symbol;
	// },
	NumbertoText(num:any):string {
		if (num >= 1000000000) {
			 return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
			 return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
			 return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
},
    // NumbertoText(num: number):string{
    //     const digits = 0
    //     const lookup = [
    //         { value: 1, symbol: "" },
    //         { value: 1e3, symbol: "K" },
    //         { value: 1e6, symbol: "M" },
    //         { value: 1e9, symbol: "G" },
    //         { value: 1e12, symbol: "T" },
    //         { value: 1e15, symbol: "P" },
    //         { value: 1e18, symbol: "E" }
    //       ];
    //       const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    //       const item = lookup.slice().reverse().find(function(item) {
    //         return num >= item.value;
    //       });
    //       return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    // },

    Ago(day:Date):string{
		const end = new Date(day).getTime();
		const seconds:number = Math.floor((new Date().valueOf() - end) / 1000);
		let interval:number = seconds / 31536000;
		if (interval > 1) {
			return Math.floor(interval) + " ปีที่แล้ว";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + " เดือนที่แล้ว";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + " วันที่แล้ว";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + " ชม. ที่แล้ว";
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + " นาทีที่แล้ว";
		}
		return  "เมื่อสักครู่";
	},
	_dataUrl(item:any, type = "Novel"):string {
    console.log(type);
    
    if (item) {
      const cutpath = item.url.replaceAll('https://novelkingdom.co/public/publicImages/', '')
      return cutpath === '' ? dynamic_path.image('loading.png') : item.url
    } else{
      return dynamic_path.image('loading.png')
    }
  },

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	setTwoNumberDecimal(event:any):void {
    event.value = parseFloat(event.value).toFixed(2);
  },
	formatBytes(bytes: number, decimals =  0): formatBytes {
		if (bytes === 0) return {size: 0, value: "Bytes"};
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
		const vulue =  sizes[i]
		return {size: size, value: vulue} ;
},
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
withCommas(number:any):any {
	 const temp = parseFloat(number).toFixed(2).split('.')
	  if(temp[1] === '00'){
			return number + '.00'
		}else{
			return number
		}
	 
	//  : 
	 
},

NumberToString(x:string):string{
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},


toThaiDateString(date:Date):string {
	// const time = date.split("")
  const data2 =	new Date(date)

	
	const monthNames = [
			"ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
			" พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
			"ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
	];

	const year = data2.getFullYear() + 543;
	
	const month = monthNames[data2.getMonth()];
	const numOfDay = data2.getDate();


	const hour = data2.getHours().toString().padStart(2, "0");
	const minutes = data2.getMinutes().toString().padStart(2, "0");
	// console.log(date);
	
  
	return `${numOfDay} ${month} ${year} ` +
			`${hour}:${minutes}`;
}
// 	let _return = 0
// 	if (number) {
// 		let temp: string[]
// 		if (decimal) {
// 			temp = parseFloat(number, 10).toFixed(2).split('.')
// 			_return = ${parseFloat(temp[0], 10).toLocaleString()}.${temp[1]}
// 		} else {
// 			temp = parseFloat(number, 10)
// 			_return = ${parseFloat(temp, 10).toLocaleString()}
// 		}

// 		// _return = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// 	} else {
// 		_return = number
// 	}

// 	if (_return) {
// 		return _return
// 	}
// 	return 0
// },
} as any
const dynamic_path = {
	image(img:string):string{
		const images = require.context('../../assets/images', false)
		return images('./' + img)
	},
	svg(img:string):string{
		const images = require.context('../../assets/svg', false, /\.svg$/)
		return images('./' + img)
	},
	gif(img:string):string{
		const images = require.context('../../assets/gif', false, /\.gif$/)
		return images('./' + img)
	},
    cheerup(img:string):string{
		const images = require.context('../../assets/images/cheerup', false, /\.png$/)
		return images('./' + img)
	},
	// imageCover(img:string):string{
	// 		const images = require.context('../../assets/images/image-cover')
	// 		return images('./' + img)
	// },
	imageEmpty(img:string):string{
		const images = require.context('../../assets/images/dragon')
		return images('./' + img)
	},
	
} as any



export default {filters, dynamic_path}
