export interface InventoryList {
    id: number;
    inventory_id: number;
    trade_name: string;
    formulation: string;
    batch_no: string;
    expiry_date: string;
    quantity: number;
    mrp: number;
    pack_size: number;
    hsn_code: string;
    cost: number;
    purchaseCost: number;
    discount: number;
    reorder_level: number;
}
