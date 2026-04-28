// ─── Shared page type ─────────────────────────────────────────────────────────
export type AppPage = "weight" | "health";

// ─── Sheet 1 types ────────────────────────────────────────────────────────────
export type HealthStatus = "Normal" | "Abnormal" | "Watch";

export interface HealthCheckRow {
  item: string;
  result: string;
  reference: string;
  status: HealthStatus;
  unit?: string;
}

export interface HealthCheckSection {
  id: string;
  label: string;
  rows: HealthCheckRow[];
}

// ─── Sheet 1 data ─────────────────────────────────────────────────────────────
export const healthCheckSections: HealthCheckSection[] = [
  {
    id: "general",
    label: "GENERAL",
    rows: [
      { item: "Age",            result: "22",     reference: "–",         status: "Normal", unit: "yrs"   },
      { item: "Height",         result: "170",    reference: "–",         status: "Normal", unit: "cm"    },
      { item: "Weight",         result: "76",     reference: "–",         status: "Normal", unit: "kg"    },
      { item: "BMI",            result: "26.30",  reference: "18.5–24.9", status: "Abnormal", unit: "kg/m²" },
      { item: "Pulse",          result: "69",     reference: "60–100",    status: "Normal", unit: "bpm"   },
      { item: "Blood Pressure", result: "122/73", reference: "<130/80",   status: "Normal", unit: "mmHg"  },
    ],
  },
  {
    id: "physical",
    label: "PHYSICAL EXAM",
    rows: [
      { item: "Head",           result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Heart",          result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Lungs",          result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Abdomen",        result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Extremities",    result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Skin",           result: "Normal", reference: "Normal", status: "Normal" },
      { item: "Nervous System", result: "Normal", reference: "Normal", status: "Normal" },
    ],
  },
  {
    id: "chemistry",
    label: "CHEMISTRY",
    rows: [
      { item: "FBS",         result: "98",   reference: "74–106",    status: "Normal",   unit: "mg/dL" },
      { item: "BUN",         result: "14",   reference: "9–20",      status: "Normal",   unit: "mg/dL" },
      { item: "Creatinine",  result: "0.80", reference: "0.66–1.25", status: "Normal",   unit: "mg/dL" },
      { item: "Uric Acid",   result: "9.1",  reference: "3.5–8.5",   status: "Abnormal", unit: "mg/dL" },
      { item: "Cholesterol", result: "248",  reference: "<200",      status: "Abnormal", unit: "mg/dL" },
      { item: "HDL",         result: "41",   reference: "40–60",     status: "Normal",   unit: "mg/dL" },
      { item: "LDL",         result: "192",  reference: "<150",      status: "Abnormal", unit: "mg/dL" },
      { item: "Triglyceride",result: "78",   reference: "<150",      status: "Normal",   unit: "mg/dL" },
      { item: "AST",         result: "25",   reference: "17–59",     status: "Normal",   unit: "U/L"   },
      { item: "ALT",         result: "28",   reference: "<50",       status: "Normal",   unit: "U/L"   },
      { item: "Albumin",     result: "4.3",  reference: "3.9–5.2",   status: "Normal",   unit: "g/dL"  },
    ],
  },
  {
    id: "hematology",
    label: "HEMATOLOGY",
    rows: [
      { item: "HbA1c", result: "4.7", reference: "3–6", status: "Normal", unit: "%" },
    ],
  },
  {
    id: "cbc",
    label: "CBC",
    rows: [
      { item: "Hb",          result: "14.7",         reference: "14–17",          status: "Normal",   unit: "g/dL" },
      { item: "Hct",         result: "45",           reference: "41–51",          status: "Normal",   unit: "%"    },
      { item: "WBC",         result: "9050",         reference: "5000–10000",     status: "Normal",   unit: "/µL"  },
      { item: "PMNs",        result: "59%",          reference: "45–75%",         status: "Normal",               },
      { item: "Lymph",       result: "31%",          reference: "20–45%",         status: "Normal",               },
      { item: "Mono",        result: "5%",           reference: "2–10%",          status: "Normal",               },
      { item: "Eosin",       result: "4%",           reference: "0–6%",           status: "Normal",               },
      { item: "Baso",        result: "1%",           reference: "0–1%",           status: "Normal",               },
      { item: "Platelet",    result: "320,000",      reference: "140000–440000",  status: "Normal",   unit: "/µL"  },
      { item: "Morphology",  result: "Microcyte few",reference: "–",              status: "Abnormal"              },
    ],
  },
  {
    id: "psa",
    label: "PSA",
    rows: [
      { item: "PSA", result: "1.47", reference: "0–4", status: "Normal", unit: "ng/mL" },
    ],
  },
  {
    id: "serology",
    label: "SEROLOGY",
    rows: [
      { item: "HBsAg", result: "Negative", reference: "Negative", status: "Normal" },
    ],
  },
  {
    id: "urine",
    label: "URINALYSIS",
    rows: [
      { item: "Color",            result: "Yellow",   reference: "Normal",    status: "Normal"              },
      { item: "Appearance",       result: "Clear",    reference: "Normal",    status: "Normal"              },
      { item: "Specific gravity", result: "1.022",    reference: "1.003–1.030", status: "Normal"            },
      { item: "pH",               result: "6.0",      reference: "5.0–8.0",   status: "Normal"              },
      { item: "Protein",          result: "2+",       reference: "Negative",  status: "Abnormal"            },
      { item: "Sugar",            result: "Negative", reference: "Negative",  status: "Normal"              },
      { item: "Ketone",           result: "Negative", reference: "Negative",  status: "Normal"              },
      { item: "Blood",            result: "Negative", reference: "Negative",  status: "Normal"              },
      { item: "Urobilinogen",     result: "Normal",   reference: "Normal",    status: "Normal"              },
      { item: "Bilirubin",        result: "Negative", reference: "Negative",  status: "Normal"              },
      { item: "Nitrite",          result: "Negative", reference: "Negative",  status: "Normal"              },
      { item: "Microalbumin",     result: "150",      reference: "<30",       status: "Abnormal", unit: "mg/L" },
      { item: "Urine Creatinine", result: "8.8",      reference: "–",         status: "Normal",   unit: "mg/dL"},
      { item: "A:C Ratio",        result: "35.29",    reference: "<30",       status: "Abnormal", unit: "mg/g" },
      { item: "WBC",              result: "0–1",      reference: "0–1",       status: "Normal",   unit: "/HPF" },
      { item: "RBC",              result: "0–1",      reference: "0–1",       status: "Normal",   unit: "/HPF" },
      { item: "Epithelial",       result: "0–1",      reference: "0–1",       status: "Normal",   unit: "/HPF" },
      { item: "Bacteria",         result: "–",        reference: "Negative",  status: "Normal"              },
      { item: "Crystal",          result: "–",        reference: "Negative",  status: "Normal"              },
      { item: "Mucous",           result: "–",        reference: "Negative",  status: "Normal"              },
      { item: "Cast",             result: "–",        reference: "Negative",  status: "Normal"              },
    ],
  },
  {
    id: "xray",
    label: "X-RAY",
    rows: [
      { item: "Chest Film", result: "Normal", reference: "Normal", status: "Normal" },
    ],
  },
  {
    id: "ekg",
    label: "EKG",
    rows: [
      { item: "Electrocardiogram", result: "Normal", reference: "Normal", status: "Normal" },
    ],
  },
];

// ─── Sheet 2 types ────────────────────────────────────────────────────────────
export type BloodStatus = "normal" | "watch" | "abnormal";

export interface BloodItem {
  code: string;
  thaiLabel: string;
  value: string;
  unit: string;
  reference: string;
  status: BloodStatus;
  urgency?: "สูง" | "ปานกลาง";
}

export interface BloodCategory {
  id: string;
  thaiName: string;
  englishName: string;
  items: BloodItem[];
}

// ─── Sheet 2 data ─────────────────────────────────────────────────────────────
export const bloodAnalysis: BloodCategory[] = [
  {
    id: "lipids",
    thaiName: "ไขมันในเลือด",
    englishName: "LIPIDS",
    items: [
      { code: "Cholesterol", thaiLabel: "คอเลสเตอรอลรวม",        value: "229.9", unit: "mg/dL", reference: "<200",        status: "abnormal", urgency: "ปานกลาง" },
      { code: "LDL",         thaiLabel: "ไขมันเลว",               value: "184.3", unit: "mg/dL", reference: "<130",        status: "abnormal", urgency: "สูง"      },
      { code: "HDL",         thaiLabel: "ไขมันดี",                value: "53.3",  unit: "mg/dL", reference: ">40 (ชาย)",   status: "normal"                        },
      { code: "TG",          thaiLabel: "ไตรกลีเซอไรด์",          value: "64.7",  unit: "mg/dL", reference: "<150",        status: "normal"                        },
    ],
  },
  {
    id: "kidney",
    thaiName: "ไต",
    englishName: "KIDNEY",
    items: [
      { code: "BUN",        thaiLabel: "ยูเรียในเลือด",           value: "19.7",  unit: "mg/dL", reference: "7–20",        status: "normal" },
      { code: "Creatinine", thaiLabel: "ครีเอตินีน",              value: "0.974", unit: "mg/dL", reference: "0.70–1.30",   status: "normal" },
    ],
  },
  {
    id: "uric",
    thaiName: "กรดยูริก",
    englishName: "URIC ACID",
    items: [
      { code: "Uric Acid", thaiLabel: "กรดยูริกในเลือด",          value: "8.70",  unit: "mg/dL", reference: "3.4–7.0",     status: "abnormal", urgency: "ปานกลาง" },
    ],
  },
  {
    id: "liver",
    thaiName: "ตับ",
    englishName: "LIVER",
    items: [
      { code: "ALP",           thaiLabel: "Alkaline Phosphatase", value: "58.7",  unit: "U/L",  reference: "40–130",      status: "watch"  },
      { code: "AST",           thaiLabel: "เอนไซม์ตับ/กล้ามเนื้อ",value: "16",    unit: "U/L",  reference: "0–40",        status: "normal" },
      { code: "AST (Fast)",    thaiLabel: "เอนไซม์ตับ (fasted)",  value: "15.5",  unit: "U/L",  reference: "0–40",        status: "normal" },
      { code: "ALT",           thaiLabel: "เอนไซม์ตับหลัก",       value: "9.4",   unit: "U/L",  reference: "0–41",        status: "normal" },
      { code: "Total Protein", thaiLabel: "โปรตีนรวมในเลือด",     value: "7.86",  unit: "g/dL", reference: "6.0–8.3",     status: "normal" },
    ],
  },
  {
    id: "vitamins",
    thaiName: "วิตามินและฮอร์โมน",
    englishName: "VITAMINS & HORMONES",
    items: [
      { code: "Vitamin D", thaiLabel: "วิตามิน D (25-OH)", value: "14.98", unit: "ng/mL", reference: "30–100", status: "abnormal", urgency: "สูง" },
      { code: "Cortisol",  thaiLabel: "ฮอร์โมนความเครียด", value: "10.93", unit: "µg/dL", reference: "5–23",   status: "normal"                  },
    ],
  },
  {
    id: "cancer",
    thaiName: "ตรวจคัดกรองมะเร็ง",
    englishName: "CANCER SCREENING",
    items: [
      { code: "CEA",       thaiLabel: "Carcinoembryonic Ag",     value: "3.77",  unit: "ng/mL", reference: "0–5.0", status: "normal" },
      { code: "Total PSA", thaiLabel: "Prostate-Specific Ag",    value: "0.777", unit: "ng/mL", reference: "<4.0",  status: "normal" },
    ],
  },
  {
    id: "infection",
    thaiName: "โรคติดเชื้อ",
    englishName: "INFECTIOUS DISEASE",
    items: [
      { code: "HIV Ag/Ab",   thaiLabel: "HIV 4th gen", value: "0.31 S/CO", unit: "S/CO", reference: "Non-reactive", status: "normal" },
      { code: "Syphilis TP", thaiLabel: "ซิฟิลิส Ab",  value: "0.19 S/CO", unit: "S/CO", reference: "Non-reactive", status: "normal" },
    ],
  },
  {
    id: "immunity",
    thaiName: "ภูมิคุ้มกัน",
    englishName: "IMMUNITY",
    items: [
      { code: "Anti-HBs", thaiLabel: "ภูมิคุ้มกันตับอักเสบ B", value: "191.89", unit: "mIU/mL", reference: ">10", status: "normal" },
    ],
  },
];

// ─── Sheet 3 types ────────────────────────────────────────────────────────────
export interface AbnormalAlert {
  rank: number;
  code: string;
  value: string;
  unit: string;
  reference: string;
  thaiSeverity: string;
  thaiRisk: string;
  actions: string[];
  urgency: "สูง" | "ปานกลาง";
}

export interface AdditionalNormal {
  code: string;
  thaiLabel: string;
  value: string;
  unit: string;
  reference: string;
  note: string;
}

// ─── Sheet 3 data ─────────────────────────────────────────────────────────────
export const abnormalAlerts: AbnormalAlert[] = [
  {
    rank: 1,
    code: "Vitamin D",
    value: "14.98", unit: "ng/mL", reference: "30–100",
    thaiSeverity: "ขาดรุนแรง",
    thaiRisk: "ขาดวิตามิน D รุนแรง กระทบกระดูก ภูมิคุ้มกัน อารมณ์ และการดูดซึมแคลเซียม",
    actions: [
      "เสริม Vitamin D3 2,000–4,000 IU/วัน",
      "รับแสงแดดอ่อนช่วงเช้า 15–20 นาที/วัน",
      "ปรึกษาแพทย์เพื่อขนาดที่เหมาะสม",
      "ตรวจซ้ำหลังรับประทาน 3 เดือน",
    ],
    urgency: "สูง",
  },
  {
    rank: 2,
    code: "LDL Cholesterol",
    value: "184.3", unit: "mg/dL", reference: "<130",
    thaiSeverity: "สูงมาก",
    thaiRisk: "LDL สูงกว่าเกณฑ์ปกติ 42% เพิ่มความเสี่ยงหลอดเลือดแดงแข็งในระยะยาว",
    actions: [
      "ลดอาหารไขมันอิ่มตัว: เนื้อแดง เนย ของทอด",
      "เพิ่มใยอาหาร: ผัก ผลไม้ ธัญพืชไม่ขัดสี",
      "ออกกำลังกายแบบ aerobic ≥150 นาที/สัปดาห์",
      "พบแพทย์ภายใน 1–3 เดือน",
    ],
    urgency: "สูง",
  },
  {
    rank: 3,
    code: "Total Cholesterol",
    value: "229.9", unit: "mg/dL", reference: "<200",
    thaiSeverity: "สูง",
    thaiRisk: "คอเลสเตอรอลรวมสูงกว่าเกณฑ์ 14% เสี่ยงโรคหัวใจและหลอดเลือด",
    actions: [
      "ปรับอาหาร: ลดไขมัน น้ำตาล แป้งขัดขาว",
      "เพิ่มปลา ถั่ว ผัก และน้ำมันมะกอก",
      "ควบคุมน้ำหนักและออกกำลังกายสม่ำเสมอ",
    ],
    urgency: "ปานกลาง",
  },
  {
    rank: 4,
    code: "Uric Acid",
    value: "8.70", unit: "mg/dL", reference: "3.4–7.0",
    thaiSeverity: "สูง",
    thaiRisk: "กรดยูริกสูง เสี่ยงโรคเกาท์ ข้ออักเสบ และนิ่วในไต",
    actions: [
      "งดเครื่องดื่มแอลกอฮอล์และน้ำหวาน",
      "ลดอาหารที่มีพิวรีนสูง: อาหารทะเล เครื่องใน เนื้อแดง",
      "ดื่มน้ำ 2–3 ลิตร/วัน",
      "ปรึกษาแพทย์หากมีอาการข้ออักเสบ",
    ],
    urgency: "ปานกลาง",
  },
];

export const additionalNormals: AdditionalNormal[] = [
  { code: "ALP",          thaiLabel: "Alkaline Phosphatase",  value: "58.7",   unit: "U/L",     reference: "40–130",    note: "ปกติ แต่ต่ำกว่าที่คาดสำหรับอายุ 22 (ติดตามได้)"  },
  { code: "Cortisol",     thaiLabel: "ฮอร์โมนความเครียด",    value: "10.93",  unit: "µg/dL",   reference: "5–23",      note: "ปกติ — ต่อมหมวกไตทำงานดี"                         },
  { code: "Anti-HBs",     thaiLabel: "ภูมิคุ้มกันตับอักเสบ B",value: "191.89", unit: "mIU/mL",  reference: ">10",       note: "ภูมิดีมาก ≥100 = ป้องกันได้สูง ไม่ต้องฉีดกระตุ้น" },
  { code: "AFP",          thaiLabel: "Alpha-Fetoprotein",     value: "2.81",   unit: "ng/mL",   reference: "0–7",       note: "ปกติ — ไม่มีสัญญาณมะเร็งตับ"                       },
  { code: "TSH",          thaiLabel: "Thyroid Stimulating H.", value: "2.361",  unit: "µIU/mL",  reference: "0.27–4.2",  note: "ปกติ — ต่อมไทรอยด์ทำงานดี"                        },
  { code: "FT3",          thaiLabel: "Free Triiodothyronine", value: "2.56",   unit: "pg/mL",   reference: "2.0–4.4",   note: "ปกติ"                                               },
  { code: "FT4",          thaiLabel: "Free Thyroxine",        value: "1.27",   unit: "ng/dL",   reference: "0.93–1.70", note: "ปกติ"                                               },
  { code: "Testosterone", thaiLabel: "ฮอร์โมนเพศชาย",        value: "7.77",   unit: "ng/mL",   reference: "2.8–8.0",   note: "ปกติดี — ระดับเหมาะสมสำหรับอายุ 22"                },
  { code: "Blood Smear",  thaiLabel: "ภาพเม็ดเลือดกล้องจุลทรรศน์", value: "–", unit: "",       reference: "Normal",    note: "ปกติ — ไม่พบโลหิตจางหรือ parasites"                 },
];

// ─── Summary ──────────────────────────────────────────────────────────────────
export const HEALTH_SUMMARY = {
  totalItems: 60,
  abnormalCount: 8,  // BMI, Uric Acid, Cholesterol, LDL, Morphology, Protein, Microalbumin, A:C ratio
  watchCount: 1,     // ALP (ควรสังเกต)
  normalCount: 51,
  examDate: "28/04/2026",
  subject: { sex: "MALE", age: 22, height: 170, weight: 71 },
} as const;
