// lib/academic-data.ts
// Data Akademik Terpadu SMK Telkom Jakarta
// Meliputi: Nilai Rapor/Tugas, Presensi/Kehadiran, Tagihan SPP & Keuangan, Manajemen Kelas, dan Pengguna Sistem

export interface NilaiItem {
  id: string
  studentId: number
  nis: string
  subjectCode: string
  subjectName: string
  kkm: number
  nilaiTugas: number
  nilaiUTS: number
  nilaiUAS: number
  nilaiAkhir: number
  grade: "A" | "B" | "C" | "D"
  semester: string // cth: "Ganjil 2026/2027"
}

export interface PresensiItem {
  id: string
  studentId: number
  nis: string
  date: string // YYYY-MM-DD
  status: "hadir" | "izin" | "sakit" | "alpa"
  keterangan?: string
}

export interface TagihanItem {
  id: string
  studentId: number
  nis: string
  title: string // cth: "SPP Bulan September 2026", "Dana Praktikum Kejuruan RPL"
  amount: number
  dueDate: string
  status: "lunas" | "belum_bayar" | "menunggu_konfirmasi"
  paidAt?: string
  paymentMethod?: string
}

export interface KelasItem {
  id: string
  code: string // cth: "X-RPL-1"
  name: string // cth: "Kelas X RPL 1"
  major: "RPL" | "TKJ" | "DKV" | "TJA"
  waliKelasId: number
  waliKelasName: string
  room: string
  totalStudents: number
}

// Inisial Data Nilai
export const ACADEMIC_GRADES: NilaiItem[] = [
  {
    id: "grd_01",
    studentId: 1,
    nis: "10214055",
    subjectCode: "RPL-301",
    subjectName: "Pemrograman Web & Perangkat Bergerak",
    kkm: 75,
    nilaiTugas: 92,
    nilaiUTS: 88,
    nilaiUAS: 90,
    nilaiAkhir: 90,
    grade: "A",
    semester: "Ganjil 2026/2027",
  },
  {
    id: "grd_02",
    studentId: 1,
    nis: "10214055",
    subjectCode: "RPL-302",
    subjectName: "Basis Data & Cloud Architecture",
    kkm: 75,
    nilaiTugas: 85,
    nilaiUTS: 87,
    nilaiUAS: 89,
    nilaiAkhir: 87,
    grade: "A",
    semester: "Ganjil 2026/2027",
  },
  {
    id: "grd_03",
    studentId: 1,
    nis: "10214055",
    subjectCode: "TIK-101",
    subjectName: "Matematika Terapan Komputer",
    kkm: 70,
    nilaiTugas: 80,
    nilaiUTS: 78,
    nilaiUAS: 82,
    nilaiAkhir: 80,
    grade: "B",
    semester: "Ganjil 2026/2027",
  },
]

// Inisial Data Kehadiran
export const ACADEMIC_ATTENDANCE: PresensiItem[] = [
  { id: "att_01", studentId: 1, nis: "10214055", date: "2026-09-01", status: "hadir" },
  { id: "att_02", studentId: 1, nis: "10214055", date: "2026-09-02", status: "hadir" },
  { id: "att_03", studentId: 1, nis: "10214055", date: "2026-09-03", status: "hadir" },
  { id: "att_04", studentId: 1, nis: "10214055", date: "2026-09-04", status: "izin", keterangan: "Mengikuti Lomba Kompetensi Siswa (LKS)" },
  { id: "att_05", studentId: 1, nis: "10214055", date: "2026-09-05", status: "hadir" },
]

// Inisial Data Tagihan
export const ACADEMIC_BILLS: TagihanItem[] = [
  {
    id: "inv_20260901",
    studentId: 1,
    nis: "10214055",
    title: "SPP Bulan September 2026",
    amount: 650000,
    dueDate: "2026-09-10",
    status: "lunas",
    paidAt: "2026-09-02T11:20:00Z",
    paymentMethod: "Virtual Account BNI Telkom",
  },
  {
    id: "inv_20261001",
    studentId: 1,
    nis: "10214055",
    title: "SPP Bulan Oktober 2026",
    amount: 650000,
    dueDate: "2026-10-10",
    status: "belum_bayar",
  },
  {
    id: "inv_2026_cert",
    studentId: 1,
    nis: "10214055",
    title: "Uji Kompetensi Keahlian (UKK) & Sertifikasi BNSP",
    amount: 450000,
    dueDate: "2026-11-15",
    status: "belum_bayar",
  },
]

// Inisial Data Master Kelas
export const ACADEMIC_CLASSES: KelasItem[] = [
  {
    id: "cls_01",
    code: "X-RPL-1",
    name: "Kelas X Rekayasa Perangkat Lunak 1",
    major: "RPL",
    waliKelasId: 3,
    waliKelasName: "Siti Rahmawati, M.Kom.",
    room: "Lab Software 302",
    totalStudents: 36,
  },
  {
    id: "cls_02",
    code: "X-TKJ-1",
    name: "Kelas X Teknik Komputer & Jaringan 1",
    major: "TKJ",
    waliKelasId: 3,
    waliKelasName: "Budi Hermawan, S.T.",
    room: "Lab Jaringan Cisco 201",
    totalStudents: 36,
  },
  {
    id: "cls_03",
    code: "X-DKV-1",
    name: "Kelas X Desain Komunikasi Visual 1",
    major: "DKV",
    waliKelasId: 3,
    waliKelasName: "Maya Anggraini, M.Ds.",
    room: "Studio Multimedia 105",
    totalStudents: 34,
  },
]

// CRUD Helper Nilai
export function getStudentGrades(studentId: number): NilaiItem[] {
  return ACADEMIC_GRADES.filter((g) => g.studentId === studentId)
}

export function saveStudentGrade(data: Omit<NilaiItem, "id" | "nilaiAkhir" | "grade">): NilaiItem {
  const final = Math.round((data.nilaiTugas * 0.3) + (data.nilaiUTS * 0.3) + (data.nilaiUAS * 0.4))
  let grade: "A" | "B" | "C" | "D" = "D"
  if (final >= 85) grade = "A"
  else if (final >= 75) grade = "B"
  else if (final >= 65) grade = "C"

  const newItem: NilaiItem = {
    id: `grd_${Date.now()}`,
    ...data,
    nilaiAkhir: final,
    grade,
  }
  ACADEMIC_GRADES.unshift(newItem)
  return newItem
}

// CRUD Helper Kehadiran
export function getStudentAttendance(studentId: number): PresensiItem[] {
  return ACADEMIC_ATTENDANCE.filter((a) => a.studentId === studentId)
}

export function recordAttendance(data: Omit<PresensiItem, "id">): PresensiItem {
  const newAtt: PresensiItem = {
    id: `att_${Date.now()}`,
    ...data,
  }
  ACADEMIC_ATTENDANCE.unshift(newAtt)
  return newAtt
}

// CRUD Helper Tagihan / Finansial
export function getStudentBills(studentId: number): TagihanItem[] {
  return ACADEMIC_BILLS.filter((b) => b.studentId === studentId)
}

export function getAllBills(): TagihanItem[] {
  return [...ACADEMIC_BILLS]
}

export function updateBillPaymentStatus(
  billId: string,
  status: "lunas" | "belum_bayar" | "menunggu_konfirmasi",
  paymentMethod?: string
): TagihanItem | null {
  const bill = ACADEMIC_BILLS.find((b) => b.id === billId)
  if (!bill) return null
  bill.status = status
  if (status === "lunas") {
    bill.paidAt = new Date().toISOString()
    if (paymentMethod) bill.paymentMethod = paymentMethod
  }
  return bill
}

// CRUD Helper Kelas
export function getAllClasses(): KelasItem[] {
  return [...ACADEMIC_CLASSES]
}

export function createClass(data: Omit<KelasItem, "id">): KelasItem {
  const newClass: KelasItem = {
    id: `cls_${Date.now()}`,
    ...data,
  }
  ACADEMIC_CLASSES.push(newClass)
  return newClass
}

/**
 * 1:1 Backend Synchronization Helpers
 */

/**
 * Otomatis inisialisasi berkas akademik siswa baru (Tagihan Awal, Mapel Jurusan, dan Presensi MPLS)
 */
export function initializeStudentAcademicDossier(params: {
  studentId: number
  nis: string
  name: string
  major: "RPL" | "TKJ" | "DKV" | "TJA"
}) {
  const { studentId, nis, major } = params

  // 1. Inisialisasi Tagihan Awal (Invoice Formulir PPDB & SPP Bulan Pertama)
  const existingBills = getStudentBills(studentId)
  if (existingBills.length === 0) {
    const starterBills: TagihanItem[] = [
      {
        id: `inv_ppdb_${studentId}`,
        studentId,
        nis,
        title: "Biaya Formulir & Seleksi Administrasi PPDB",
        amount: 250000,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
        status: "lunas",
        paidAt: new Date().toISOString(),
        paymentMethod: "Online Payment Gateway / VA BNI",
      },
      {
        id: `inv_spp_${studentId}_01`,
        studentId,
        nis,
        title: "SPP Bulan September 2026",
        amount: 650000,
        dueDate: "2026-09-10",
        status: "belum_bayar",
      },
    ]
    ACADEMIC_BILLS.unshift(...starterBills)
  }

  // 2. Inisialisasi Mapel Kejuruan Sesuai Peminatan
  const existingGrades = getStudentGrades(studentId)
  if (existingGrades.length === 0) {
    const subjectsMap: Record<"RPL" | "TKJ" | "DKV" | "TJA", { code: string; name: string; kkm: number }[]> = {
      RPL: [
        { code: "RPL-101", name: "Dasar Algoritma & Logika Pemrograman", kkm: 75 },
        { code: "RPL-102", name: "Pemodelan Perangkat Lunak Berorientasi Objek", kkm: 75 },
        { code: "TIK-101", name: "Matematika Komputasi & Diskrit", kkm: 70 },
      ],
      TKJ: [
        { code: "TKJ-101", name: "Dasar Jaringan Komputer & Subnetting", kkm: 75 },
        { code: "TKJ-102", name: "Sistem Komputer & Perangkat Keras", kkm: 75 },
        { code: "TIK-101", name: "Matematika Komputasi & Diskrit", kkm: 70 },
      ],
      DKV: [
        { code: "DKV-101", name: "Prinsip Dasar Desain & Tipografi", kkm: 75 },
        { code: "DKV-102", name: "Sketsa, Ilustrasi & Nirmana", kkm: 75 },
        { code: "TIK-101", name: "Fotografi & Komputer Grafis", kkm: 70 },
      ],
      TJA: [
        { code: "TJA-101", name: "Teknik Transmisi Telekomunikasi", kkm: 75 },
        { code: "TJA-102", name: "Dasar Serat Optik & Jaringan Kabel", kkm: 75 },
        { code: "TIK-101", name: "Elektronika Dasar & Pengukuran", kkm: 70 },
      ],
    }

    const initialSubjects = subjectsMap[major] || subjectsMap.RPL
    initialSubjects.forEach((sub, idx) => {
      ACADEMIC_GRADES.push({
        id: `grd_${studentId}_0${idx + 1}`,
        studentId,
        nis,
        subjectCode: sub.code,
        subjectName: sub.name,
        kkm: sub.kkm,
        nilaiTugas: 85,
        nilaiUTS: 80,
        nilaiUAS: 88,
        nilaiAkhir: 84,
        grade: "B",
        semester: "Ganjil 2026/2027",
      })
    })
  }

  // 3. Inisialisasi Log Presensi Awal (MPLS & KBM Perdana)
  const existingAtt = getStudentAttendance(studentId)
  if (existingAtt.length === 0) {
    const today = new Date().toISOString().substring(0, 10)
    ACADEMIC_ATTENDANCE.push(
      {
        id: `att_${studentId}_01`,
        studentId,
        nis,
        date: "2026-09-01",
        status: "hadir",
        keterangan: "Masa Pengenalan Lingkungan Sekolah (MPLS) Hari Ke-1",
      },
      {
        id: `att_${studentId}_02`,
        studentId,
        nis,
        date: "2026-09-02",
        status: "hadir",
        keterangan: "Masa Pengenalan Lingkungan Sekolah (MPLS) Hari Ke-2",
      },
      {
        id: `att_${studentId}_03`,
        studentId,
        nis,
        date: today,
        status: "hadir",
        keterangan: "KBM Perdana Teori & Praktikum Jurusan",
      }
    )
  }
}

/**
 * Otomatis menempatkan siswa yang lulus PPDB ke kelas kejuruan yang tersedia
 */
export function assignStudentToClass(major: "RPL" | "TKJ" | "DKV" | "TJA"): KelasItem {
  let targetClass = ACADEMIC_CLASSES.find((c) => c.major === major && c.totalStudents < 36)
  if (!targetClass) {
    targetClass = ACADEMIC_CLASSES.find((c) => c.major === major)
  }

  if (targetClass) {
    targetClass.totalStudents += 1
    return targetClass
  }

  // Jika belum ada kelas untuk jurusan tersebut, buat kelas baru otomatis
  const newClass: KelasItem = {
    id: `cls_${Date.now()}`,
    code: `X-${major}-1`,
    name: `Kelas X ${major} 1`,
    major,
    waliKelasId: 2,
    waliKelasName: "Siti Rahmawati, M.Kom.",
    room: `Lab ${major} 301`,
    totalStudents: 1,
  }
  ACADEMIC_CLASSES.push(newClass)
  return newClass
}

/**
 * Menerbitkan tagihan Daftar Ulang & Seragam saat siswa dinyatakan Lulus PPDB
 */
export function issueMatriculationBill(studentId: number, nis: string): TagihanItem {
  const existingMatriculation = ACADEMIC_BILLS.find(
    (b) => b.studentId === studentId && b.title.includes("Daftar Ulang")
  )
  if (existingMatriculation) return existingMatriculation

  const newBill: TagihanItem = {
    id: `inv_daftarulang_${studentId}`,
    studentId,
    nis,
    title: "Biaya Daftar Ulang, Seragam Resmi & Modul Praktikum Kejuruan",
    amount: 1850000,
    dueDate: "2026-10-01",
    status: "belum_bayar",
  }
  ACADEMIC_BILLS.unshift(newBill)
  return newBill
}
