-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_laporan
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('356a192b7913b04c54574d18c28d46e6395428ab','i:1;',1733325359),('356a192b7913b04c54574d18c28d46e6395428ab:timer','i:1733325359;',1733325359);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `instance_id` bigint(20) unsigned NOT NULL,
  `doc_type` enum('central','east') NOT NULL,
  `number` varchar(255) NOT NULL,
  `issue_date` datetime DEFAULT NULL,
  `verification_date` datetime DEFAULT NULL,
  `subject` text DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `next_action` mediumtext DEFAULT NULL,
  `corrective_action` mediumtext DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `petugas` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documents_user_id_foreign` (`user_id`),
  KEY `documents_instance_id_foreign` (`instance_id`),
  CONSTRAINT `documents_instance_id_foreign` FOREIGN KEY (`instance_id`) REFERENCES `instances` (`id`) ON DELETE CASCADE,
  CONSTRAINT `documents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1240,1,1,'central','11463','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan KB','Aditya Pratama  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1241,1,1,'central','26410','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan SD','Aisyah Fadhilah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1242,1,1,'central','29584','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan PPT','Alif Maulana  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1243,1,1,'central','32077','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan LKP','Amanda Sari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1244,1,1,'central','33508','2024-01-01 20:30:00','2024-01-05 13:00:00','Perubahan Izin Operasional Pendidikan TK','Andi Setiawan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1245,1,2,'central','34056','2024-01-01 20:30:00','2024-01-05 13:00:00','KRK Non Rumah Tinggal','Anggia Sari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1246,1,3,'central','34173','2024-01-01 20:30:00','2024-01-05 13:00:00','Izin Pemakaian Gedung/Fasilitas Pusat Pendidikan dan Pelatihan Ketrampilan Tenaga Kebakaran','Anwar Hidayat  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1247,1,4,'central','34213','2024-01-01 20:30:00','2024-01-05 13:00:00','Izin Pemakaian Ruang Terbuka Hijau','Arif Hidayatullah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1248,1,2,'central','34267','2024-01-01 20:30:00','2024-01-05 13:00:00','KRK Non Rumah Tinggal','Arum Lestari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1249,1,2,'central','34297','2024-01-01 20:30:00','2024-01-05 13:00:00','KRK Rumah Tinggal Tidak Sederhana','Azza Nurul  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1250,1,1,'central','35812','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan TK','Bagus Saputra  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1251,1,1,'central','36043','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan TK','Bima Aditya  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1252,1,1,'central','36124','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan PPT','Citra Anggraini  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1253,1,1,'central','36245','2024-01-01 20:30:00','2024-01-05 13:00:00','Daftar Ulang Izin Operasional Satuan Pendidikan TK','Dedi Supriyadi  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1254,1,5,'central','36311','2024-01-01 20:30:00','2024-01-05 13:00:00','NON KOMERSIAL - Pemakaian Lapangan Softball Dharmawangsa','Devi Suryani  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1255,1,6,'central','36503','2024-01-01 20:30:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Dian Wulandari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1256,1,7,'central','36720','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Cabut Pindah Izin Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi/PPDS/PPDGS','Dimas Ramadhan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1257,1,2,'central','36892','2024-01-01 20:30:00','2024-01-05 13:00:00','Persetujuan Pengalihan Hak IPT','Dini Anggraeni  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1258,1,7,'central','36951','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Eko Prasetyo  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1259,1,4,'central','37012','2024-01-01 20:30:00','2024-01-05 13:00:00','Permohonan Penebangan/Pemindahan Pohon Tempat Usaha/Ruko','Eliza Fadhila  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1260,1,6,'central','37203','2024-01-01 20:30:00','2024-01-05 13:00:00','Pengalihan Izin Pemakaian Tanah','Fadil Nasution  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1261,1,7,'central','37384','2024-01-01 20:30:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Farah Aulia  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon menghubungi  uptsa timur (031 5982284) Apabila kurang jelas dikarenkan ada berkas yang kurang pada Surat Keterangan dari fasilitas pelayanan kesehatan sebagai tempat praktiknya dan fotokopi izin penyelenggaraan fasilitas pelayanan kesehatan yang masih berlaku, bagi praktik di fasilitas pelayanan kesehatan, surat izin bekerja dari RSUD dr. Soetomo (untuk PPDS/PPDGS) ====>>> ijin operasional RS terbaru','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1262,1,7,'central','37521','2024-01-01 20:30:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Fathia Amalia  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1263,1,6,'central','37750','2024-01-01 20:30:00','2024-01-05 13:00:00','Persetujuan SKRK Peresmian Pemutihan','Febrianto Prasetya  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1264,1,8,'central','37926','2024-01-01 20:30:00','2024-01-05 13:00:00','Arahan Sistem Drainase','Fira Sari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1265,1,7,'central','38009','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Izin Baru Tenaga Fisioterapis - SIPF','Firman Maulana  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1266,1,9,'central','38102','2024-01-01 20:30:00','2024-01-05 13:00:00','Surat Keterangan Penelitian','Galih Setiawan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1267,1,7,'central','38276','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Gita Ayu  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1268,1,2,'central','38349','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Hana Suryani  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1269,1,9,'central','38488','2024-01-01 20:30:00','2024-01-05 13:00:00','Surat Keterangan Penelitian','Hendrianto Harahap  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1270,1,7,'central','38621','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Hendra Wijaya  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1271,1,7,'central','38813','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi/PPDS/PPDGS','Indah Dwi  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','1. Mohon upload STR salinan 1/2/3\n2. Mohon perbaiki nama FASKES pada surat pernyataan sesuaikan dengan izin operasional persetujuan teknis \"RS PRIMASATYA HUSADA CITRA (PHC) SURABAYA\"','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1272,1,7,'central','39024','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Tenaga Fisioterapis - SIPF','Iqbal Rizky  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1273,1,2,'central','39210','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Irfan Ramadhan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1274,1,7,'central','39357','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Ismail Fauzi  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1275,1,2,'central','39463','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Ita Rahmawati  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1276,1,2,'central','39512','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Rumah Tinggal Pengembang','Joni Sutrisno  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Meneruskan pending dari OPD teknis : gambar pPBG tidak lengkap (gambar potongan B tidak ada), masih ada permasalahan hukum.','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1277,1,4,'central','39659','2024-01-01 20:30:00','2024-01-05 13:00:00','Perpanjangan Izin Pembuangan Sampah','Julia Permatasari  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1278,1,7,'central','39743','2024-01-01 20:30:00','2024-01-05 13:00:00','Pergantian Teknis Kefarmasian - SIPTTK','Kamilah Sari  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','(1) Mohon upload Surat Keterangan dari fasilitas pelayanan kesehatan sebagai tempat bekerja/praktiknya dan fotokopi izin penyelenggaraan fasilitas pelayanan kesehatan yang masih berlaku (2) Mohon upload Surat Ijin Praktik yang asli sesuai dengan alamat tersebut di atas (SIP Lama ASLI)','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1279,1,7,'central','39851','2024-01-01 20:30:00','2024-01-05 13:00:00','Perpanjangan Izin Praktik Tenaga Apoteker - SIPA','Kevin Haris  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Melanjutkan pendingan dari OPD : \"harap tambahkan stempel pada suket kerja  point 4\"','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1280,1,7,'central','40033','2024-01-01 20:30:00','2024-01-05 13:00:00','Sarana-Ijin Baru Surat Terdaftar Penyehat Tradisional - STPT','Kirana Pratiwi  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Harap melengkapi kekurangan berkas: sesuai arahan dinkes kota surabaya Mohon pastikan jenis usaha saudara rumah pijat atau panti sehat; dan ajukan terapis lainnya di sarana rumah pijat tersebut dan ajukan semua tenaga secara bersamaan apabila kurang jelas dapat emnghubungi WA: 085606075057','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1281,1,7,'central','40172','2024-01-01 20:30:00','2024-01-05 13:00:00','Pencabutan Izin Praktik Tenaga Apoteker - SIPA','Laila Fitria  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1282,1,7,'central','40291','2024-01-01 20:30:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Lestari Wulan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1283,1,6,'central','40402','2024-01-01 20:30:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Luthfi Amrullah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1284,1,6,'central','40576','2024-01-01 20:30:00','2024-01-05 13:00:00','Persetujuan SKRK Peresmian Pemutihan','Maira Salsabila  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1285,1,2,'central','40653','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Malika Dwi  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Meneruskan pending dari OPD teknis : gambar pPBG tidak memenuhi ketentuan SKRK (area rumah tinggal tidak ada, luas area industri melebihi 50% KDB (max 57,9m2), akses menuju lantai 2 tidak ada), gambar pPBG tidak lengkap (denah atap tidak lengkap (area ruang jahit dan ppic tidak teratapi)).','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1286,1,2,'central','40724','2024-01-01 20:30:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Manda Yuliana  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Meneruskan pending dari OPD teknis : rekom TABG tidak ada, terdapat akses menuju bangunan diluar persil, gambar pPBG tidak memenuhi ketentuan SKRK (melebihi KDB).','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1287,1,7,'central','40890','2024-01-01 20:30:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Masyitoh Hidayat  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1288,1,7,'central','40977','2024-01-01 20:30:00','2024-01-05 13:00:00','Cabut Pindah Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Maya Anggraeni  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1289,1,7,'central','41161','2024-01-03 20:30:00','2024-01-05 13:00:00','Cabut Pindah Izin Kerja Perekam Medis - SIKPM','Meliana Agustina  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon upload Surat Pernyataan dari fasilitas pelayanan kesehatan sebagai tempat bekerja/praktiknya dan fotokopi izin penyelenggaraan fasilitas pelayanan kesehatan yang masih berlaku','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1290,1,6,'central','41322','2024-01-03 10:00:00','2024-01-05 13:00:00','Persetujuan Pengalihan Hak IPT','Miftahul Huda  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1291,1,10,'central','41435','2024-01-03 10:00:00','2024-01-05 13:00:00','Tanda Daftar Bursa Kerja Khusus (BKK)','Muhammad Reza  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1292,1,7,'central','41508','2024-01-03 10:00:00','2024-01-05 13:00:00','Cabut Pindah Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Murniati Rahman  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1293,1,9,'central','41614','2024-01-03 10:00:00','2024-01-05 13:00:00','Surat Keterangan Penelitian','Nadia Salsabila  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1294,1,7,'central','41789','2024-01-03 10:00:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Nabila Maulani  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Abaikan nomor online ini dan mohon ajukan permohonan \"Sarana-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi\"','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1295,1,11,'central','41950','2024-01-03 10:00:00','2024-01-05 13:00:00','Tera Ulang di Tempat UTTP Tepasang (Loko)','Nando Saputra  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1296,1,7,'central','42027','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Nia Kristina  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1297,1,2,'central','42173','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal UMK','Niken Anggraini  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1298,1,7,'central','42260','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Nur Azizah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1299,1,7,'central','42410','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Nurul Hidayah  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Harap melengkapi kekurangan berkas: Surat Pernyataan memiliki tempat kerja sarana/fasilitas pelayanan kesehatan (bermaterai Rp. 10.000,-)=> perbaiki nama sarana sesuaikan dengan izinmoperasional RS=> RS Primasatya..., dan jam kerja sesuaikan=> Cth Senin-Minggu Shift 1: 07.00-14.00 dst (libur 1 minggu berapa kali), ','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1300,1,7,'central','42562','2024-01-03 10:00:00','2024-01-05 13:00:00','Cabut Pindah Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Oki Prasetyo  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1301,1,11,'central','42681','2024-01-03 10:00:00','2024-01-05 13:00:00','Tera Ulang di Tempat UTTP Tepasang (Loko)','Oktaviani Dewi  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1302,1,2,'central','42790','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal TABG','Oka Fitria  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1303,1,7,'central','42914','2024-01-03 10:00:00','2024-01-05 13:00:00','Perorangan-Perpanjangan Izin Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Opik Syahril  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1304,1,7,'central','43058','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Putri Salma  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1305,1,7,'central','43165','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Putra Budi  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1306,1,7,'central','43302','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Praktik Baru Ahli Teknologi Laboratorium Medik - ATLM','Rachmat Kurniawan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1307,1,7,'central','43417','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Rahmat Dwi  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon melengkapi : \n1. Alamat Domisili Pemohon pada step 1 sesuaikan dengan domisili yang diupload, \n2. Surat Rekomendasi dari Organisasi Profesi(PPNI) beserta bukti pemenuhan kecukupan SKP (upload 2 berkas, rekom + kecukupan SKP), \n3. STR /SIP yang masih berlaku dan dilegalisir, \n4. Apabila kurang jelas hubungi UPTSA 031-5982284 ext 0','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1308,1,7,'central','43548','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Riana Anggraini  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon dilengkapi :\n1. Surat Keterangan domisili tinggal di Surabaya (Bagi Penduduk Non Surabaya) ====>>> mohon ditambahkan surat permyataan pulang pergi\n2. STR /SIP yang masih berlaku dan dilegalisir ===>>> Mohon yang yg di legalisir ','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1309,1,7,'central','43673','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Rizky Pratama  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1310,1,7,'central','43782','2024-01-03 10:00:00','2024-01-05 13:00:00','Pencabutan Izin Praktik Tenaga Apoteker - SIPA','Rina Suryani  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1311,1,7,'central','43906','2024-01-03 10:00:00','2024-01-05 13:00:00','Cabut Pindah Izin Kerja Perekam Medis - SIKPM','Riska Andini  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1312,1,7,'central','44012','2024-01-03 10:00:00','2024-01-05 13:00:00','Perorangan-Perpanjangan Surat Terdaftar Penyehat Tradisional - STPT','Rudi Kurniawan  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1313,1,7,'central','44156','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Safira Rahayu  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1314,1,7,'central','44318','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Siti Fatimah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1315,1,6,'central','44424','2024-01-03 10:00:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Siti Nurhaliza  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1316,1,6,'central','44539','2024-01-03 10:00:00','2024-01-05 13:00:00','Pengalihan Izin Pemakaian Tanah','Steven Wijaya  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1317,1,1,'central','44672','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Pendirian Satuan Pendidikan LKP (Lembaga Khusus dan Pelatihan)','Sulistyo Rachman  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1318,1,6,'central','44789','2024-01-03 10:00:00','2024-01-05 13:00:00','Pengalihan Izin Pemakaian Tanah','Susi Wulandari  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Keterangan : 1. mohon Upload Lunas retribusi 2024, ','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1319,1,5,'central','44931','2024-01-03 10:00:00','2024-01-05 13:00:00','Pemanfaatan Bangunan dan / atau Lingkungan Cagar Budaya','Taufik Hidayat  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Perbaiki semua Data pemohon pada form dan data online menjadi data DIREKTUR PT. KODRAT ALAM ( bukan kuasa pengurusan ) , lampirkan FOto bangunan dan Gambar denah Bangunan ( ARS ) ','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1320,1,2,'central','45047','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Rumah Tinggal Tidak Sederhana','Tia Anggraini  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1321,1,6,'central','45230','2024-01-03 10:00:00','2024-01-05 13:00:00','Penghapusan Blokir IPT','Timotius Andre  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1322,1,6,'central','45321','2024-01-03 10:00:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Uli Arista  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1323,1,2,'central','45463','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Umi Fitria  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','MOHON MELAMPIRKAN COPY SERTIFIKAT YANG TELAH DILEGALSIIR NOTARIS ATAU MELAMPIRKAN ASLI SERTIFKAT YANG TELAH DI SCAN','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1324,1,7,'central','45574','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Perawat - SIPP','Vina Suryani  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','(1) Mohon upload Surat Keterangan domisili tinggal di Surabaya (Bagi Penduduk Non Surabaya) (2) Mohon upload Surat Keterangan Sehat jasmani dan rohani dari dokter yang telah memiliki SIP yang masih berlaku (tulis no. SIP nya)(3) Mohon upload Surat Rekomendasi dari Organisasi Profesi(PPNI) beserta bukti pemenuhan kecukupan SKP (4) Mohon upload Surat Pernyataan memiliki tempat kerja sarana/fasilitas pelayanan kesehatan (bermaterai Rp. 10.000,-) (5) Mohon upload Surat Ijin Praktik/Kerja Perawat(SIPP/SIKP) lama yang asli apabila perpanjangan','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1325,1,2,'central','45682','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Rumah Tinggal Pengembang','Vito Saputra  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1326,1,2,'central','45759','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Widyanti Mulyani  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1327,1,7,'central','45934','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Perawat - SIPP','Yanti Susilawati  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1328,1,7,'central','46018','2024-01-03 10:00:00','2024-01-05 13:00:00','Izin Baru Praktik Teknis Kefarmasian - SIPTTK','Yogi Prabowo  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon upload Surat Keterangan Sehat dari dokter yang masih memiliki SIP yang masih berlaku (tulis no. SIP nya) beri catatan pengurusan SIP','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1329,1,7,'central','46176','2024-01-03 10:00:00','2024-01-05 13:00:00','Perorangan-Perpanjangan Izin Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Yuliana Lestari  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Harap melengkapi kekurangan berkas: cek kembali mdata entrian step 2 jam kerja sesuaikan kembali=> Cth: Senin-Jumat: 07.00-09.00 mohon harus ditentukan, 2 STR (Surat Tanda Registrasi) yang dilegalisasi asli, bagi PPDS/PPDGS STR lembar pertama=> salinan 1, 2 Surat Pernyataan memiliki tempat kerja di sarana / fasilitas pelayanan kesehatan atau praktik mandiri (bermaterai 10.000,=> form ada pada kolom upload dan diketik kembali, 3 Surat Ijin Praktik yang lama dan asli apabila perpanjangan atau pindah tempat praktik=> SIP lama asli di sarana tersebut','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1330,1,7,'central','46314','2024-01-03 10:00:00','2024-01-05 13:00:00','Pencabutan Izin Praktik Teknis Kefarmasian - SIPTTK','Yumna Arifah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1331,1,6,'central','46472','2024-01-03 10:00:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Zahra Amalia  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1332,1,7,'central','46559','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Perpanjangan Izin Praktik Bidan - SIPB','Zainal Abidin  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1333,1,7,'central','46683','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi/PPDS/PPDGS','Zaki Rizky  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Mohon dilengkapi :\n1. STR (Surat Tanda Registrasi) yang dilegalisasi asli, bagi PPDS/PPDGS STR lembar pertama ===>>>> dimohon sesuaikan dengan step 2 pada Ijin Praktik Ke - 2 maka yang di upload Salinan 2 (mohon saat mengupload \"Salinan 2\" diperlihatkan\n2. Harap melengkapi kekurangan berkas: cek kembali data entrian step 2 Masa Berlaku sesuaikan dengan STR=> Selama Mengikuti.,.. dengan memilih jenis STR bertanggal','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1334,1,11,'central','46801','2024-01-03 10:00:00','2024-01-05 13:00:00','Tera Ulang di Tempat UTTP Tepasang (Loko)','Zeta Amelia  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1335,1,7,'central','46925','2024-01-03 10:00:00','2024-01-05 13:00:00','Sarana-Cabut Pindah Izin Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi/PPDS/PPDGS','Zulfikar Reza  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','(1) Mohon alamat KTP dan alamat domisili pada data entrian diberi tambahan KOTA (2) Mohon upload Pas Photo digital terbaru ukuran 4 x 6 cm dengan latar belakang merah (crop dan rapikan tanpa tepian putih) (3) Mohon upload Surat Pernyataan dari fasilitas pelayanan kesehatan sebagai tempat bekerja/praktiknya dan fotokopi izin penyelenggaraan fasilitas pelayanan kesehatan yang masih berlaku bagi praktik di fasilitas pelayanan kesehatan','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1336,1,2,'central','47006','2024-01-03 10:00:00','2024-01-05 13:00:00','PBG Non Rumah Tinggal','Zubaidah Aisyah  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1337,1,6,'central','47187','2024-01-03 10:00:00','2024-01-05 13:00:00','Perpanjangan Izin Pemakaian Tanah','Zuhdi Anwar  ',NULL,'081234049926','Lanjut ke OPD',NULL,'Berkas Sesuai Persyaratan Administrasi','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin'),(1338,1,7,'central','47292','2024-01-03 10:00:00','2024-01-05 13:00:00','Perorangan-Izin Baru Praktik Dokter Umum/Gigi/Spesialis/Spesialis Gigi','Zaskia Cempaka  ',NULL,'081234049926',NULL,'Pengembalian dari OPD','Harap melengkapi ekkurangan berkas: cek kembali data entrian step 2 nama sarana ganti Praktik Swasta Perorangan, 2 Surat Pernyataan memiliki tempat kerja di sarana / fasilitas pelayanan kesehatan atau praktik mandiri (bermaterai 10.000,-)=> nama sarana sesuaikan kembali, 3 apabila kurang jelas dapat menghubungi UPTSA 031-5982284 ext 0 atau Live Chat: 085234982434','2024-12-15 04:21:50','2024-12-15 04:21:50','Bu Titin');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instances`
--

DROP TABLE IF EXISTS `instances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instances` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `instances_parent_id_foreign` (`parent_id`),
  CONSTRAINT `instances_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `instances` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instances`
--

LOCK TABLES `instances` WRITE;
/*!40000 ALTER TABLE `instances` DISABLE KEYS */;
INSERT INTO `instances` VALUES (1,NULL,'Dinas Pendidikan','2024-12-04 15:26:56','2024-12-04 15:26:56'),(2,NULL,'Dinas Perumahan Rakyat dan Kawasan Permukiman serta Pertanahan','2024-12-04 15:26:56','2024-12-04 15:26:56'),(3,NULL,'Dinas Pemadam Kebakaran','2024-12-04 15:26:56','2024-12-04 15:26:56'),(4,NULL,'Dinas Lingkungan Hidup','2024-12-04 15:26:56','2024-12-04 15:26:56'),(5,NULL,'Dinas Kebudayaan, Kepemudaan dan Olah Raga serta Pariwisata','2024-12-04 15:26:56','2024-12-04 15:26:56'),(6,NULL,'Badan Pengelolaan Keuangan dan Aset Daerah','2024-12-04 15:26:56','2024-12-04 15:26:56'),(7,NULL,'Dinas Kesehatan','2024-12-04 15:26:56','2024-12-04 15:26:56'),(8,NULL,'Dinas Sumber Daya Air dan Bina Marga','2024-12-04 15:26:56','2024-12-04 15:26:56'),(9,NULL,'Badan Kesatuan Bangsa dan Politik','2024-12-04 15:26:56','2024-12-04 15:26:56'),(10,NULL,'Dinas Perindustrian dan Tenaga Kerja','2024-12-04 15:26:56','2024-12-04 15:26:56'),(11,NULL,'UPTD Metrologi Legal','2024-12-04 15:26:56','2024-12-04 15:26:56'),(12,NULL,'Dinas Koperasi Usaha Kecil dan Menengah dan Perdagangan','2024-12-04 15:26:57','2024-12-04 15:26:57'),(13,NULL,'Badan Pendapatan Daerah','2024-12-04 15:26:57','2024-12-04 15:26:57'),(14,NULL,'Dinas Perpustakaan dan Kearsipan','2024-12-04 15:26:57','2024-12-04 15:26:57');
/*!40000 ALTER TABLE `instances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_05_07_192043_create_instances_table',1),(5,'2024_05_07_192113_create_documents_table',1),(6,'2024_05_22_100519_update_instances_table',1),(7,'2024_05_25_182129_update_documents_table',1),(8,'2024_11_06_161215_add_email_to_users_table',1),(9,'2024_11_07_122715_add_email_to_password_reset_tokens',1),(10,'2024_11_07_132617_remove_username_from_password_reset_tokens',1),(11,'2024_11_13_113408_create_notifications_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `message` varchar(255) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'Naufal Iqbal Zaki Telah Import 343 Berkas Di MPP Pusat',1,'2024-12-04 15:27:08','2024-12-16 14:36:10'),(2,1,'Naufal Iqbal Zaki Telah Import 99 Berkas Di UPTSA Timur',1,'2024-12-04 15:32:25','2024-12-16 14:36:10'),(3,1,'Naufal Iqbal Zaki Telah Export 99 Berkas Di UPTSA Timur',1,'2024-12-08 07:08:14','2024-12-16 14:36:10'),(4,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-13 09:49:04','2024-12-16 14:36:10'),(5,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-13 09:59:03','2024-12-16 14:36:10'),(6,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-13 10:23:20','2024-12-16 14:36:10'),(7,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-13 11:30:29','2024-12-16 14:36:10'),(8,1,'Naufal Iqbal Zaki Telah Import 343 Berkas Di MPP Pusat',1,'2024-12-13 22:21:50','2024-12-16 14:36:10'),(9,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-14 06:14:24','2024-12-16 14:36:10'),(10,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-14 07:09:55','2024-12-16 14:36:10'),(11,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di UPTSA Timur',1,'2024-12-14 07:21:33','2024-12-16 14:36:10'),(12,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di UPTSA Timur',1,'2024-12-14 07:39:31','2024-12-16 14:36:10'),(13,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di UPTSA Timur',1,'2024-12-14 08:34:28','2024-12-16 14:36:10'),(14,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di UPTSA Timur',1,'2024-12-14 09:08:30','2024-12-16 14:36:10'),(15,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-14 09:31:41','2024-12-16 14:36:10'),(16,1,'Naufal Iqbal Zaki Telah Import 343 Berkas Di UPTSA Timur',1,'2024-12-14 09:33:40','2024-12-16 14:36:10'),(17,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-14 15:41:38','2024-12-16 14:36:10'),(18,1,'Naufal Iqbal Zaki Telah Import 99 Berkas Di MPP Pusat',1,'2024-12-14 17:28:47','2024-12-16 14:36:10'),(19,1,'Naufal Iqbal Zaki Telah Import 99 Berkas Di MPP Pusat',1,'2024-12-15 04:22:01','2024-12-16 14:36:10'),(20,1,'Naufal Iqbal Zaki Telah Menambahkan 1 Berkas Di MPP Pusat',1,'2024-12-15 16:58:35','2024-12-16 14:36:10'),(21,1,'Naufal Iqbal Zaki Telah Export 99 Berkas Di MPP Pusat',1,'2024-12-16 07:00:51','2024-12-16 14:36:10'),(22,1,'Naufal Iqbal Zaki Telah Export 99 Berkas Di MPP Pusat',1,'2024-12-16 08:23:26','2024-12-16 14:36:10');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_reset_tokens_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2xFLzGD73RujX7zBhrtj9XJWXpMMnt76MPswTDxs',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoia1M2VmxmZ2tRUUpReWxKU0Y0MjY3U2ljNkVpQjhHaHA0TlU2Q2VMRyI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RvY3VtZW50cz90eXBlPWNlbnRyYWwiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1734367705),('wYWLC1ypek7YjFKFd89x05CbjrX1A9GanHw7UOFt',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoidWJpY2lxUFdjRHdrOFVVekgySENoVGdQamlielNic3RKNUNqWG5PbCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RvY3VtZW50cz90eXBlPWNlbnRyYWwiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1734387779);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Naufal Iqbal Zaki','naufaliqbalzaki','naufaliqbal305@gmail.com','$2y$12$1A2GJugZoTySrtXj1gH0W.0ZOjUBG/mMWSojfsACtBSAX2bxXJTj2','user','ydNk6MwuCCvElFJPuimpdEx04nZms76WrYZqZhaCB2IciXzWQtFjsgDpueTv','2024-12-04 15:14:02','2024-12-04 15:14:59','2024-12-04 15:14:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-17  5:23:08
