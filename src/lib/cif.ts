import { CarType, CarBase } from "@/lib/car-context";
import { Port, Mode } from "@/context/cif-context"

export const calculateCIF = (
    car: CarBase,
    selectedPort: Port,
    shippingMode: Mode,
    includeInspection: boolean
): number => {
    if (!car || !selectedPort) return 0
    const fob = Number(car.fob_price)
    const carSize = car.size?.cubic_meters ? Number(car.size.cubic_meters).toFixed(2) : 0
    
    let freight = 0
    
    // Customs Charges (1 USD = 155 JPY)
    // https://www.customs.go.jp/en/freight/freight-charges/freight-charges-list.html
    const customsCharge = 177.42   // 25,000 + 2500 JPY
    const radioactiveInspection = 14.2  // 2200 JPY
    const surrenderFee = 21.3  // 3,300 JPY
    const docFee = 35.48           // 5,500 JPY
    const transportToPortFee = 64.52   // 10,000 JPY
    const totalCustomsCharge = customsCharge + radioactiveInspection + surrenderFee + docFee + transportToPortFee
    
    if (shippingMode === 'roro' && car.size?.cubic_meters) {
        const rate = parseFloat(selectedPort.freight_roro || '0')
        freight += rate * Number(carSize)
    } else if (shippingMode === 'container') {
        freight += parseFloat(selectedPort.freight_container || '0')
    } else {
        freight += parseFloat(selectedPort.freight_share_container || '0')
    }
    
    const inspectionCost = includeInspection ? parseFloat(selectedPort?.inspection_cost) || 169 : 0
    freight += (inspectionCost + totalCustomsCharge)
    
    return Number((fob + freight).toFixed(2))
}

export const canCalculateCIF = (car: CarBase, selectedPort: Port, shippingMode: Mode) => {
    if (!selectedPort) return false;
    
    if (shippingMode === 'roro') {
        const roroRate = parseFloat(selectedPort.freight_roro || '0');
        return roroRate && car.size?.cubic_meters;
    }
    
    if (shippingMode === 'container') {
        const containerRate = parseFloat(selectedPort.freight_container || '0');
        return containerRate > 0;
    }
    
    return false;
};