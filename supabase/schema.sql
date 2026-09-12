-- ==============================================================================
-- SUPABASE SCHEMA & POLICIES FOR PT MITRA BUMI REJEKI
-- Jalankan skrip ini di SQL Editor pada Supabase Dashboard Anda:
-- Dashboard Supabase -> Pilih Proyek -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Buat Tabel Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT,
  category TEXT NOT NULL DEFAULT 'Construction',
  category_id TEXT DEFAULT 'Konstruksi',
  description_id TEXT,
  description_en TEXT,
  image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  scope_of_work TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Publik (Semua Pengunjung) hanya bisa membaca / melihat proyek
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Hanya Admin yang sudah login (Authenticated) yang bisa menambah proyek
DROP POLICY IF EXISTS "Authenticated admin can insert projects" ON public.projects;
CREATE POLICY "Authenticated admin can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Hanya Admin yang sudah login (Authenticated) yang bisa mengubah proyek
DROP POLICY IF EXISTS "Authenticated admin can update projects" ON public.projects;
CREATE POLICY "Authenticated admin can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Hanya Admin yang sudah login (Authenticated) yang bisa menghapus proyek
DROP POLICY IF EXISTS "Authenticated admin can delete projects" ON public.projects;
CREATE POLICY "Authenticated admin can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- ==============================================================================
-- 3. Setup Storage Bucket untuk Upload Foto Proyek ('project-images')
-- ==============================================================================

-- Buat bucket publik jika belum ada
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage: Publik bisa melihat/download foto
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
CREATE POLICY "Public can view project images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

-- Policy Storage: Hanya Admin login yang bisa upload foto
DROP POLICY IF EXISTS "Admin can upload project images" ON storage.objects;
CREATE POLICY "Admin can upload project images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

-- Policy Storage: Hanya Admin login yang bisa update / delete foto
DROP POLICY IF EXISTS "Admin can update project images" ON storage.objects;
CREATE POLICY "Admin can update project images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Admin can delete project images" ON storage.objects;
CREATE POLICY "Admin can delete project images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');

-- ==============================================================================
-- 4. Seeding Data Awal (13 Proyek Eksisting dari projects.js)
-- ==============================================================================
INSERT INTO public.projects (id, title, location, category, category_id, description_id, description_en, image, gallery, featured, order_index)
VALUES
(
  'hotel-sm-tower-malioboro',
  'Hotel SM Tower Malioboro',
  'Ngampilan, Yogyakarta',
  'Construction',
  'Konstruksi',
  'Hotel SM Tower Malioboro merupakan proyek konstruksi bangunan hotel yang berlokasi di kawasan ikonik Malioboro, Yogyakarta. PT Mitra Bumi Rejeki menangani pekerjaan konstruksi struktur dan finishing bangunan sesuai standar perhotelan modern. Proyek ini mengutamakan estetika arsitektur yang selaras dengan nuansa budaya Yogyakarta.',
  'Hotel SM Tower Malioboro is a hotel construction project located in the iconic Malioboro area of Yogyakarta. PT Mitra Bumi Rejeki handled structural construction and finishing works in accordance with modern hospitality standards, with architectural aesthetics harmonized with Yogyakarta''s cultural atmosphere.',
  '/images/projects/hotel-sm-tower-malioboro.png',
  '["/images/projects/hotel-sm-tower-malioboro.png"]'::jsonb,
  true,
  1
),
(
  'hotel-sm-tower-berau',
  'Hotel SM Tower Berau',
  'Berau, Kalimantan Timur',
  'Construction',
  'Konstruksi',
  'Hotel SM Tower Berau adalah proyek pembangunan hotel di Berau, Kalimantan Timur. PT Mitra Bumi Rejeki dipercaya untuk menangani konstruksi bangunan hotel mulai dari pekerjaan struktur hingga interior dan finishing. Proyek ini dirancang untuk memenuhi kebutuhan akomodasi profesional di wilayah Kalimantan Timur.',
  'Hotel SM Tower Berau is a hotel construction project in Berau, East Kalimantan. PT Mitra Bumi Rejeki was entrusted to handle hotel building construction from structural works to interior and finishing. The project was designed to meet professional accommodation needs in the East Kalimantan region.',
  '/images/projects/hotel-sm-tower-berau.jpg',
  '["/images/projects/hotel-sm-tower-berau-kamar.jpg"]'::jsonb,
  true,
  2
),
(
  'kik-kawasan-kendal',
  'KIK Kawasan Kendal',
  'Kendal, Jawa Tengah',
  'Development',
  'Pengembangan',
  'KIK Kawasan Kendal adalah proyek pengembangan kawasan industri yang berlokasi di Kendal, Jawa Tengah. PT Mitra Bumi Rejeki terlibat dalam pekerjaan konstruksi dan pengembangan infrastruktur kawasan. Proyek ini merupakan bagian dari upaya pengembangan kawasan industri strategis di Jawa Tengah.',
  'KIK Kawasan Kendal is an industrial area development project located in Kendal, Central Java. PT Mitra Bumi Rejeki was involved in construction and infrastructure development works for the area. This project is part of the strategic industrial zone development efforts in Central Java.',
  '/images/projects/kik-kawasan-kendal-1.jpg',
  '["/images/projects/kik-kawasan-kendal-2.jpg", "/images/projects/kik-kawasan-kendal.webp"]'::jsonb,
  true,
  3
),
(
  'cafe-sepur',
  'Cafe Sepur',
  'Kota Lama, Semarang',
  'Construction',
  'Konstruksi',
  'Cafe Sepur adalah proyek konstruksi dan renovasi bangunan kafe yang terletak di kawasan Kota Lama Semarang, dekat Stasiun Tawang. PT Mitra Bumi Rejeki menangani pekerjaan pembangunan dan penataan ruang interior kafe dengan konsep yang memadukan nuansa heritage kota lama dengan suasana modern yang nyaman.',
  'Cafe Sepur is a café construction and renovation project located in the Kota Lama (Old Town) area of Semarang, near Tawang Station. PT Mitra Bumi Rejeki handled the construction and interior layout works, blending the heritage nuances of the old town with a comfortable modern atmosphere.',
  '/images/projects/cafe-sepur.jpg',
  '[]'::jsonb,
  false,
  4
),
(
  'taman-wisata-kopeng',
  'Taman Wisata Kopeng',
  'Kopeng, Jawa Tengah',
  'Development',
  'Pengembangan',
  'Taman Wisata Kopeng merupakan proyek pengembangan kawasan wisata alam yang terletak di Kopeng, Jawa Tengah. PT Mitra Bumi Rejeki menangani pekerjaan konstruksi dan pengembangan fasilitas wisata untuk mendukung aktivitas rekreasi dan pariwisata. Proyek ini bertujuan meningkatkan daya tarik dan kenyamanan kawasan wisata Kopeng bagi para pengunjung.',
  'Taman Wisata Kopeng is a nature tourism area development project located in Kopeng, Central Java. PT Mitra Bumi Rejeki handled construction and tourism facility development to support recreational and tourism activities. The project aims to enhance the appeal and comfort of the Kopeng tourism area for visitors.',
  '/images/projects/taman-wisata-kopeng.png',
  '[]'::jsonb,
  true,
  5
),
(
  'new-bandungan-indah',
  'New Bandungan Indah',
  'Bandungan, Jawa Tengah',
  'Development',
  'Pengembangan',
  'New Bandungan Indah adalah proyek pengembangan properti di kawasan Bandungan, Jawa Tengah. PT Mitra Bumi Rejeki menangani pekerjaan konstruksi dan pengembangan unit hunian di kawasan wisata yang sejuk ini. Proyek ini dirancang untuk menghadirkan hunian berkualitas dengan pemandangan alam pegunungan yang indah.',
  'New Bandungan Indah is a property development project in the Bandungan area of Central Java. PT Mitra Bumi Rejeki handled construction and residential unit development in this cool highland tourism area. The project was designed to deliver quality housing with beautiful mountain scenery.',
  '/images/projects/new-bandungan-indah.webp',
  '[]'::jsonb,
  false,
  6
),
(
  'kos-tembalang',
  'Kos Tembalang',
  'Tembalang, Semarang',
  'Construction',
  'Konstruksi',
  'Kos Tembalang adalah proyek pembangunan hunian kos-kosan yang berlokasi di kawasan Tembalang, Semarang. PT Mitra Bumi Rejeki mengerjakan konstruksi bangunan kos dengan desain yang fungsional dan nyaman untuk memenuhi kebutuhan hunian mahasiswa di sekitar kawasan kampus Tembalang.',
  'Kos Tembalang is a boarding house construction project located in the Tembalang area of Semarang. PT Mitra Bumi Rejeki built the boarding house with a functional and comfortable design to meet the housing needs of students around the Tembalang campus area.',
  '/images/projects/kos-tembalang.jpg',
  '["/images/projects/kos-tembalang-galeri.jpg"]'::jsonb,
  false,
  7
),
(
  'car-wash-cafe-smg',
  'Car Wash and Cafe SMG',
  'Semarang',
  'Construction',
  'Konstruksi',
  'Car Wash and Cafe SMG adalah proyek konstruksi bangunan komersial yang menggabungkan fasilitas cuci kendaraan dan kafe dalam satu kawasan. PT Mitra Bumi Rejeki menangani pembangunan struktur, tata ruang, dan finishing bangunan. Konsep proyek ini menghadirkan tempat yang nyaman bagi pelanggan sambil menunggu kendaraan mereka selesai dicuci.',
  'Car Wash and Cafe SMG is a commercial building construction project combining vehicle washing facilities and a café in one area. PT Mitra Bumi Rejeki handled structural construction, spatial layout, and finishing. The concept provides a comfortable place for customers while waiting for their vehicles to be washed.',
  '/images/projects/car-wash-cafe-smg.webp',
  '["/images/projects/car-wash-cafe-smg-galeri.webp"]'::jsonb,
  false,
  8
),
(
  'sky-amor-agency',
  'Sky Amor Agency',
  'Semarang Barat, Semarang',
  'Project',
  'Proyek',
  'Sky Amor Agency adalah proyek renovasi dan penataan ruang kantor agensi yang berlokasi di Semarang Barat. PT Mitra Bumi Rejeki menangani pekerjaan interior dan finishing ruangan untuk menciptakan lingkungan kerja yang profesional dan inspiratif. Desain ruang mengutamakan kenyamanan dan efisiensi tata letak area kerja.',
  'Sky Amor Agency is an office renovation and space planning project for an agency located in West Semarang. PT Mitra Bumi Rejeki handled interior works and room finishing to create a professional and inspiring work environment. The spatial design prioritizes comfort and efficiency in the office layout.',
  '/images/projects/sky-amor-agency.jpg',
  '[]'::jsonb,
  false,
  9
),
(
  'mbg-smg',
  'MBG Semarang',
  'Semarang (Tengah, Selatan, Timur)',
  'Project',
  'Proyek',
  'MBG Semarang merupakan proyek pembangunan fasilitas Makan Bergizi Gratis (MBG) yang mencakup beberapa wilayah di Kota Semarang, meliputi Semarang Tengah, Selatan, dan Timur. PT Mitra Bumi Rejeki menangani pekerjaan konstruksi dan renovasi dapur serta ruang distribusi untuk mendukung program pemerintah dalam penyediaan makanan bergizi bagi masyarakat.',
  'MBG Semarang is a construction project for the Free Nutritious Meal (MBG) facilities covering several areas in Semarang City, including Central, South, and East Semarang. PT Mitra Bumi Rejeki handled construction and renovation of kitchen and distribution spaces to support the government program for nutritious food provision.',
  '/images/projects/mbg-smg.avif',
  '[]'::jsonb,
  false,
  10
),
(
  'villa-gedawang',
  'Villa Gedawang',
  'Gedawang, Semarang',
  'Construction',
  'Konstruksi',
  'Villa Gedawang adalah proyek pembangunan villa hunian yang berlokasi di Gedawang, Banyumanik, Semarang. PT Mitra Bumi Rejeki menangani konstruksi bangunan villa dari tahap pondasi hingga finishing, dengan desain yang mengutamakan kenyamanan dan keindahan arsitektur. Proyek ini menghadirkan hunian private yang asri di kawasan Semarang selatan.',
  'Villa Gedawang is a villa construction project located in Gedawang, Banyumanik, Semarang. PT Mitra Bumi Rejeki handled villa construction from foundation to finishing, with a design prioritizing comfort and architectural beauty. The project delivers a private and green residential unit in southern Semarang.',
  '/images/projects/villa-gedawang.jpg',
  '[]'::jsonb,
  false,
  11
),
(
  'residence-banyumanik',
  'Residence Banyumanik',
  'Banyumanik, Semarang',
  'Development',
  'Pengembangan',
  'Residence Banyumanik adalah proyek pengembangan perumahan di kawasan Banyumanik, Semarang. PT Mitra Bumi Rejeki menangani konstruksi unit-unit hunian dengan desain modern dan tata lingkungan yang tertata rapi. Proyek ini hadir sebagai pilihan hunian berkualitas di salah satu kawasan residensial terkemuka di Semarang.',
  'Residence Banyumanik is a residential development project in the Banyumanik area of Semarang. PT Mitra Bumi Rejeki handled the construction of residential units with modern designs and well-organized landscaping. The project offers quality housing in one of Semarang''s leading residential areas.',
  '/images/projects/residence-banyumanik.jpg',
  '["/images/projects/residence-banyumanik-galeri.webp"]'::jsonb,
  false,
  12
),
(
  'kalijaga-tembalang',
  'Kalijaga Tembalang',
  'Tembalang, Semarang',
  'Development',
  'Pengembangan',
  'Kalijaga Tembalang adalah proyek pengembangan kawasan hunian yang terletak di Tembalang, Semarang. PT Mitra Bumi Rejeki menangani pembangunan dan pengembangan properti di kawasan yang strategis dekat dengan pusat pendidikan dan bisnis Tembalang. Proyek ini menawarkan lingkungan hunian yang nyaman dan aksesibel.',
  'Kalijaga Tembalang is a residential area development project located in Tembalang, Semarang. PT Mitra Bumi Rejeki handled property construction and development in a strategic location close to Tembalang''s educational and business centers. The project offers a comfortable and accessible living environment.',
  '/images/projects/kalijaga-tembalang.jpg',
  '[]'::jsonb,
  false,
  13
),
(
  'jasmine-villa-bergas',
  'Jasmine Villa Bergas',
  'Bergas, Jawa Tengah',
  'Construction',
  'Konstruksi',
  'Jasmine Villa Bergas adalah proyek pembangunan kompleks villa residensial yang berlokasi di Bergas, Jawa Tengah. PT Mitra Bumi Rejeki menangani konstruksi unit villa dengan desain modern dan lingkungan yang asri. Kawasan ini dilengkapi dengan jalan lingkungan yang tertata, pohon peneduh, dan fasilitas penunjang untuk kenyamanan penghuni.',
  'Jasmine Villa Bergas is a residential villa complex construction project located in Bergas, Central Java. PT Mitra Bumi Rejeki handled villa unit construction with modern design and a green environment. The complex features well-arranged internal roads, shade trees, and supporting facilities for residents'' comfort.',
  '/images/projects/jasmine-villa-bergas-cover.jpg',
  '[]'::jsonb,
  true,
  14
),
(
  'pudak-payung-asri',
  'Pudak Payung Asri',
  'Pudak Payung, Semarang',
  'Development',
  'Pengembangan',
  'Pudak Payung Asri adalah proyek pengembangan perumahan asri di kawasan Pudak Payung, Semarang Selatan. PT Mitra Bumi Rejeki menangani pembangunan unit hunian dengan desain yang memadukan kenyamanan modern dan lingkungan hijau. Proyek ini hadir sebagai pilihan hunian berkualitas dengan suasana tenang di selatan Kota Semarang.',
  'Pudak Payung Asri is a pleasant residential development project in the Pudak Payung area, South Semarang. PT Mitra Bumi Rejeki handled residential unit construction with a design combining modern comfort and a green environment. The project offers quality housing with a peaceful atmosphere in southern Semarang.',
  '/images/projects/pudak-payung-asri.jpg',
  '["/images/projects/pudak-payung-asri-galeri.webp"]'::jsonb,
  false,
  15
),
(
  'grafika-merdeka-banyumanik',
  'Grafika Merdeka Banyumanik',
  'Banyumanik, Semarang',
  'Development',
  'Pengembangan',
  'Grafika Merdeka Banyumanik adalah proyek pengembangan properti di kawasan Banyumanik, Semarang. PT Mitra Bumi Rejeki menangani pekerjaan konstruksi dan pengembangan kawasan hunian dengan tata lingkungan yang baik. Proyek ini menghadirkan hunian yang nyaman di kawasan Banyumanik yang terus berkembang pesat.',
  'Grafika Merdeka Banyumanik is a property development project in the Banyumanik area of Semarang. PT Mitra Bumi Rejeki handled construction and residential area development with good environmental planning. The project delivers comfortable housing in the rapidly growing Banyumanik area.',
  '/images/projects/grafika-merdeka-banyumanik.webp',
  '[]'::jsonb,
  false,
  16
),
(
  'mega-residence',
  'Mega Residence',
  'Banyumanik, Semarang',
  'Development',
  'Pengembangan',
  'Mega Residence adalah proyek pengembangan perumahan skala besar yang berlokasi di Semarang. PT Mitra Bumi Rejeki menangani konstruksi dan pengembangan kawasan hunian dengan konsep modern dan fasilitas lengkap. Proyek ini dirancang untuk memenuhi kebutuhan hunian keluarga dengan standar kualitas tinggi dan lingkungan yang terencana dengan baik.',
  'Mega Residence is a large-scale residential development project located in Semarang. PT Mitra Bumi Rejeki handled construction and residential area development with a modern concept and complete facilities. The project is designed to meet family housing needs with high quality standards and a well-planned environment.',
  '/images/projects/mega-residence.jpg',
  '[]'::jsonb,
  true,
  17
),
(
  'asoka-semarang',
  'Asoka Semarang',
  'Gajahmungkur, Semarang',
  'Development',
  'Pengembangan',
  'Asoka Semarang adalah proyek pengembangan kawasan hunian modern yang berlokasi di Semarang. PT Mitra Bumi Rejeki menangani konstruksi dan pengembangan unit-unit hunian dengan desain kontemporer yang elegan. Proyek ini menghadirkan pilihan hunian berkualitas bagi masyarakat Semarang dengan lingkungan yang tertata dan fasilitas yang memadai.',
  'Asoka Semarang is a modern residential area development project located in Semarang. PT Mitra Bumi Rejeki handled the construction and development of residential units with elegant contemporary design. The project offers quality housing options for Semarang residents with a well-organized environment and adequate facilities.',
  '/images/projects/asokas-semarang.webp',
  '["/images/projects/asokas-semarang-galeri.webp"]'::jsonb,
  false,
  18
)
ON CONFLICT (id) DO NOTHING;
