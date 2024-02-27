export interface inventoryResult {
    results: {partNumber:string,quantity:string,partDescription:string}[]
}

export interface VariantImage {
    data: {data:{id:number,name:string,sku:string,variants:{id:number,sku:string,image_url:string}[]}[]}
}