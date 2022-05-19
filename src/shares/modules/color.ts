// import { elements } from "vue-meta/types/vue-meta";

export type RGBtype = {
    r?:number,
    g?:number,
    b?:number 

}

export function	getRGB(imgE:HTMLImageElement):RGBtype {
      const blockSize = 5 
      const  defaultRGB = {r:205,g:205,b:205} 
      const  canvas = document.createElement('canvas')
      const  context = canvas.getContext && canvas.getContext('2d')
       
       const rgb = {r:0,g:0,b:0}
	   let i = -4
       let  count = 0;

    if (!context) {
        return defaultRGB;
    }

    const height = canvas.height = imgE.height;
    const  width = canvas.width = imgE.width

    context.drawImage(imgE, 0, 0);

    try {
			const  data = context.getImageData(0, 0, width, height);
			const length = data.data.length;

			while ( (i += blockSize * 4) < length ) {
					++count;
					rgb.r += data.data[i];
					rgb.g += data.data[i+1];
					rgb.b += data.data[i+2];
			}
			rgb.r = ~~(rgb.r/count);
			rgb.g = ~~(rgb.g/count);
			rgb.b = ~~(rgb.b/count);
			return rgb;
    } catch(e) {
 
        return defaultRGB;
    }


    

}


