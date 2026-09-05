export type MajorKey = "RPL" | "TKJ" | "TJA" | "DKV"

export interface MajorInfo {
  code: MajorKey
  name: string
  fullName: string
  tagline: string
  description: string
  whyMatch: string
  alternativeWhyMatch: string
  careerOpportunities: string[]
  color: {
    badge: string
    accent: string
    bg: string
    border: string
    progress: string
  }
}

export interface QuizOption {
  id: "A" | "B" | "C" | "D"
  text: string
  scores: Partial<Record<MajorKey, number>>
}

export interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
}

export interface QuizResult {
  primary: {
    major: MajorInfo
    score: number
  }
  alternative?: {
    major: MajorInfo
    score: number
  }
  allScores: {
    major: MajorInfo
    score: number
    percentage: number
  }[]
  totalAnswered: number
}

export const MAJORS_INFO: Record<MajorKey, MajorInfo> = {
  RPL: {
    code: "RPL",
    name: "RPL",
    fullName: "Rekayasa Perangkat Lunak",
    tagline: "Software & Web Development",
    description: "Fokus kejuruan digital berstandar industri dalam pengembangan aplikasi mobile, website interaktif, cloud computing, dan logika algoritma komputasi.",
    whyMatch: "Kamu cenderung suka problem solving, logic, dan membuat sesuatu lewat kode. Jurusan RPL cocok banget buat kamu yang ingin jadi programmer atau web developer handal.",
    alternativeWhyMatch: "Kamu memiliki ketertarikan kuat dalam logika pemrograman dan pengembangan perangkat lunak yang patut kamu pertimbangkan.",
    careerOpportunities: [
      "Software Engineer / Developer",
      "Full-Stack Web Developer",
      "Mobile Application Developer (iOS/Android)",
      "Database Administrator & Cloud Engineer"
    ],
    color: {
      badge: "bg-red-50 text-red-600 border-red-200",
      accent: "text-red-600",
      bg: "from-red-50 to-white",
      border: "border-red-200",
      progress: "bg-red-600"
    }
  },
  TKJ: {
    code: "TKJ",
    name: "TKJ",
    fullName: "Teknik Komputer dan Jaringan",
    tagline: "Network & Cyber Security Infrastructure",
    description: "Fokus mendalami arsitektur jaringan komputer, administrasi server Linux/Windows, routing & switching Cisco, serta pertahanan keamanan siber.",
    whyMatch: "Kamu punya ketertarikan tinggi pada hardware, instalasi server, dan sistem jaringan komputer. Jurusan TKJ sangat tepat untuk kamu yang ingin berkarir di bidang infrastruktur IT dan network security.",
    alternativeWhyMatch: "Kamu juga punya ketertarikan di hardware dan jaringan. Bisa dipertimbangkan kalau nanti ingin lebih ke arah infrastruktur IT.",
    careerOpportunities: [
      "Network Administrator",
      "Cyber Security Specialist",
      "Cloud & DevOps Infrastructure Engineer",
      "IT Technical Support Specialist"
    ],
    color: {
      badge: "bg-neutral-100 text-neutral-800 border-neutral-200",
      accent: "text-neutral-900",
      bg: "from-neutral-50 to-white",
      border: "border-neutral-200",
      progress: "bg-neutral-800"
    }
  },
  TJA: {
    code: "TJA",
    name: "TJA",
    fullName: "Teknik Jaringan Akses Telekomunikasi",
    tagline: "Broadband & Fiber Optic Telecommunication",
    description: "Fokus spesialisasi khas Telkom Schools dalam teknologi kabel serat optik (FTTH/FTTX), sistem radio frekuensi transmisi nirkabel seluler (4G/5G), dan perangkat akses telekomunikasi.",
    whyMatch: "Kamu penasaran bagaimana internet berkecepatan tinggi dan sinyal telekomunikasi bisa sampai ke gedung dan rumah kita. Jurusan TJA sangat prospektif di industri telekomunikasi dan penyedia jaringan broadband.",
    alternativeWhyMatch: "Kamu menunjukkan rasa ingin tahu yang bagus terhadap sistem transmisi sinyal dan teknologi fiber optic telekomunikasi.",
    careerOpportunities: [
      "Teknisi Jaringan Fiber Optic (FTTH)",
      "Telecommunication Transmission Engineer",
      "Radio Frequency (RF) & Cellular Network Specialist",
      "Broadband Access Network Administrator"
    ],
    color: {
      badge: "bg-red-50 text-red-700 border-red-200",
      accent: "text-red-700",
      bg: "from-red-50 to-white",
      border: "border-red-200",
      progress: "bg-red-700"
    }
  },
  DKV: {
    code: "DKV",
    name: "DKV",
    fullName: "Desain Komunikasi Visual",
    tagline: "Creative Digital Design & Multimedia",
    description: "Fokus mengasah kreativitas estetika visual digital: UI/UX design, desain grafis & ilustrasi, 3D animation, video editing, motion graphic, dan multimedia interaktif.",
    whyMatch: "Kamu memiliki jiwa estetika visual yang kuat, kreatif, dan suka menyampaikan pesan melalui karya grafis atau multimedia. Jurusan DKV adalah wadah terbaik untuk menjadi kreator konten visual kelas dunia.",
    alternativeWhyMatch: "Sisi kreativitas visual dan sense desainmu cukup kuat, menjadikannya pilihan alternatif yang sangat potensial.",
    careerOpportunities: [
      "UI/UX Product Designer",
      "Graphic Designer & Illustrator",
      "Motion Graphic Designer & Video Editor",
      "3D Modeler & Digital Animator"
    ],
    color: {
      badge: "bg-neutral-100 text-neutral-800 border-neutral-200",
      accent: "text-neutral-900",
      bg: "from-neutral-50 to-white",
      border: "border-neutral-200",
      progress: "bg-neutral-800"
    }
  }
}

// In-Memory mutable quiz questions store (managed by Guru)
export let QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Kalau ada waktu luang, kamu lebih suka ngapain?",
    options: [
      { id: "A", text: "Main game / coba software baru", scores: { RPL: 2, TKJ: 1 } },
      { id: "B", text: "Desain poster, edit foto, atau bikin konten visual", scores: { DKV: 2, RPL: 1 } },
      { id: "C", text: "Bongkar-bongkar perangkat elektronik / kabel", scores: { TKJ: 2, TJA: 1 } },
      { id: "D", text: "Coba setting WiFi, router, atau jaringan di rumah", scores: { TJA: 2, TKJ: 1 } },
    ]
  },
  {
    id: 2,
    question: "Kamu lebih tertarik sama yang mana?",
    options: [
      { id: "A", text: "Membuat aplikasi atau website", scores: { RPL: 2 } },
      { id: "B", text: "Membuat desain yang bagus dan eye-catching", scores: { DKV: 2 } },
      { id: "C", text: "Memahami cara komputer dan jaringan saling terhubung", scores: { TKJ: 2 } },
      { id: "D", text: "Memahami bagaimana sinyal dan jaringan akses bekerja", scores: { TJA: 2 } },
    ]
  },
  {
    id: 3,
    question: "Kalau disuruh pilih project sekolah, kamu mau yang mana?",
    options: [
      { id: "A", text: "Bikin website atau aplikasi sederhana", scores: { RPL: 2 } },
      { id: "B", text: "Bikin poster, logo, atau video pendek", scores: { DKV: 2 } },
      { id: "C", text: "Merakit / setting komputer dan jaringan di lab", scores: { TKJ: 2 } },
      { id: "D", text: "Setting perangkat jaringan akses (ONT, modem, dll)", scores: { TJA: 2 } },
    ]
  },
  {
    id: 4,
    question: "Kamu lebih nyaman kerja dengan:",
    options: [
      { id: "A", text: "Kode / logic / problem solving", scores: { RPL: 2 } },
      { id: "B", text: "Warna, layout, dan visual", scores: { DKV: 2 } },
      { id: "C", text: "Hardware dan troubleshooting", scores: { TKJ: 2 } },
      { id: "D", text: "Perangkat jaringan dan konektivitas", scores: { TJA: 2 } },
    ]
  },
  {
    id: 5,
    question: "Mata pelajaran yang paling kamu suka biasanya:",
    options: [
      { id: "A", text: "Pemrograman / Informatika", scores: { RPL: 2 } },
      { id: "B", text: "Seni / Desain / Multimedia", scores: { DKV: 2 } },
      { id: "C", text: "Jaringan Komputer", scores: { TKJ: 2 } },
      { id: "D", text: "Sistem Telekomunikasi / Jaringan Akses", scores: { TJA: 2 } },
    ]
  },
  {
    id: 6,
    question: "Kalau ada masalah di rumah, kamu paling sering diminta bantu:",
    options: [
      { id: "A", text: "Install aplikasi atau perbaiki error di laptop", scores: { RPL: 2, TKJ: 1 } },
      { id: "B", text: "Edit foto / bikin desain buat tugas", scores: { DKV: 2 } },
      { id: "C", text: "Perbaiki komputer yang error / virus", scores: { TKJ: 2 } },
      { id: "D", text: "Perbaiki WiFi yang lemot atau putus-putus", scores: { TJA: 2, TKJ: 1 } },
    ]
  },
  {
    id: 7,
    question: "Kamu lebih suka belajar dengan cara:",
    options: [
      { id: "A", text: "Langsung praktik nulis kode", scores: { RPL: 2 } },
      { id: "B", text: "Langsung praktik desain di Canva/Figma/Photoshop", scores: { DKV: 2 } },
      { id: "C", text: "Langsung praktik rakit / setting perangkat", scores: { TKJ: 2 } },
      { id: "D", text: "Langsung praktik setting jaringan", scores: { TJA: 2 } },
    ]
  },
  {
    id: 8,
    question: "Impian kerja setelah lulus yang paling menarik:",
    options: [
      { id: "A", text: "Jadi Programmer / Web Developer", scores: { RPL: 2 } },
      { id: "B", text: "Jadi Graphic Designer / Content Creator", scores: { DKV: 2 } },
      { id: "C", text: "Jadi Network Administrator / IT Support", scores: { TKJ: 2 } },
      { id: "D", text: "Jadi Teknisi Jaringan / Fiber Optic", scores: { TJA: 2 } },
    ]
  },
  {
    id: 9,
    question: "Kamu merasa paling jago di bidang:",
    options: [
      { id: "A", text: "Logika dan memecahkan masalah lewat kode", scores: { RPL: 2 } },
      { id: "B", text: "Kreativitas visual dan estetika", scores: { DKV: 2 } },
      { id: "C", text: "Memahami dan memperbaiki sistem komputer", scores: { TKJ: 2 } },
      { id: "D", text: "Memahami alur jaringan dari pusat ke rumah", scores: { TJA: 2 } },
    ]
  },
  {
    id: 10,
    question: "Kalau harus pilih satu, kamu paling penasaran sama:",
    options: [
      { id: "A", text: "Gimana cara bikin aplikasi dari nol", scores: { RPL: 2 } },
      { id: "B", text: "Gimana cara bikin desain yang orang langsung tertarik", scores: { DKV: 2 } },
      { id: "C", text: "Gimana cara komputer saling komunikasi dalam jaringan", scores: { TKJ: 2 } },
      { id: "D", text: "Gimana cara internet bisa sampai ke rumah kita", scores: { TJA: 2 } },
    ]
  }
]

// Log penyerahan kuis siswa (untuk dipantau Guru di dashboard)
export interface QuizSubmissionLog {
  id: string
  userId?: number
  studentName: string
  submittedAt: string
  primaryMajor: string
  score: number
  percentage: number
  allScores: { major: string; score: number; percentage: number }[]
}

export const QUIZ_SUBMISSIONS: QuizSubmissionLog[] = [
  {
    id: "sub-1",
    studentName: "Ahmad Rizky",
    submittedAt: "2026-09-04 14:10",
    primaryMajor: "RPL",
    score: 18,
    percentage: 60,
    allScores: [
      { major: "RPL", score: 18, percentage: 60 },
      { major: "TKJ", score: 6, percentage: 20 },
      { major: "DKV", score: 4, percentage: 13 },
      { major: "TJA", score: 2, percentage: 7 },
    ]
  },
  {
    id: "sub-2",
    studentName: "Dewi Lestari",
    submittedAt: "2026-09-04 15:02",
    primaryMajor: "DKV",
    score: 16,
    percentage: 55,
    allScores: [
      { major: "DKV", score: 16, percentage: 55 },
      { major: "RPL", score: 6, percentage: 21 },
      { major: "TKJ", score: 4, percentage: 14 },
      { major: "TJA", score: 3, percentage: 10 },
    ]
  },
]

// CRUD Helper Functions untuk Guru
export function updateQuestion(id: number, updatedText: string, options: QuizOption[]) {
  const index = QUIZ_QUESTIONS.findIndex(q => q.id === id)
  if (index !== -1) {
    QUIZ_QUESTIONS[index] = { id, question: updatedText, options }
    return QUIZ_QUESTIONS[index]
  }
  return null
}

export function addQuestion(question: string, options: QuizOption[]) {
  const nextId = QUIZ_QUESTIONS.length > 0 ? Math.max(...QUIZ_QUESTIONS.map(q => q.id)) + 1 : 1
  const newQ: QuizQuestion = { id: nextId, question, options }
  QUIZ_QUESTIONS.push(newQ)
  return newQ
}

export function deleteQuestion(id: number) {
  const initialLength = QUIZ_QUESTIONS.length
  QUIZ_QUESTIONS = QUIZ_QUESTIONS.filter(q => q.id !== id)
  return QUIZ_QUESTIONS.length < initialLength
}

export function calculateQuizRecommendation(answers: Record<number, string>): QuizResult {
  const scores: Record<MajorKey, number> = {
    RPL: 0,
    TKJ: 0,
    TJA: 0,
    DKV: 0
  }

  let totalAnswered = 0

  for (const question of QUIZ_QUESTIONS) {
    const chosenOptionId = answers[question.id]
    if (!chosenOptionId) continue

    const selectedOption = question.options.find(opt => opt.id === chosenOptionId)
    if (!selectedOption) continue

    totalAnswered++
    for (const [major, points] of Object.entries(selectedOption.scores) as [MajorKey, number][]) {
      scores[major] += points
    }
  }

  // Sort majors by descending score
  const sorted = (Object.keys(scores) as MajorKey[])
    .map(key => ({
      major: MAJORS_INFO[key],
      score: scores[key]
    }))
    .sort((a, b) => b.score - a.score)

  const highest = sorted[0]
  const runnerUp = sorted[1]

  const totalPoints = Math.max(1, sorted.reduce((sum, item) => sum + item.score, 0))

  const allScores = sorted.map(item => ({
    major: item.major,
    score: item.score,
    percentage: Math.round((item.score / totalPoints) * 100)
  }))

  const result: QuizResult = {
    primary: {
      major: highest.major,
      score: highest.score
    },
    allScores,
    totalAnswered
  }

  if (runnerUp && highest.score - runnerUp.score <= 3 && runnerUp.score > 0) {
    result.alternative = {
      major: runnerUp.major,
      score: runnerUp.score
    }
  }

  return result
}
