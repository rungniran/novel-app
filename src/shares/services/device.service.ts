import DeviceDetector from "device-detector-js";
const deviceDetector = new DeviceDetector();
const userAgent = navigator.userAgent ; 
const device = deviceDetector.parse(userAgent) as any;
export const Devices = {
   device_name: device.device.type,
   platform: device.os.name,
   device: device.client.name,
   
} as any

  