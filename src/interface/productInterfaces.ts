// productInterfaces.ts

export interface VatDetails {
    vatCode: string;
    vatRate: number;
    countryCode: string | null;
    description: string | null;
    effectiveTo: string | null;
    effectiveFrom: string;
}

export interface BrandDetails {
    image: string;
    website: string;
    brandName: string;
    description: string;
}

export interface CategoryDetails {
    image: string;
    isPLU: boolean;
    pluCode: string;
    parentId: number;
    categoryName: string;
    translatedName: string;
}

export interface ItemDetails {
    tags: string[];
    isPluCoded: boolean;
    isSeasoned: boolean;
    isStoreUse: boolean;
    isWeighted: boolean;
    hasLeadTime: boolean;
    canBeInPromo: boolean;
    canSplitSell: boolean;
    canStockTake: boolean;
    isOutOfStock: boolean;
    needPreOrder: boolean;
    splitSellQty: number;
    hasBoxBarcode: boolean;
    hasLinkedItem: boolean;
    isPriceMarked: boolean;
    minSellingQty: number;
    isDiscontinued: boolean;
    isDiscountable: boolean;
    isStoreVisible: boolean;
    hasOuterBarcode: boolean;
    isAgeRestricted: boolean;
    canOrderInPallet: boolean;
    hasMinSellingQty: boolean;
    hasPalletBarcode: boolean;
    canPurchaseLocally: boolean;
    isStoreTransferable: boolean;
    isConsideredForPurchasePlan: boolean;
}

export interface ProductDetails {
    itemName: string;
    englishName: string;
    itemCode: string;
    description: string;
    labelName: string;
    invoiceName: string;
    tillMessage: string;
    ingredients: string;
    translatedIngredients: string;
    allergicDetails: string;
    translatedAllergicDetails: string;
    item_image: string;
    uom: string;
    retailUom: string;
    wastagePercentage: string;
    itemType: string;
    minOrderQty: string;
    maxOrderQty: string;
    leadTime: string;
    reorderLevel: string;
    reorderLevelType: string;
    safetyStock: string;
    shelfLife: number;
    shelfLifeType: string;
    countryOfOrigin: string;
    vat: string;
    brand: string;
    category: string;
    item_details: ItemDetails;
}
