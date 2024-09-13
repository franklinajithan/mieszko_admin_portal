import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const newPurchasePlanningFormSchema = z.object({
  documentNo: z.string(),
  storeNo: z.string(),
  WHLocation: z.string(),
  planType: z.string(),
  supplier: z.string(),
  addOns: z.string(),
  leadTimes: z.string(),
  expectedDeliveryDate: z.string(),
  brand: z.string(),
  status: z.string(),
  Comments: z.string(),
  period1StartDate: z.string(),
  period1EndDate: z.string(),
  period2StartDate: z.string(),
  period2EndDate: z.string(),
  currentStock: z.string(),
  scheduleDay: z.string(),
  time: z.string(),
  email: z.string(),
  currentStock1: z.boolean(),
  rtcSales: z.boolean(),
  wastage: z.boolean(),
  promoSales: z.boolean(),
  itemsBasket: z.boolean(),
  hhuItems: z.boolean(),
  considerOrder: z.boolean(),
  considerSales: z.boolean(),
  selfLife: z.boolean(),
  passToAnotherStore: z.string(),
  filterType: z.string(),
  specificDivisionPlanning: z.string(),
  considerAgentPrice: z.string(),
});


export const purchaseOrderFormSchema = z.object({
  supplier: z.string().optional(),
  status: z.string().optional(),
  orderWay: z.string().optional(),
  store: z.string().optional(),
  orderNumber: z.string().optional(),
  supplierOrderNumber: z.string().optional(),
  grnNumber: z.string().optional(),
  itemCode: z.string().optional(),
  itemName: z.string().optional(),
  ean: z.string().optional(),
  orderType: z.string().optional(),
  comments: z.string().optional(), // Assuming comments is a string; use z.number() if it's a number
  promotion: z.string().optional(),
  presell: z.string().optional(),
  totalLineItems: z.string().optional(), // Assuming totalLineItems is a string; use z.number() if it's a number
  orderUomType: z.string().optional(),
  purchasePlanId: z.string().optional(),
  supplierInvoiceNumber: z.string().optional(),
  customerRequestedItem: z.string().optional(),
  orderFromMobile: z.string().optional(),
  orderMethod: z.string().optional(),
  invoiceNumber: z.string().optional(),
  paymentStatus: z.string().optional(),
  itemSize: z.string().optional(), // Assuming itemSize is a string; use z.number() if it's a number
  supplierCode: z.string().optional(), // Assuming supplierCode is a string; use z.number() if it's a number
  ownLabel: z.string().optional(),
  priceMarked: z.string().optional(),
  supplierReferenceNumber: z.string().optional(), // Assuming supplierReferenceNumber is a string; use z.number() if it's a number
  closingDate: z.string().optional(), // Use z.date() if you're working with actual Date objects
  purchasePlanStartDate: z.string().optional(),
  purchasePlanEndDate: z.string().optional(),
  orderPlacedStartDate: z.string().optional(),
  orderPlacedEndDate: z.string().optional(),
  orderDateStartDate: z.string().optional(),
  orderDateEndDate: z.string().optional(),
  deliveryDateStartDate: z.string().optional(),
  deliveryDateEndDate: z.string().optional(),

});


export const purchasePlanningFormSchema = z.object({
  supplier: z.string().optional(),
  date: z.string().optional(),
  planType: z.string().optional(),
  orderDate: z.string().optional(),
  status: z.string().optional(),
  store: z.string().optional(),
  totalLineItems: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
  orderQuantity: z.string().optional(),
  promoItems: z.string().optional(),
  hhuBasketItem: z.string().optional(),
  customerSpecialRequestItem: z.string().optional(),
  priceMarkedItemIncluded: z.string().optional(),
  cheapestPlan: z.string().optional(),
  fastestDelivery: z.string().optional(),

});

export const orderHistoryFormSchema = z.object({
  search: z.string().optional(),
  filterByStatus: z.string().optional(),
});

export const categoryFormSchema = z.object({
  categoryName: z.string().nonempty("Category name is required"),
  categoryLevel: z.string({
    required_error: "Category Level is required",
  }),
  childCategory: z.string().optional(),
  parentCategory: z.string().optional(),
  isPlu: z.boolean().optional(),
  isAssignItem: z.boolean().optional(),
  translation: z.string().optional(),
  clearForm: z.boolean().optional(),
  pluCode: z.string()
    .regex(/^\d{2}$/, "PLU Code must be exactly 2 numeric digits")
    .optional(),
})
  .superRefine((data, ctx) => {
    // Check if 'isPlu' is true and 'pluCode' is missing or invalid
    if (data.isPlu === true && !data.pluCode) {
      ctx.addIssue({
        path: ['pluCode'],
        message: "PLU Code is required when 'PLU product' is true",
        code: z.ZodIssueCode.custom
      });
    }
  });

export const authFormSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});


export const userSearchSchema = z.object({
  role: z.string().optional(), // Assuming these are optional fields
  type: z.string().optional(),
  reporting: z.string().optional(),
  status: z.string().optional(),
  usersAccessToPOS: z.boolean().optional(), // Assuming checkboxes are booleans
  userAccessToMobile: z.boolean().optional(),
});

export const manageStoreFormSchema = z.object({
  storeName: z.string(),         // Required string
  storeCode: z.string(),         // Required string
  status: z.string(),                // Required string
  ownershipType: z.string(), // Required string
  postcode: z.string(),            // Required string
  city: z.string(),                    // Required string
  licenseType: z.string(),     // Required string
  expiry: z.string(),                              // Optional date field
  company: z.string(),              // Required string
  storeType: z.string(),         // Required string
});

export const userSchema = z
  .object({
    Id: z.string().nonempty("Id is required"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    phone: z.string().nonempty("Phone number is required"),
    dob: z.string().nonempty("data of birth is required"),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    username: z.string().nonempty("Username is required"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    role: z.string().optional(),
    assignStore: z.string().optional(),
    visaNumber: z.string().optional(),
    visaType: z.string().optional(),
    issueDate: z.string().optional(),
    expiryDate: z.string().optional(),
    visaIssuedBy: z.string().optional(),
    visaStatus: z.string().optional(),
    mobileAccess: z.string().optional(),
    desktopAccess: z.string().optional(),
    posAccess: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Set the path of the error to 'confirmPassword'
    message: "Passwords don't match",
  });


export const newBrandFormSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  description: z.string(),
  website: z.string().url("Invalid URL"),
  status: z.boolean(),
});

export const newProductFormSchema = z.object({
  itemName: z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters'),
  englishName: z.string().min(1, 'English name is required').max(100, 'English name must be at most 100 characters'),
  itemCode: z.string().min(1, 'Item code is required').max(50, 'Item code must be at most 50 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be at most 500 characters'),
  caseSize: z.string().min(1, 'Case size is required').max(50, 'Case size must be at most 50 characters'),
  casePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Case price must be a valid number'),
  palletSize: z.string().min(1, 'Pallet size is required').max(50, 'Pallet size must be at most 50 characters'),
  palletPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Pallet price must be a valid number'),
  minOrderQty: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Min order qty must be a valid number'),
  maxOrderQty: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Max order qy must be a valid number'),
  isDiscounted: z.boolean().optional(),
  isStoreTransferable: z.boolean().optional(),
  canBePurchasedLocally: z.boolean().optional(),
  isOutOfStock: z.boolean().optional(),
  isWeighedItem: z.boolean().optional(),
  size: z.string().min(1, 'Size is required').max(50, 'Size must be at most 50 characters'),
  weight: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Weight must be a valid number'),
  vatId: z.string().min(1, 'Vat ID is required').max(50, 'Vat ID must be at most 50 characters'),
  brand: z.string().optional(),
  isSeasonedProduct: z.boolean().optional(),
  allergicDetails: z.string().optional(),
  ingredientsDetails: z.string().optional(),
  priceLookupCode: z.string().optional(),
  eanCode: z.string().optional(),
  departmentId: z.string().optional(),
  itemCategoryId: z.string().optional(),
  itemCategory2Id: z.string().optional(),
  unitOfMeasure: z.string().optional(),
  searchKeywordsTags: z.string().optional(),
  status: z.boolean().optional(),
});

export const productSearchFormSchema = z.object({
  department: z.string().min(1, "Department is required"),
  supplier: z.string().min(1, "Supplier is required"),
  barcodePlu: z.string().optional(),
  itemCode: z.string().optional(),
  itemName: z.string().optional(),
  status: z.string().optional(),
  brand: z.string().optional(),
  priceMarkedItem: z.string().optional(),
  caseSize: z.string().optional(),
  fastestDelivery: z.string().optional(),

});


export const editProductFormSchema = z.object({
  itemName: z.string(),
  englishName: z.string(),
  itemCode: z.string(),
  description: z.string(),
  labelName: z.string(),
  invoiceName: z.string(),
  tillMessage: z.string(),
  ingredients: z.string(),
  translatedIngredients: z.string().optional(),
  allergicDetails: z.string(),
  translatedAllergicDetails: z.string().optional(),
  item_image: z.string().optional(),
  uom: z.string(),
  retailUom: z.string(),
  wastagePercentage: z.string(),
  itemType: z.string(),
  minOrderQty: z.string(),
  maxOrderQty: z.string(),
  leadTime: z.string(),
  reorderLevel: z.string(),
  reorderLevelType: z.string(),
  safetyStock: z.string(),
  shelfLife: z.number(),
  shelfLifeType: z.string(),
  countryOfOrigin: z.string(),
  selfNo: z.string().optional(), // Add .optional() if the field is not required
  inventory: z.string().optional(),
  qtyOnPurchaseOrder: z.string().optional(),
  stockOutWarning: z.string().optional(),
  standardCost: z.number().optional(), // Use z.number() for numerical fields
  unitCost: z.number().optional(),
  reorderingPolicy: z.string().optional(),
  safetyLeadTime: z.string().optional(),
  safetyStockQuantity: z.string().optional(),
  includeInventory: z.string().optional(),
  reschedulePeriod: z.string().optional(),
  reorderQuantity: z.string().optional(),
  maximumInventory: z.string().optional(),
  minimumOrderQuantity: z.string().optional(),
  maximumOrderQuantity: z.string().optional(),
  orderMultiple: z.string().optional(),
  baseUnitOfMeasure: z.string().optional(),
  caseSize: z.string().optional(),
  pcsPerPallet: z.string().optional(),
  pcsPerLayers: z.string().optional(),
  itemCategoryCode: z.string().optional(), // New field
  retailPrice: z.string().optional(), // Adjusted based on type in the form
  promotionalRetail: z.string().optional(), // Adjusted based on type in the form
  margin: z.string().optional(), // Adjusted based on type in the form
  vat: z.object({
    vatId: z.string(),
    vatCode: z.string(),
    vatRate: z.number(),
    countryCode: z.string().nullable(),
    description: z.string().nullable(),
    effectiveTo: z.string().nullable(),
    effectiveFrom: z.string(),
  }),
  brand: z.object({
    image: z.string(),
    website: z.string(),
    brandName: z.string(),
    description: z.string(),
  }),
  category: z.object({
    image: z.string(),
    isPLU: z.boolean(),
    pluCode: z.string(),
    parentId: z.number(),
    categoryName: z.string(),
    translatedName: z.string(),
  }),
  item_details: z.object({
    tags: z.array(z.string()),
    isPluCoded: z.boolean(),
    isSeasoned: z.boolean(),
    isStoreUse: z.boolean(),
    isWeighted: z.boolean(),
    hasLeadTime: z.boolean(),
    canBeInPromo: z.boolean(),
    canSplitSell: z.boolean(),
    canStockTake: z.boolean(),
    isOutOfStock: z.boolean(),
    needPreOrder: z.boolean(),
    splitSellQty: z.number(),
    hasBoxBarcode: z.boolean(),
    hasLinkedItem: z.boolean(),
    isPriceMarked: z.boolean(),
    minSellingQty: z.number(),
    isDiscontinued: z.boolean(),
    isDiscountable: z.boolean(),
    isStoreVisible: z.boolean(),
    hasOuterBarcode: z.boolean(),
    isAgeRestricted: z.boolean(),
    canOrderInPallet: z.boolean(),
    hasMinSellingQty: z.boolean(),
    hasPalletBarcode: z.boolean(),
    canPurchaseLocally: z.boolean(),
    isStoreTransferable: z.boolean(),
    isConsideredForPurchasePlan: z.boolean(),
  }),
});



export const supplierFormSchema = z.object({
    supplier_id: z.string().optional(),
    short_code: z.string().optional(),
    supplier_logo: z.string().optional(),
    supplier_name: z.string().optional(),
    contact_person_name: z.string().optional(),
    supplier_email: z.string().optional(),
    email_cc: z.string().optional(),
    supplier_phone: z.string().optional(),
    supplier_fax: z.string().optional(),
    supplier_website: z.string().optional(),
    web_portal: z.string().optional(),
    supplier_address: z.string().optional(),
    supplier_city: z.string().optional(),
    supplier_postcode: z.string().optional(),
    supplier_state: z.string().optional(),
    supplier_country: z.string().optional(),
    supplier_type: z.string().optional(),
    posting_group: z.string().optional(),
    credit_score: z.string().optional(),
    supplier_status: z.boolean().optional(),
    created_by: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    supplier_details: z.array(z.object({
        order_cc: z.string().optional(),
        order_bcc: z.string().optional(),
        order_uom: z.string().optional(),
        order_email: z.string().optional(),
        invoice_type: z.string().optional(),
        max_order_qty: z.string().optional(),
        min_order_qty: z.string().optional(),
        delivery_charge: z.string().optional(),
        has_ftp_account: z.boolean().optional(),
        max_order_value: z.string().optional(),
        min_order_value: z.string().optional(),
        is_cash_accepted: z.boolean().optional(),
        is_main_supplier: z.boolean().optional(),
        can_accept_return: z.boolean().optional(),
        is_daily_supplier: z.boolean().optional(),
        can_schedule_order: z.boolean().optional(),
        is_rebate_supplier: z.boolean().optional(),
        order_status_email: z.string().optional(),
        is_any_special_price: z.boolean().optional(),
        order_placement_type: z.string().optional(),
        pay_out_amount_limit: z.string().optional(),
        can_raise_credit_note: z.boolean().optional(),
        is_pre_payment_needed: z.boolean().optional(),
        can_place_multiple_order: z.boolean().optional(),
        can_be_paid_out_from_till: z.boolean().optional(),
        free_delivery_order_value: z.string().optional(),
        will_receive_delivery_note: z.boolean().optional(),
        can_order_price_marked_item: z.boolean().optional(),
        can_be_part_of_purchase_plan: z.boolean().optional(),
        no_of_delivery_notes_to_be_merged: z.string().optional(),
        can_be_considered_for_fastest_supplier: z.boolean().optional(),
        can_be_considered_for_cheapest_supplier: z.boolean().optional(),
        need_to_check_pallet_price_before_order: z.boolean().optional(),
    })).optional(),
    ftp_data: z.array(z.object({
        ftpUrl: z.string().optional(),
        ftpType: z.string().optional(),
        autoDelete: z.boolean().optional(),
        ftpPassword: z.string().optional(),
        ftpUsername: z.string().optional(),
        autoDownload: z.boolean().optional(),
        sellerBuyerId: z.string().optional(),
        connectionName: z.string().optional(),
        autoDownloadTime: z.string().optional(),
    })).optional(),
    price_rules: z.array(z.object({
        margin: z.number().optional(),
        endDate: z.string().optional(),
        startDate: z.string().optional(),
        categoryId: z.string().optional(),
        roundValue1: z.number().optional(),
        roundValue2: z.number().optional(),
        categoryName: z.string().optional(),
        roundConcept: z.string().optional(),
    })).optional(),
    delivery_schedules: z.array(z.object({
        endTime: z.string().optional(),
        orderDay: z.string().optional(),
        startTime: z.string().optional(),
        deliveryDay: z.string().optional(),
        scheduledType: z.string().optional(),
        extendedLeadTime: z.string().optional(),
        standardLeadTime: z.string().optional(),
        promotionLeadTime: z.string().optional(),
    })).optional(),
    categories: z.array(z.object({
        isPLU: z.boolean().optional(),
        level: z.number().optional(),
        pluCode: z.string().optional(),
        parentId: z.string().optional(),
        categoryName: z.string().optional(),
        canAssignItems: z.boolean().optional(),
        translatedName: z.string().optional(),
    })).optional(),
    agents: z.array(z.object({
        agentName: z.string().optional(),
        agentEmail: z.string().optional(),
        agentPhone: z.string().optional(),
        agentWhatsapp: z.string().optional(),
    })).optional(),
});




