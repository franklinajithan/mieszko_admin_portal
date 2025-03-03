import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { nullable, z } from "zod";

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
  supplier: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  orderWay: z.string().nullable().optional(),
  store: z.string().nullable().optional(),
  orderNumber: z.string().nullable().optional(),
  supplierOrderNumber: z.string().nullable().optional(),
  grnNumber: z.string().nullable().optional(),
  itemCode: z.string().nullable().optional(),
  itemName: z.string().nullable().optional(),
  ean: z.string().nullable().optional(),
  orderType: z.string().nullable().optional(),
  comments: z.string().nullable().optional(), // Assuming comments is a string; use z.number() if it's a number
  promotion: z.string().nullable().optional(),
  presell: z.string().nullable().optional(),
  totalLineItems: z.string().nullable().optional(), // Assuming totalLineItems is a string; use z.number() if it's a number
  orderUomType: z.string().nullable().optional(),
  purchasePlanId: z.string().nullable().optional(),
  supplierInvoiceNumber: z.string().nullable().optional(),
  customerRequestedItem: z.string().nullable().optional(),
  orderFromMobile: z.string().nullable().optional(),
  orderMethod: z.string().nullable().optional(),
  invoiceNumber: z.string().nullable().optional(),
  paymentStatus: z.string().nullable().optional(),
  itemSize: z.string().nullable().optional(), // Assuming itemSize is a string; use z.number() if it's a number
  supplierCode: z.string().nullable().optional(), // Assuming supplierCode is a string; use z.number() if it's a number
  ownLabel: z.string().nullable().optional(),
  priceMarked: z.string().nullable().optional(),
  supplierReferenceNumber: z.string().nullable().optional(), // Assuming supplierReferenceNumber is a string; use z.number() if it's a number
  closingDate: z.string().nullable().optional(), // Use z.date() if you're working with actual Date objects
  purchasePlanStartDate: z.string().nullable().optional(),
  purchasePlanEndDate: z.string().nullable().optional(),
  orderPlacedStartDate: z.string().nullable().optional(),
  orderPlacedEndDate: z.string().nullable().optional(),
  orderDateStartDate: z.string().nullable().optional(),
  orderDateEndDate: z.string().nullable().optional(),
  deliveryDateStartDate: z.string().nullable().optional(),
  deliveryDateEndDate: z.string().nullable().optional(),

});


export const purchasePlanningFormSchema = z.object({
  supplier: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
  planType: z.string().nullable().optional(),
  orderDate: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  store: z.string().nullable().optional(),
  totalLineItems: z.string().nullable().optional(),
  expectedDeliveryDate: z.string().nullable().optional(),
  orderQuantity: z.string().nullable().optional(),
  promoItems: z.string().nullable().optional(),
  hhuBasketItem: z.string().nullable().optional(),
  customerSpecialRequestItem: z.string().nullable().optional(),
  priceMarkedItemIncluded: z.string().nullable().optional(),
  cheapestPlan: z.string().nullable().optional(),
  fastestDelivery: z.string().nullable().optional(),

});

export const orderHistoryFormSchema = z.object({
  search: z.string().nullable().optional(),
  filterByStatus: z.string().nullable().optional(),
});

export const categoryFormSchema = z.object({
  categoryName: z.string().nonempty("Category name is required"),
  categoryLevel: z.string({
    required_error: "Category Level is required",
  }),
  childCategory: z.string().nullable().optional(),
  parentCategory: z.string().nullable().optional(),
  isPlu: z.boolean().optional(),
  isAssignItem: z.boolean().optional(),
  translation: z.string().nullable().optional(),
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
    email: z
      .string()
      .min(1, { message: "Email is required" }) // Check if value exists
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Invalid email address",
      }), // Validate email format only if not empty
    password: z
      .string()
      .min(1, { message: "Password is required" }) // Check if value exists
      .min(6, { message: "Password must be at least 6 characters long" }), // Check minimum length
  });
export const userSearchSchema = z.object({
  role: z.string().nullable().optional(), // Assuming these are optional fields
  type: z.string().nullable().optional(),
  reporting: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  usersAccessToPOS: z.boolean().optional(), // Assuming checkboxes are booleans
  userAccessToMobile: z.boolean().optional(),
});

export const StoreListFormSchema = z.object({
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
    employeeId: z.string()
      .nonempty("Employee ID is required"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    phone: z.string().nonempty("Phone number is required"),
    dob: z
      .date({
        required_error: "Date of birth is required",
        invalid_type_error: "Invalid date format",
      })
      .refine((date) => date <= new Date(), {
        message: "Date of birth must be in the past",
      }),
    address: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    postcode: z.string()
      .nonempty("Postal code is required")
      .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, "Invalid UK postal code"),
    country: z.string().nullable().optional(),
    username: z.string().nonempty("Username is required"),
    password: z.string().nullable().optional(),
    confirmPassword: z.string().nullable().optional(),
    roleId: z.string().nullable().optional(),
    assignStore: z.string().nullable().optional(),
    visaNumber: z.string().nullable().optional(),
    visaType: z.string().nullable().optional(),
    issueDate: z.string().nullable().optional(),
    expiryDate: z.string().nullable().optional(),
    visaIssuedBy: z.string().nullable().optional(),
    visaStatus: z.string().nullable().optional(),
    hasAccessToMobile: z.boolean().optional(),
    hasAccessToBackOffice: z.boolean().optional(),
    hasAccessToPos: z.boolean().nullable().optional(),
    passportNo: z.string().nullable().optional(),
    reCheckDate: z.string().nullable().optional(),
    workRestriction: z.string().nullable().optional(),
    allowedHours: z.string().nullable().optional(),
    isRecheckNeeded: z.boolean().nullable().optional(),
    isSponsoredByUs: z.boolean().nullable().optional(),
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
  brand: z.string().nullable().optional(),
  isSeasonedProduct: z.boolean().optional(),
  allergicDetails: z.string().nullable().optional(),
  ingredientsDetails: z.string().nullable().optional(),
  priceLookupCode: z.string().nullable().optional(),
  eanCode: z.string().nullable().optional(),
  departmentId: z.string().nullable().optional(),
  itemCategoryId: z.string().nullable().optional(),
  itemCategory2Id: z.string().nullable().optional(),
  unitOfMeasure: z.string().nullable().optional(),
  searchKeywordsTags: z.string().nullable().optional(),
  status: z.boolean().optional(),
});

export const productSearchFormSchema = z.object({
  department: z.string().min(1, "Department is required"),
  supplier: z.string().min(1, "Supplier is required"),
  barcodePlu: z.string().nullable().optional(),
  itemCode: z.string().nullable().optional(),
  itemName: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  priceMarkedItem: z.string().nullable().optional(),
  caseSize: z.string().nullable().optional(),
  fastestDelivery: z.string().nullable().optional(),

});




export const productFormSchema = z.object({
  id: z.number(),
  itemCode: z.string().nonempty("Item code is required"),
  itemName: z.string().nonempty("Item name is required"),
  translatedName: z.string().optional(),
  description: z.string().optional(),
  labelName: z.string().optional(),
  invoiceName: z.string().optional(),
  tillMessage: z.string().optional(),
  ingredients: z.string().optional(),
  translatedIngredients: z.string().optional(),
  allergicDetails: z.string().optional(),
  translatedAllergicDetails: z.string().optional(),
  item_image: z.string().optional(),
  uom: z.string().nonempty("UOM is required"),
  retailUom: z.string().nonempty("Retail Uom is required").min(5, 'Minimum length is 3').max(20, 'Maximum length is 5'),
  wastagePercentage: z.string().optional(),
  itemType: z.string().nonempty("Item type is required"),
  minOrderQty: z.string().optional(),
  maxOrderQty: z.string().optional(),
  leadTime: z.string().optional(),
  reorderLevel: z.string().optional(),
  reorderLevelType: z.string().nonempty("Reorder Level Type is required"),
  safetyStock: z.string().optional(),
  shelfLife: z.number().optional(),
  shelfLifeType: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  vatId: z.string().nullable().optional(),
  brandId: z.string().nullable().optional(),
  parentCategory: z.string().nonempty("Parent Category is required"),
  childCategory: z.string().nonempty("Child Category is required"),
  categoryId: z.string().nonempty("category is required"),
  item_details: z.object({
    tags: z.array(z.string()).nullable(),
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
    splitSellQty: z.number().nullable(),
    hasBoxBarcode: z.boolean(),
    hasLinkedItem: z.boolean(),
    isPriceMarked: z.boolean(),
    minSellingQty: z.number().nullable(),
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
  // linked_items: z.array(z.any()),
  // item_barcodes: z.array(z.any())
});




export const supplierFormSchema = z.object({
  supplierId: z.number().optional(),
  shortCode: z.string().min(1, "Short code is required"),
  logo: z.string().nullable().optional(),
  supplierName: z.string().min(1, "Supplier name is required"),
  contactPersonName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  emailCc: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  fax: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  webPortal: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postcode: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  supplierType: z.string().nullable().optional(),
  postingGroup: z.string().nullable().optional(),
  creditScore: z.string().nullable().optional(),
  status: z.boolean().optional(),
  createdBy: z.number().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  supplier_details: z.array(
    z.object({
      orderCc: z.string().nullable().optional(),
      orderBcc: z.string().nullable().optional(),
      orderUom: z.string().nullable().optional(),
      orderEmail: z.string().nullable().optional(),
      invoiceType: z.string().nullable().optional(),
      maxOrderQty: z.string().nullable().optional(),
      minOrderQty: z.string().nullable().optional(),
      deliveryCharge: z.string().nullable().optional(),
      hasFtpAccount: z.boolean().nullable().optional(),
      maxOrderValue: z.string().nullable().optional(),
      minOrderValue: z.string().nullable().optional(),
      isCashAccepted: z.boolean().optional(),
      isMainSupplier: z.boolean().optional(),
      canAcceptReturn: z.boolean().optional(),
      isDailySupplier: z.boolean().optional(),
      canScheduleOrder: z.boolean().optional(),
      isRebateSupplier: z.boolean().optional(),
      orderStatusEmail: z.string().nullable().optional(),
      isAnySpecialPrice: z.boolean().optional(),
      orderPlacementType: z.string().nullable().optional(),
      payOutAmountLimit: z.string().nullable().optional(),
      canRaiseCreditNote: z.boolean().optional(),
      isPrePaymentNeeded: z.boolean().optional(),
      canPlaceMultipleOrder: z.boolean().optional(),
      canBePaidOutFromTill: z.boolean().optional(),
      freeDeliveryOrderValue: z.string().nullable().optional(),
      willReceiveDeliveryNote: z.boolean().optional(),
      canOrderPriceMarkedItem: z.boolean().optional(),
      canBePartOfPurchasePlan: z.boolean().optional(),
      noOfDeliveryNotesToBeMerged: z.string().nullable().optional(),
      canBeConsideredForFastestSupplier: z.boolean().optional(),
      canBeConsideredForCheapestSupplier: z.boolean().optional(),
      needToCheckPalletPriceBeforeOrder: z.boolean().optional(),
    })
  ).optional(),
  ftp_data: z.array(
    z.object({
      ftpUrl: z.string().nullable().optional(),
      ftpType: z.string().nullable().optional(),
      autoDelete: z.boolean().optional(),
      ftpPassword: z.string().nullable().optional(),
      ftpUsername: z.string().nullable().optional(),
      autoDownload: z.boolean().optional(),
      sellerBuyerId: z.string().nullable().optional(),
      connectionName: z.string().nullable().optional(),
      autoDownloadTime: z.string().nullable().optional(),
    })
  ).optional(),
  price_rules: z.array(
    z.object({
      margin: z.number().optional(),
      endDate: z.string().nullable().optional(),
      startDate: z.string().nullable().optional(),
      categoryId: z.number().optional(),
      roundValue1: z.number().optional(),
      roundValue2: z.number().optional(),
      categoryName: z.string().nullable().optional(),
      roundConcept: z.string().nullable().optional(),
    })
  ).optional(),
  delivery_schedules: z.array(
    z.object({
      endTime: z.string().nullable().optional(),
      orderDay: z.string().nullable().optional(),
      startTime: z.string().nullable().optional(),
      deliveryDay: z.string().nullable().optional(),
      scheduledType: z.string().nullable().optional(),
      extendedLeadTime: z.string().nullable().optional(),
      standardLeadTime: z.string().nullable().optional(),
      promotionLeadTime: z.string().nullable().optional(),
    })
  ).optional(),
  categories: z.array(
    z.object({
      isPLU: z.boolean().nullable().optional(),
      level: z.number().nullable().optional(),
      pluCode: z.string().nullable().optional(),
      parentId: z.number().nullable().optional(),
      categoryName: z.string().nullable().optional(),
      canAssignItems: z.boolean().nullable().optional(),
      translatedName: z.string().nullable().optional(),
    })
  ).optional(),
  agents: z.array(
    z.object({
      agentName: z.string().nullable().optional(),
      agentEmail: z.string().nullable().optional(),
      agentPhone: z.string().nullable().optional(),
      agentWhatsapp: z.string().nullable().optional(),
    })
  ).optional(),
});


export const companySearchFormSchema = z.object({
  companyId: z.number(),
  companyCode: z.string().min(1),
  companyName: z.string().min(1),
  ownerName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  status: z.boolean().default(true),
  taxNo: z.string().optional(),
  createdAt: z.date().optional(),
  createdBy: z.number().optional(),
  updatedAt: z.date().optional(),
  updatedBy: z.number().optional(),
  website: z.string().url().optional(),
  logo: z.string().nullable().optional(),
});


export const storeFormSchema = z.object({
  ownerName: z.string().min(1, 'Owner Name is required'),
  taxNo: z.string().min(1, 'Tax Number is required'),
  companyName: z.string().min(1, 'Company Name is required'),
  companyCode: z.string().min(1, 'Company Code is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  website: z.string().url('Invalid URL').optional(),
  logo: z.string().nullable().optional(),
  status: z.boolean().default(true),
});




export const storeSearchFormSchema = z.object({
  storeId: z.number().optional(),
  storeCode: z.string().optional(),
  storeName: z.string().optional(),
  inChargeName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  storeType: z.string().optional(),
  status: z.boolean().optional(),
});

export const vatFormSchema = z.object({
  vatId: z.string().optional(), // Optional, in case it's not required for new entries
  vatCode: z.string().min(1, "VAT code is required"), // New field
  vatRate: z.number().min(0, "VAT rate must be at least 0").max(100, "VAT rate cannot exceed 100"),
  description: z.string().nullable().optional(), // Allow null values
  effectiveFrom: z.date().refine(date => date <= new Date(), {
    message: "Effective date must be in the past or today",
  }), // Changed from effectiveDate to effectiveFrom
  effectiveTo: z.date().nullable().optional(), // New field, allow null
  countryCode: z.string().nullable().optional(), // New field, allow null
  status: z.boolean().optional(), // New field, optional
});


export const mspStockFormSchema = z.object({
  itemCode: z.string().optional(),
  ip: z.string().optional(),
  module: z.string().nullable().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
});


export const reduceToClearSearchFormSchema = z.object({
  id: z.number().int().optional(), // Optional ID if you're searching by it
  barcode: z.string().optional(),
  itemName: z.string().optional(),
  verification: z.enum(['Pending', 'Approved', 'Rejected']).optional(),
  storename: z.string().optional(),
  categoryname: z.string().optional(),
  qty: z.string().optional(),
  updatedQty: z.number().nullable().optional(),
  count: z.number().int().optional(),
  price: z.number().nullable().optional(),
  approvedPrice: z.number().nullable().optional(),
  createdAt: z.string().optional(),
  priceAddedAt: z.string().nullable().optional(),
  approvedAt: z.string().nullable().optional(),
  expiryDate: z.string().optional(),
});


export const newReduceToClearFormSchema = z.object({
  barcode: z.string().nonempty("Barcode is required.").min(5, "Barcode must be at least 5 characters long."),
  itemName: z.string().nonempty("Item name is required.").min(3, "Item name must be at least 3 characters long."),
  qty: z.number().int("Quantity must be a whole number.").positive("Quantity must be greater than zero.").nonnegative("Quantity is required."),
  storeId: z.string(),
  categoryId: z.string(),
  expiryDate: z.date().optional(),
  status: z.boolean().optional().default(true), // Optional, defaulting to true
});


export const rolesAndRightsFormSchema = z.object({
  roleName: z.string().nonempty("Role name is required"),
  description: z.string().optional(),
  reportingToRole: z.string().optional(), // Assuming it's a string, modify if needed
  reportingToUser: z.string().optional(), // Assuming it's a string, modify if needed
  status: z.boolean(), // Status should be a boolean
});

export const stockTakeFormSchema = z.object({
  itemCode: z.string().optional(),
  barcode: z.string().optional(),
  itemName: z.string().optional(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
  status: z.boolean().default(true),
}).refine(
  (data) => {
    // Ensure at least one of the main fields is filled
    return !!(data.itemCode || data.barcode || data.itemName || data.supplier);
  },
  {
    message: "At least one of: Item Code, Barcode, Item Name, or Supplier Code is required",
    path: ["itemCode"], // This will show the error on the itemCode field, but applies to all fields
  }
);
