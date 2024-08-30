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
    supplier:z.string().optional(),
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
  isAssignItem: z.string().optional(),
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
  expiry:  z.string(),                              // Optional date field
  company: z.string(),              // Required string
  storeType: z.string(),         // Required string
});

export const NewUserSchema = z
  .object({
    Id: z.string().nonempty("Id is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    phone: z.string().nonempty("Phone number is required"),
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


