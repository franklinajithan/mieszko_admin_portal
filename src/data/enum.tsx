enum CategoryLevel {
  Parent = 1,
  Child = 2,
  Grandchild = 3
}

export enum ModeType {
  Edit = 'edit',
  Add = 'add',
}


export interface City {
  value: string;
  label: string;
}


export type Promotion = {
  id: number;           // Unique identifier for the promotion
  name: string;         // Name of the promotion (e.g., "Buy One Get One Free")
  description: string;  // Description of the promotion
  active: boolean;      // Whether the promotion is currently active
  startDate?: string;   // Optional start date (if available)
  endDate?: string;     // Optional end date (if available)
};

export interface Country {
  value: string;
  label: string;
}

export type CountryToCities = {
  [key: string]: City[];
};

export enum HttpStatusCode {
  // 1xx: Informational
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,

  // 2xx: Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,

  // 3xx: Redirection
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx: Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // 5xx: Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}


export const countries: Country[] = [
  { value: 'AD', label: 'Andorra' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AO', label: 'Angola' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cape Verde' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo, Democratic Republic of the' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'CI', label: 'Côte d\'Ivoire' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GR', label: 'Greece' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KR', label: 'South Korea' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Lao People\'s Democratic Republic' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MK', label: 'North Macedonia' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia' },
  { value: 'MD', label: 'Moldova' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'KP', label: 'North Korea' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PT', label: 'Portugal' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RE', label: 'Réunion' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russia' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'São Tomé and Príncipe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SX', label: 'Sint Maarten' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'SS', label: 'South Sudan' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'WF', label: 'Wallis and Futuna' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' }
];



export const countryToCities: CountryToCities = {
  // Asia
  'AF': [
    { value: 'Kabul', label: 'Kabul' },
    { value: 'Herat', label: 'Herat' },
    { value: 'Mazar-i-Sharif', label: 'Mazar-i-Sharif' },
  ],
  'AM': [
    { value: 'Yerevan', label: 'Yerevan' },
    { value: 'Gyumri', label: 'Gyumri' },
    { value: 'Vagharshapat', label: 'Vagharshapat' },
  ],
  'AZ': [
    { value: 'Baku', label: 'Baku' },
    { value: 'Ganja', label: 'Ganja' },
    { value: 'Lankaran', label: 'Lankaran' },
  ],
  'BH': [
    { value: 'Manama', label: 'Manama' },
    { value: 'Riffa', label: 'Riffa' },
    { value: 'Muharraq', label: 'Muharraq' },
  ],
  'BD': [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Khulna', label: 'Khulna' },
  ],
  'BT': [
    { value: 'Thimphu', label: 'Thimphu' },
    { value: 'Punakha', label: 'Punakha' },
    { value: 'Paro', label: 'Paro' },
  ],
  'BN': [
    { value: 'Bandar Seri Begawan', label: 'Bandar Seri Begawan' },
    { value: 'Kuala Belait', label: 'Kuala Belait' },
    { value: 'Seria', label: 'Seria' },
  ],
  'KH': [
    { value: 'Phnom Penh', label: 'Phnom Penh' },
    { value: 'Siem Reap', label: 'Siem Reap' },
    { value: 'Battambang', label: 'Battambang' },
  ],
  'CN': [
    { value: 'Beijing', label: 'Beijing' },
    { value: 'Shanghai', label: 'Shanghai' },
    { value: 'Guangzhou', label: 'Guangzhou' },
  ],
  'CY': [
    { value: 'Nicosia', label: 'Nicosia' },
    { value: 'Limassol', label: 'Limassol' },
    { value: 'Larnaca', label: 'Larnaca' },
  ],
  'GE': [
    { value: 'Tbilisi', label: 'Tbilisi' },
    { value: 'Batumi', label: 'Batumi' },
    { value: 'Zugdidi', label: 'Zugdidi' },
  ],
  'IN': [
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bengaluru', label: 'Bengaluru' },
  ],
  'ID': [
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Surabaya', label: 'Surabaya' },
    { value: 'Medan', label: 'Medan' },
  ],
  'IR': [
    { value: 'Tehran', label: 'Tehran' },
    { value: 'Isfahan', label: 'Isfahan' },
    { value: 'Shiraz', label: 'Shiraz' },
  ],
  'IQ': [
    { value: 'Baghdad', label: 'Baghdad' },
    { value: 'Mosul', label: 'Mosul' },
    { value: 'Erbil', label: 'Erbil' },
  ],
  'IL': [
    { value: 'Jerusalem', label: 'Jerusalem' },
    { value: 'Tel Aviv', label: 'Tel Aviv' },
    { value: 'Haifa', label: 'Haifa' },
  ],
  'JP': [
    { value: 'Tokyo', label: 'Tokyo' },
    { value: 'Osaka', label: 'Osaka' },
    { value: 'Kyoto', label: 'Kyoto' },
  ],
  'JO': [
    { value: 'Amman', label: 'Amman' },
    { value: 'Zarqa', label: 'Zarqa' },
    { value: 'Irbid', label: 'Irbid' },
  ],
  'KZ': [
    { value: 'Almaty', label: 'Almaty' },
    { value: 'Nur-Sultan', label: 'Nur-Sultan' },
    { value: 'Shymkent', label: 'Shymkent' },
  ],
  'KW': [
    { value: 'Kuwait City', label: 'Kuwait City' },
    { value: 'Hawally', label: 'Hawally' },
    { value: 'Jahra', label: 'Jahra' },
  ],
  'KG': [
    { value: 'Bishkek', label: 'Bishkek' },
    { value: 'Osh', label: 'Osh' },
    { value: 'Jalal-Abad', label: 'Jalal-Abad' },
  ],
  'LA': [
    { value: 'Vientiane', label: 'Vientiane' },
    { value: 'Luang Prabang', label: 'Luang Prabang' },
    { value: 'Pakse', label: 'Pakse' },
  ],
  'LB': [
    { value: 'Beirut', label: 'Beirut' },
    { value: 'Tripoli', label: 'Tripoli' },
    { value: 'Sidon', label: 'Sidon' },
  ],
  'MY': [
    { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
    { value: 'George Town', label: 'George Town' },
    { value: 'Kota Kinabalu', label: 'Kota Kinabalu' },
  ],
  'MV': [
    { value: 'Malé', label: 'Malé' },
    { value: 'Addu City', label: 'Addu City' },
    { value: 'Fuvahmulah', label: 'Fuvahmulah' },
  ],
  'MN': [
    { value: 'Ulaanbaatar', label: 'Ulaanbaatar' },
    { value: 'Erdenet', label: 'Erdenet' },
    { value: 'Darkhan', label: 'Darkhan' },
  ],
  'MM': [
    { value: 'Naypyidaw', label: 'Naypyidaw' },
    { value: 'Yangon', label: 'Yangon' },
    { value: 'Mandalay', label: 'Mandalay' },
  ],
  'NP': [
    { value: 'Kathmandu', label: 'Kathmandu' },
    { value: 'Pokhara', label: 'Pokhara' },
    { value: 'Lalitpur', label: 'Lalitpur' },
  ],
  'KP': [
    { value: 'Pyongyang', label: 'Pyongyang' },
    { value: 'Nampo', label: 'Nampo' },
    { value: 'Kaesong', label: 'Kaesong' },
  ],
  'OM': [
    { value: 'Muscat', label: 'Muscat' },
    { value: 'Salalah', label: 'Salalah' },
    { value: 'Sohar', label: 'Sohar' },
  ],
  'PK': [
    { value: 'Islamabad', label: 'Islamabad' },
    { value: 'Karachi', label: 'Karachi' },
    { value: 'Lahore', label: 'Lahore' },
  ],
  'PS': [
    { value: 'Ramallah', label: 'Ramallah' },
    { value: 'Gaza', label: 'Gaza' },
    { value: 'Hebron', label: 'Hebron' },
  ],
  'PH': [
    { value: 'Manila', label: 'Manila' },
    { value: 'Cebu City', label: 'Cebu City' },
    { value: 'Davao City', label: 'Davao City' },
  ],
  'QA': [
    { value: 'Doha', label: 'Doha' },
    { value: 'Al Khor', label: 'Al Khor' },
    { value: 'Umm Salal', label: 'Umm Salal' },
  ],
  'SA': [
    { value: 'Riyadh', label: 'Riyadh' },
    { value: 'Jeddah', label: 'Jeddah' },
    { value: 'Dammam', label: 'Dammam' },
  ],
  'SG': [
    { value: 'Singapore', label: 'Singapore' },
  ],
  'KR': [
    { value: 'Seoul', label: 'Seoul' },
    { value: 'Busan', label: 'Busan' },
    { value: 'Incheon', label: 'Incheon' },
  ],
  'LK': [
    { value: 'Colombo', label: 'Colombo' },
    { value: 'Kandy', label: 'Kandy' },
    { value: 'Galle', label: 'Galle' },
  ],
  'SY': [
    { value: 'Damascus', label: 'Damascus' },
    { value: 'Aleppo', label: 'Aleppo' },
    { value: 'Homs', label: 'Homs' },
  ],
  'TW': [
    { value: 'Taipei', label: 'Taipei' },
    { value: 'Kaohsiung', label: 'Kaohsiung' },
    { value: 'Taichung', label: 'Taichung' },
  ],
  'TJ': [
    { value: 'Dushanbe', label: 'Dushanbe' },
    { value: 'Khujand', label: 'Khujand' },
    { value: 'Kulob', label: 'Kulob' },
  ],
  'TH': [
    { value: 'Bangkok', label: 'Bangkok' },
    { value: 'Chiang Mai', label: 'Chiang Mai' },
    { value: 'Pattaya', label: 'Pattaya' },
  ],
  'TL': [
    { value: 'Dili', label: 'Dili' },
    { value: 'Baucau', label: 'Baucau' },
    { value: 'Liquiça', label: 'Liquiça' },
  ],
  'TR': [
    { value: 'Istanbul', label: 'Istanbul' },
    { value: 'Ankara', label: 'Ankara' },
    { value: 'Izmir', label: 'Izmir' },
  ],
  'TM': [
    { value: 'Ashgabat', label: 'Ashgabat' },
    { value: 'Turkmenabat', label: 'Turkmenabat' },
    { value: 'Mary', label: 'Mary' },
  ],
  'AE': [
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Sharjah', label: 'Sharjah' },
  ],
  'UZ': [
    { value: 'Tashkent', label: 'Tashkent' },
    { value: 'Samarkand', label: 'Samarkand' },
    { value: 'Bukhara', label: 'Bukhara' },
  ],
  'VN': [
    { value: 'Hanoi', label: 'Hanoi' },
    { value: 'Ho Chi Minh City', label: 'Ho Chi Minh City' },
    { value: 'Da Nang', label: 'Da Nang' },
  ],
  'YE': [
    { value: 'Sana\'a', label: 'Sana\'a' },
    { value: 'Aden', label: 'Aden' },
    { value: 'Taiz', label: 'Taiz' },
  ],

  // Europe
  'AL': [
    { value: 'Tirana', label: 'Tirana' },
    { value: 'Durrës', label: 'Durrës' },
    { value: 'Shkodër', label: 'Shkodër' },
  ],
  'AD': [
    { value: 'Andorra la Vella', label: 'Andorra la Vella' },
    { value: 'Escaldes-Engordany', label: 'Escaldes-Engordany' },
    { value: 'Encamp', label: 'Encamp' },
  ],
  'AT': [
    { value: 'Vienna', label: 'Vienna' },
    { value: 'Graz', label: 'Graz' },
    { value: 'Linz', label: 'Linz' },
  ],
  'BY': [
    { value: 'Minsk', label: 'Minsk' },
    { value: 'Brest', label: 'Brest' },
    { value: 'Gomel', label: 'Gomel' },
  ],
  'BE': [
    { value: 'Brussels', label: 'Brussels' },
    { value: 'Antwerp', label: 'Antwerp' },
    { value: 'Ghent', label: 'Ghent' },
  ],
  'BA': [
    { value: 'Sarajevo', label: 'Sarajevo' },
    { value: 'Banja Luka', label: 'Banja Luka' },
    { value: 'Tuzla', label: 'Tuzla' },
  ],
  'BG': [
    { value: 'Sofia', label: 'Sofia' },
    { value: 'Plovdiv', label: 'Plovdiv' },
    { value: 'Varna', label: 'Varna' },
  ],
  'HR': [
    { value: 'Zagreb', label: 'Zagreb' },
    { value: 'Split', label: 'Split' },
    { value: 'Rijeka', label: 'Rijeka' },
  ],
  'CZ': [
    { value: 'Prague', label: 'Prague' },
    { value: 'Brno', label: 'Brno' },
    { value: 'Ostrava', label: 'Ostrava' },
  ],
  'DK': [
    { value: 'Copenhagen', label: 'Copenhagen' },
    { value: 'Aarhus', label: 'Aarhus' },
    { value: 'Odense', label: 'Odense' },
  ],
  'EE': [
    { value: 'Tallinn', label: 'Tallinn' },
    { value: 'Tartu', label: 'Tartu' },
    { value: 'Narva', label: 'Narva' },
  ],
  'FI': [
    { value: 'Helsinki', label: 'Helsinki' },
    { value: 'Espoo', label: 'Espoo' },
    { value: 'Tampere', label: 'Tampere' },
  ],
  'FR': [
    { value: 'Paris', label: 'Paris' },
    { value: 'Marseille', label: 'Marseille' },
    { value: 'Lyon', label: 'Lyon' },
  ],
  'DE': [
    { value: 'Berlin', label: 'Berlin' },
    { value: 'Munich', label: 'Munich' },
    { value: 'Frankfurt', label: 'Frankfurt' },
  ],
  'GR': [
    { value: 'Athens', label: 'Athens' },
    { value: 'Thessaloniki', label: 'Thessaloniki' },
    { value: 'Patras', label: 'Patras' },
  ],
  'HU': [
    { value: 'Budapest', label: 'Budapest' },
    { value: 'Debrecen', label: 'Debrecen' },
    { value: 'Szeged', label: 'Szeged' },
  ],
  'IS': [
    { value: 'Reykjavik', label: 'Reykjavik' },
    { value: 'Akureyri', label: 'Akureyri' },
    { value: 'Hafnarfjordur', label: 'Hafnarfjordur' },
  ],
  'IE': [
    { value: 'Dublin', label: 'Dublin' },
    { value: 'Cork', label: 'Cork' },
    { value: 'Limerick', label: 'Limerick' },
  ],
  'IT': [
    { value: 'Rome', label: 'Rome' },
    { value: 'Milan', label: 'Milan' },
    { value: 'Naples', label: 'Naples' },
  ],
  'LV': [
    { value: 'Riga', label: 'Riga' },
    { value: 'Daugavpils', label: 'Daugavpils' },
    { value: 'Liepaja', label: 'Liepaja' },
  ],
  'LI': [
    { value: 'Vaduz', label: 'Vaduz' },
    { value: 'Schaan', label: 'Schaan' },
    { value: 'Eschen', label: 'Eschen' },
  ],
  'LT': [
    { value: 'Vilnius', label: 'Vilnius' },
    { value: 'Kaunas', label: 'Kaunas' },
    { value: 'Klaipeda', label: 'Klaipeda' },
  ],
  'LU': [
    { value: 'Luxembourg City', label: 'Luxembourg City' },
    { value: 'Esch-sur-Alzette', label: 'Esch-sur-Alzette' },
    { value: 'Differdange', label: 'Differdange' },
  ],
  'MT': [
    { value: 'Valletta', label: 'Valletta' },
    { value: 'Sliema', label: 'Sliema' },
    { value: 'Birkirkara', label: 'Birkirkara' },
  ],
  'MC': [
    { value: 'Monaco', label: 'Monaco' },
  ],
  'MD': [
    { value: 'Chisinau', label: 'Chisinau' },
    { value: 'Bălți', label: 'Bălți' },
    { value: 'Bender', label: 'Bender' },
  ],
  'ME': [
    { value: 'Podgorica', label: 'Podgorica' },
    { value: 'Herceg Novi', label: 'Herceg Novi' },
    { value: 'Bijelo Polje', label: 'Bijelo Polje' },
  ],
  'NL': [
    { value: 'Amsterdam', label: 'Amsterdam' },
    { value: 'Rotterdam', label: 'Rotterdam' },
    { value: 'The Hague', label: 'The Hague' },
  ],
  'NO': [
    { value: 'Oslo', label: 'Oslo' },
    { value: 'Bergen', label: 'Bergen' },
    { value: 'Stavanger', label: 'Stavanger' },
  ],
  'PL': [
    { value: 'Warsaw', label: 'Warsaw' },
    { value: 'Kraków', label: 'Kraków' },
    { value: 'Wrocław', label: 'Wrocław' },
  ],
  'PT': [
    { value: 'Lisbon', label: 'Lisbon' },
    { value: 'Porto', label: 'Porto' },
    { value: 'Coimbra', label: 'Coimbra' },
  ],
  'RO': [
    { value: 'Bucharest', label: 'Bucharest' },
    { value: 'Cluj-Napoca', label: 'Cluj-Napoca' },
    { value: 'Timișoara', label: 'Timișoara' },
  ],
  'RU': [
    { value: 'Moscow', label: 'Moscow' },
    { value: 'Saint Petersburg', label: 'Saint Petersburg' },
    { value: 'Novosibirsk', label: 'Novosibirsk' },
  ],
  'SM': [
    { value: 'San Marino', label: 'San Marino' },
  ],
  'RS': [
    { value: 'Belgrade', label: 'Belgrade' },
    { value: 'Novi Sad', label: 'Novi Sad' },
    { value: 'Niš', label: 'Niš' },
  ],
  'SK': [
    { value: 'Bratislava', label: 'Bratislava' },
    { value: 'Košice', label: 'Košice' },
    { value: 'Prešov', label: 'Prešov' },
  ],
  'SI': [
    { value: 'Ljubljana', label: 'Ljubljana' },
    { value: 'Maribor', label: 'Maribor' },
    { value: 'Celje', label: 'Celje' },
  ],
  'ES': [
    { value: 'Madrid', label: 'Madrid' },
    { value: 'Barcelona', label: 'Barcelona' },
    { value: 'Valencia', label: 'Valencia' },
  ],
  'SE': [
    { value: 'Stockholm', label: 'Stockholm' },
    { value: 'Gothenburg', label: 'Gothenburg' },
    { value: 'Malmö', label: 'Malmö' },
  ],
  'CH': [
    { value: 'Zurich', label: 'Zurich' },
    { value: 'Geneva', label: 'Geneva' },
    { value: 'Bern', label: 'Bern' },
  ],
  'UA': [
    { value: 'Kyiv', label: 'Kyiv' },
    { value: 'Kharkiv', label: 'Kharkiv' },
    { value: 'Odesa', label: 'Odesa' },
  ],
  'GB': [
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Birmingham', label: 'Birmingham' },
  ],
  'VA': [
    { value: 'Vatican City', label: 'Vatican City' },
  ],

};


export const supplierTypes = [
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'wholesaler', label: 'Wholesaler' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'retailer', label: 'Retailer' },
  { value: 'importer', label: 'Importer' },
  { value: 'exporter', label: 'Exporter' },
  { value: 'serviceProvider', label: 'Service Provider' },
  { value: 'broker', label: 'Broker' },
  { value: 'tradingCompany', label: 'Trading Company' },
  { value: 'dropshipper', label: 'Dropshipper' },
  { value: 'edi', label: 'EDI' },
  { value: 'local', label: 'Local' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'store', label: 'Store' }
];

export const supplierCreditScores = [
  { value: 'excellent', label: 'Excellent (800-850)' },
  { value: 'very_good', label: 'Very Good (740-799)' },
  { value: 'good', label: 'Good (670-739)' },
  { value: 'fair', label: 'Fair (580-669)' },
  { value: 'poor', label: 'Poor (300-579)' }
];

export const uomList = [
  { value: 'case', label: 'Case' },
  { value: 'Unit', label: 'Unit' },
  { value: 'dozen', label: 'Dozen' },
  { value: 'each', label: 'Each' },
  { value: 'pcs', label: 'Pieces' },
  { value: 'kg', label: 'Kilograms' },
  { value: 'lb', label: 'Pounds' },
  { value: 'ltr', label: 'Liters' },
  { value: 'ml', label: 'Milliliters' },
  { value: 'm', label: 'Meters' },
  { value: 'cm', label: 'Centimeters' },
  { value: 'm2', label: 'Square Meters' },
  { value: 'm3', label: 'Cubic Meters' },
  { value: 'yd', label: 'Yards' },
  { value: 'ft', label: 'Feet' },
  { value: 'in', label: 'Inches' },
  { value: 'box', label: 'Box' },
  { value: 'set', label: 'Set' },
  { value: 'roll', label: 'Roll' }
];

export const invoiceTypes = [
  { value: 'standard', label: 'Standard Invoice' },
  { value: 'credit', label: 'Credit Invoice' },
  { value: 'debit', label: 'Debit Invoice' },
  { value: 'email', label: 'Email-Invoice' },
  { value: 'paper', label: 'Paper Invoice' },

];

export const reorderingPolicies = [
  { value: 'min_max', label: 'Min-Max Policy' },
  { value: 'fixed_order_qty', label: 'Fixed Order Quantity' },
  { value: 'economic_order_qty', label: 'Economic Order Quantity (EOQ)' },
  { value: 'just_in_time', label: 'Just-in-Time (JIT)' },
  { value: 'order_point', label: 'Order Point Policy' },
  { value: 'safety_stock', label: 'Safety Stock Policy' },
  { value: 'automatic_reorder', label: 'Automatic Reorder' },
  { value: 'manual_reorder', label: 'Manual Reorder' },
  { value: 'dynamic_reorder', label: 'Dynamic Reorder' }
];

export const reschedulePeriods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semiannually', label: 'Semiannually' },
  { value: 'annually', label: 'Annually' }
];


export const ukCities = [
  { value: 'london', label: 'London' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'glasgow', label: 'Glasgow' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'liverpool', label: 'Liverpool' },
  { value: 'sheffield', label: 'Sheffield' },
  { value: 'edinburgh', label: 'Edinburgh' },
  { value: 'bristol', label: 'Bristol' },
  { value: 'cardiff', label: 'Cardiff' },
  { value: 'belfast', label: 'Belfast' },
  { value: 'nottingham', label: 'Nottingham' },
  { value: 'leicester', label: 'Leicester' },
  { value: 'coventry', label: 'Coventry' },
  { value: 'oxford', label: 'Oxford' },
  { value: 'derby', label: 'Derby' },
  { value: 'milton_keynes', label: 'Milton Keynes' },
  { value: 'luton', label: 'Luton' },
  { value: 'blackpool', label: 'Blackpool' },
  { value: 'stoke_on_trent', label: 'Stoke-on-Trent' },
  { value: 'york', label: 'York' },
  { value: 'cambridge', label: 'Cambridge' },
  { value: 'brighton', label: 'Brighton' },
  { value: 'southampton', label: 'Southampton' },
  { value: 'reading', label: 'Reading' },
  { value: 'bournemouth', label: 'Bournemouth' },
  { value: 'wolverhampton', label: 'Wolverhampton' },
  { value: 'sunderland', label: 'Sunderland' },
  { value: 'newcastle', label: 'Newcastle upon Tyne' },
  { value: 'swindon', label: 'Swindon' },
  { value: 'preston', label: 'Preston' },
  { value: 'warrington', label: 'Warrington' },
  { value: 'gateshead', label: 'Gateshead' },
  { value: 'hartlepool', label: 'Hartlepool' },
  { value: 'dudley', label: 'Dudley' },
  { value: 'oldham', label: 'Oldham' },
  { value: 'salford', label: 'Salford' },
  { value: 'birkenhead', label: 'Birkenhead' },
  { value: 'colchester', label: 'Colchester' },
  { value: 'telford', label: 'Telford' },
  { value: 'barnsley', label: 'Barnsley' },
  { value: 'basingstoke', label: 'Basingstoke' },
  { value: 'woking', label: 'Woking' },
  { value: 'exeter', label: 'Exeter' },
  { value: 'bolton', label: 'Bolton' },
  { value: 'rotherham', label: 'Rotherham' },
  { value: 'eastbourne', label: 'Eastbourne' },
  { value: 'halifax', label: 'Halifax' },
  { value: 'stockport', label: 'Stockport' },
  { value: 'hull', label: 'Hull' },
  { value: 'perth', label: 'Perth' },
  { value: 'aberdeen', label: 'Aberdeen' }
];

export const ukRegions = [
  { value: 'england', label: 'England' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'wales', label: 'Wales' },
  { value: 'northern_ireland', label: 'Northern Ireland' },
  { value: 'london', label: 'London' },
  { value: 'south_east', label: 'South East' },
  { value: 'south_west', label: 'South West' },
  { value: 'east_midlands', label: 'East Midlands' },
  { value: 'west_midlands', label: 'West Midlands' },
  { value: 'north_west', label: 'North West' },
  { value: 'north_east', label: 'North East' },
  { value: 'yorkshire_and_the_humber', label: 'Yorkshire and the Humber' },
  { value: 'east_of_england', label: 'East of England' },
  { value: 'cumbria', label: 'Cumbria' },
  { value: 'merseyside', label: 'Merseyside' },
  { value: 'greater_manchester', label: 'Greater Manchester' },
  { value: 'lancashire', label: 'Lancashire' },
  { value: 'cheshire', label: 'Cheshire' },
  { value: 'derbyshire', label: 'Derbyshire' },
  { value: 'nottinghamshire', label: 'Nottinghamshire' },
  { value: 'leicestershire', label: 'Leicestershire' },
  { value: 'staffordshire', label: 'Staffordshire' },
  { value: 'warwickshire', label: 'Warwickshire' },
  { value: 'oxfordshire', label: 'Oxfordshire' },
  { value: 'buckinghamshire', label: 'Buckinghamshire' },
  { value: 'berkshire', label: 'Berkshire' },
  { value: 'hampshire', label: 'Hampshire' },
  { value: 'surrey', label: 'Surrey' },
  { value: 'sussex', label: 'Sussex' },
  { value: 'kent', label: 'Kent' },
  { value: 'essex', label: 'Essex' },
  { value: 'hertfordshire', label: 'Hertfordshire' },
  { value: 'bedfordshire', label: 'Bedfordshire' },
  { value: 'cambridgeshire', label: 'Cambridgeshire' },
  { value: 'norfolk', label: 'Norfolk' },
  { value: 'suffolk', label: 'Suffolk' },
  { value: 'lincolnshire', label: 'Lincolnshire' }
];


export const roles = [
  { value: 'store_manager', label: 'Store Manager' },
  { value: 'assistant_manager', label: 'Assistant Manager' },
  { value: 'sales_associate', label: 'Sales Associate' },
  { value: 'cashier', label: 'Cashier' },
  { value: 'stock_clerk', label: 'Stock Clerk' },
  { value: 'visual_merchandiser', label: 'Visual Merchandiser' },
  { value: 'customer_service_representative', label: 'Customer Service Representative' },
  { value: 'floor_supervisor', label: 'Floor Supervisor' },
  { value: 'security_guard', label: 'Security Guard' },
  { value: 'inventory_control_specialist', label: 'Inventory Control Specialist' },
  { value: 'department_manager', label: 'Department Manager' },
  { value: 'sales_lead', label: 'Sales Lead' },
  { value: 'delivery_driver', label: 'Delivery Driver' },
  { value: 'marketing_specialist', label: 'Marketing Specialist' },
  { value: 'cleaner', label: 'Cleaner' }
];


export const storeLocations = [
  { value: 'headOffice', label: 'Head Office' },
  { value: 'eastham', label: 'East Ham' },
  { value: 'gravesend', label: 'Gravesend' },
  { value: 'hayes', label: 'Hayes' },
  { value: 'hounslow', label: 'Hounslow' },
  { value: 'perivale', label: 'Perivale' },
  { value: 'streatham', label: 'Streatham' },
  { value: 'sudbury', label: 'Sudbury' },
  { value: 'swindon', label: 'Swindon' },
  { value: 'watford', label: 'Watford' }
];

export const visaTypes = [
  { value: 'tourist', label: 'Tourist Visa' },
  { value: 'business', label: 'Business Visa' },
  { value: 'student', label: 'Student Visa' },
  { value: 'work', label: 'Work Visa' },
  { value: 'transit', label: 'Transit Visa' },
  { value: 'immigrant', label: 'Immigrant Visa' },
  { value: 'family', label: 'Family Visa' },
  { value: 'refugee', label: 'Refugee Visa' },
  { value: 'diplomatic', label: 'Diplomatic Visa' },
  { value: 'medical', label: 'Medical Visa' }
];

export const visaStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'expired', label: 'Expired' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'issued', label: 'Issued' },
  { value: 'denied', label: 'Denied' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'renewal_required', label: 'Renewal Required' }
];


export const reorderLevelType = [
  { value: 'case', label: 'Case' },
  { value: 'unit', label: 'Unit' },
  
];




