# 📡 PANDUAN BELAJAR MTCNA — SIAP UJIAN DALAM WAKTU SINGKAT

> Dibuat berdasarkan analisis 100 soal contoh MTCNA + Training Outline resmi MikroTik

---

## 📊 BAGIAN 1: ANALISIS PRIORITAS MATERI

### Topik Paling Sering Muncul di Soal (dari 100 soal)

| Topik | Jumlah Kemunculan | Prioritas |
|---|---|---|
| OSI Layer | 6x | 🔴 WAJIB |
| Subnetting / IP Address | 8x | 🔴 WAJIB |
| ARP | 6x | 🔴 WAJIB |
| Firewall & Connection Tracking | 6x | 🔴 WAJIB |
| DHCP | 5x | 🔴 WAJIB |
| Routing (Static) | 5x | 🔴 WAJIB |
| Wireless (Access List, WDS, NStreme) | 6x | 🟠 SERING |
| NAT (Masquerade, Redirect) | 4x | 🟠 SERING |
| Queue (PCQ, SFQ, FIFO) | 4x | 🟠 SERING |
| PPP / PPPoE | 5x | 🟠 SERING |
| Export vs Backup File | 4x | 🟠 SERING |
| Winbox / Port Default | 3x | 🟡 BONUS |
| SNMP | 2x | 🟡 BONUS |
| ICMP / Ping | 3x | 🟡 BONUS |

---

### Pembagian Materi

#### 🔴 WAJIB DIKUASAI (Paling Banyak Keluar)
1. OSI Model — 7 layer, fungsi masing-masing
2. Subnetting — hitung usable host, network, broadcast
3. ARP — cara kerja, max entry, mode reply-only
4. Firewall — chain, action, connection tracking states
5. DHCP — apa yang dikirim ke client
6. Static Routing — distance, failover, gateway

#### 🟠 SERING KELUAR DI SOAL
7. Wireless — Access List, Default Authenticate, WDS mode
8. NAT — masquerade (srcnat), redirect (dstnat)
9. Queue — jenis queue, priorities
10. PPP/PPPoE — secrets, user types
11. Export vs Backup — perbedaan mendasar
12. IP Public vs Private

#### 🟡 BONUS / PENDALAMAN
13. SNMP protocol/port
14. NStreme — channel width
15. Netinstall
16. License level
17. TTL default

---

## 📘 BAGIAN 2: RINGKASAN KONSEP PENTING

---

### 🔵 OSI MODEL — 7 LAYER

Gunakan jembatan keledai: **"Aku Punya Semua Teknologi Dalam Dua Pilihan"**

| Layer | Nama | Fungsi | Unit Data |
|---|---|---|---|
| 7 | Application | Interface ke user (HTTP, FTP) | Data |
| 6 | Presentation | Format data (enkripsi, kompresi) | Data |
| 5 | Session | Kelola sesi komunikasi | Data |
| 4 | Transport | TCP/UDP, port | Segment |
| 3 | Network | IP Address, routing | Packet |
| 2 | Data Link | MAC Address, switch | Frame |
| 1 | Physical | Bit, kabel, sinyal fisik | **Bit** |

**🔑 Yang Paling Sering Keluar:**
- Layer 1 = Physical = unit datanya adalah **BIT**
- Layer 2 = Data Link = **MAC Address**
- Layer 3 = Network = **IP Address**
- ARP bekerja memetakan Layer 3 (IP) ke Layer 2 (MAC)

---

### 🔵 SUBNETTING — CARA CEPAT

**Analogi:** Subnetting itu seperti membagi kompleks perumahan. Satu blok besar (network) dibagi jadi beberapa gang kecil (subnet), dan setiap gang punya rumah-rumah (host).

**Rumus Penting:**
- Jumlah host per subnet = **2^(32-prefix) - 2**
- "-2" karena: 1 untuk Network Address, 1 untuk Broadcast Address

**Tabel Cepat yang WAJIB HAFAL:**

| Prefix | Subnet Mask | Jumlah Host |
|---|---|---|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | **2** ← sering di soal |
| /31 | 255.255.255.254 | 0 (point-to-point) |
| /32 | 255.255.255.255 | 1 (single host) |
| /23 | 255.255.254.0 | **510** ← sering di soal |
| /22 | 255.255.252.0 | 1022 |
| /16 | 255.255.0.0 | 65534 |

**Range IP Private (WAJIB HAFAL):**
- 10.0.0.0/8 (10.0.0.0 – 10.255.255.255)
- 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)
- 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)
- 127.x.x.x = loopback (bukan public)

**IP yang BUKAN private = IP PUBLIC (routable di internet)**

**Contoh soal /27:**
- Subnet 15.242.55.0/27
- Network: 15.242.55.0 | Broadcast: 15.242.55.31
- Subnet ke-2: Network 15.242.55.32 | Broadcast: 15.242.55.63
- Host range ke-2: **15.242.55.33 – 15.242.55.62**

---

### 🔵 ARP (Address Resolution Protocol)

**Analogi:** ARP itu seperti tukang pos yang tidak tahu rumah siapa, lalu teriak ke seluruh gang: "Siapa yang punya nomor rumah 192.168.1.5? Kasih tahu aku nomormu (MAC address)!"

**Poin Penting:**
- ARP digunakan **hanya untuk IPv4**
- IPv6 menggunakan **NDP (Neighbor Discovery Protocol)**
- ARP memetakan: **IP Address (Layer 3) → MAC Address (Layer 2)**
- Maksimal entri ARP di MikroTik: **8192 entri**
- ARP bisa statis atau dinamis

**Mode ARP di MikroTik:**

| Mode | Fungsi |
|---|---|
| enabled | ARP normal, belajar otomatis |
| disabled | Tidak pakai ARP |
| reply-only | Hanya balas ARP yang cocok dengan tabel statis di /ip arp. **TIDAK** menambah entri baru otomatis |
| proxy-arp | Router menjawab ARP atas nama host lain |

**Soal Jebakan reply-only:** Jika ARP=reply-only, interface **hanya menerima kombinasi IP+MAC yang sudah ada di /ip arp sebagai static**. Tidak bisa menambah entri baru otomatis.

---

### 🔵 DHCP

**Analogi:** DHCP seperti resepsionis hotel yang otomatis memberi kunci kamar (IP address), memberi tahu letak lobi (gateway), dan memberi peta hotel (DNS) kepada tamu yang baru datang.

**Apa yang diterima DHCP Client secara default:**
1. ✅ IP Address
2. ✅ Subnet Mask
3. ✅ Default Gateway
4. ✅ DNS Server (jika dikonfigurasi di server)

**Poin Penting:**
- Client SELALU dapat IP + Gateway (default)
- DNS hanya didapat jika DHCP Server dikonfigurasi DNS
- DHCP Client bisa aktif di interface mana saja (ethernet, dll)

---

### 🔵 STATIC ROUTING

**Analogi:** Routing seperti penunjuk jalan. Static routing = kamu pasang penunjuk jalan secara manual. Dynamic routing = penunjuk jalan berubah otomatis tergantung kondisi lalu lintas.

**Konsep Distance (Failover):**
- Distance = prioritas jalur (makin **kecil** = makin diprioritaskan)
- Distance 1 lebih dipilih daripada distance 10

```
/ip route add dst-address=0.0.0.0/0 gateway=2.2.2.2 distance=5   ← INI YANG AKTIF (kecil)
/ip route add dst-address=0.0.0.0/0 gateway=1.1.1.1 distance=10  ← backup
```

**Route Flags (Status) — WAJIB HAFAL:**

| Flag | Arti |
|---|---|
| A | Active (aktif digunakan) |
| S | Static (dibuat manual) |
| C | Connected (terhubung langsung) |
| D | Dynamic (dibuat otomatis) |
| B | Blackhole |

> Ketika kamu menambah IP ke interface aktif, RouterOS otomatis membuat route dengan flag **C** (Connected).

**Static routing tidak butuh package tambahan** — sudah termasuk di package `system`.

---

### 🔵 FIREWALL

**Analogi:** Firewall seperti satpam gedung yang punya 3 pos pemeriksaan:
- **Input chain** = tamu yang mau masuk ke kantor satpam sendiri (masuk ke router)
- **Forward chain** = tamu yang melewati gedung (melewati router, bukan untuk router)
- **Output chain** = orang dari dalam gedung yang mau keluar

**3 Chain Firewall:**

| Chain | Digunakan untuk |
|---|---|
| input | Paket yang **masuk ke router** (tujuan router itu sendiri) |
| forward | Paket yang **melewati router** (dari client ke internet) |
| output | Paket yang **keluar dari router** |

**Actions di /ip firewall filter:**

| Action | Fungsi |
|---|---|
| accept | Izinkan paket |
| drop | Buang paket diam-diam (no reply) |
| reject | Buang dan kirim pesan error |
| log | Catat ke log |
| jump | Lompat ke chain lain |
| tarpit | Jebak koneksi TCP (buat port scanner lambat) |
| add-to-address-list | Tambah IP ke address list |

**Connection Tracking States — WAJIB HAFAL (hanya 4):**

| State | Arti |
|---|---|
| **new** | Koneksi baru yang belum pernah ada |
| **established** | Paket bagian dari koneksi yang sudah ada |
| **related** | Paket terkait koneksi yang ada (tapi bukan bagian dari koneksi itu) |
| **invalid** | Paket tidak cocok dengan koneksi manapun |

> **Jebakan soal:** Syn, Closed, Unknown = BUKAN state di MikroTik connection tracking!

---

### 🔵 NAT (Network Address Translation)

**Analogi:** NAT seperti kantor pos yang menyembunyikan alamat rumah kamu. Semua surat dari dalam gedung dikirim dengan alamat pengirim = alamat kantor pos (router), bukan alamat rumah asli.

**Jenis NAT:**

| Jenis | Chain | Fungsi |
|---|---|---|
| **Masquerade** | srcnat | Sembunyikan IP private, ganti dengan IP public router. Dipakai untuk internet sharing |
| **src-nat** | srcnat | Seperti masquerade tapi IP publik ditentukan manual |
| **dst-nat** | dstnat | Alihkan paket ke IP/port tujuan lain (port forwarding) |
| **redirect** | dstnat | Alihkan paket ke router itu sendiri (port tertentu) |

**Command Masquerade yang Benar:**
```
/ip firewall nat add action=masquerade chain=srcnat out-interface=ether1
```
> Perhatikan: chain=**srcnat** (bukan dstnat!), dan butuh **out-interface**

**Redirect untuk DNS:**
Untuk memaksa semua DNS request di-resolve oleh router = gunakan action **redirect** di chain **dstnat**.

---

### 🔵 WIRELESS

**Mode Wireless:**

| Mode | Fungsi |
|---|---|
| ap-bridge | Access Point (bisa handle banyak client) |
| bridge | Access Point (hanya 1 client, bisa WDS) |
| station | Client biasa (tidak bisa di-bridge ke ethernet) |
| station-wds | Client dengan WDS support |
| station-pseudobridge | Client yang bisa di-bridge (tapi trik) |
| wds-slave | Slave untuk WDS |

**WDS (Wireless Distribution System):**
- Memungkinkan AP sekaligus jadi station
- Konsekuensi: **bandwidth berkurang 50%**
- Mode yang support WDS: **ap-bridge, bridge, wds-slave, station-wds**

**Access List vs Default Authenticate:**

| Fitur | Fungsi |
|---|---|
| Access List | Daftar MAC address yang boleh/tidak boleh konek ke AP |
| **Default Authenticate** | Jika **ON**: semua client bebas konek. Jika **OFF**: hanya client di Access List yang boleh konek |

> **Soal Penting:** Untuk membatasi hanya client tertentu yang boleh konek = **NONAKTIFKAN Default Authenticate**

**NStreme:**
- Bekerja pada channel 20 MHz (default), 10 MHz, dan 40 MHz — **bukan hanya 40 MHz!**

**Standar 802.11 dan Frekuensi:**

| Standar | Frekuensi |
|---|---|
| 802.11b/g | **2.4 GHz** (2412–2462 MHz) |
| 802.11a | 5 GHz |
| 802.11n | 2.4 atau 5 GHz |
| 802.11ac | 5 GHz |

> Untuk throughput 100 Mbps: butuh **802.11n** (a/n atau a/b/g/n)

---

### 🔵 QUEUE / BANDWIDTH MANAGEMENT

**Analogi:** Queue seperti pengatur lalu lintas jalan tol yang membagi jalur agar tidak ada yang memonopoli jalan.

**Jenis Queue di RouterOS:**

| Jenis | Kepanjangan | Fungsi |
|---|---|---|
| **FIFO** | First In First Out | Queue dasar (BFIFO, PFIFO, MQ PFIFO) |
| **SFQ** | Stochastic Fairness Queuing | Adil berdasarkan koneksi |
| **RED** | Random Early Detect | Drop paket random saat congestion |
| **PCQ** | Per Connection Queuing | Bagi bandwidth rata per client |

> **BUKAN jenis queue:** DRR, LIFO — ini jebakan soal!

**Queue Priorities:** MikroTik punya **8 level priority** (1 = tertinggi, 8 = terendah)

**Simple Queue:**
- Bagian wajib: **target-address + max-limit**
- Total = upload + download gabungan

**PCQ untuk download client:**
- classifier = **dst-address** (untuk download)
- classifier = **src-address** (untuk upload)

---

### 🔵 PPP / PPPoE

**PPP Secrets digunakan untuk autentikasi:**
- ✅ PPPoE clients
- ✅ PPTP clients
- ✅ L2TP clients
- ✅ PPP clients
- ❌ Hotspot users (beda menu)
- ❌ Winbox users (beda menu)
- ❌ Wireless users

**PPPoE:**
- Bekerja dalam **satu broadcast domain** (tidak melewati router antar segment)
- Pernyataan di soal: "PPPoE server tidak bisa di-reach jika ada router di antaranya" = **FALSE** (bisa dengan konfigurasi relay)
- Untuk konfigurasi PPPoE client, butuh: **Interface** (bukan static IP, bukan NAT rule)

**License level untuk E1/T1:** Minimal **Level 5**

---

### 🔵 EXPORT vs BACKUP FILE

**Perbedaan Mendasar (WAJIB HAFAL):**

| Aspek | Export (.rsc) | Backup (.backup) |
|---|---|---|
| Format | **Plain text** (bisa dibuka Notepad) | **Binary** (tidak bisa dibuka Notepad) |
| Isi | Bisa sebagian konfigurasi | Seluruh konfigurasi |
| Edit | ✅ Bisa diedit | ❌ Tidak bisa diedit |
| Contoh | `/ip firewall export` | `/system backup save` |
| User/password | ❌ Tidak termasuk | ✅ Termasuk |
| Reboot setelah import | **FALSE** (tidak perlu) | Mungkin perlu |

> **Soal Jebakan:** "Backup file disimpan dalam plain text" = **FALSE**
> "Export file bisa diedit" = **TRUE**

---

## 🗒️ BAGIAN 3: CHEAT SHEET MIKROTIK

---

### 📌 PORT PENTING — WAJIB HAFAL

| Service | Protocol | Port |
|---|---|---|
| **Winbox** | TCP | **8291** |
| SSH | TCP | 22 |
| Telnet | TCP | 23 |
| HTTP (WebFig) | TCP | 80 |
| Web Proxy | TCP | 8080 |
| **SNMP** | **UDP** | **161** (query) |
| **SNMP Trap** | **UDP** | **162** |
| MikroTik Discovery | UDP | 5678 |
| DNS | UDP/TCP | 53 |
| DHCP | UDP | 67/68 |

---

### 📌 ISTILAH PENTING

| Istilah | Arti |
|---|---|
| RouterOS | Sistem operasi MikroTik |
| RouterBOARD | Hardware MikroTik |
| Winbox | Software GUI untuk remote router |
| Netinstall | Tool install/reinstall RouterOS via network |
| WDS | Wireless Distribution System (AP + Station sekaligus) |
| PCQ | Per Connection Queue (bandwidth merata per client) |
| NAT | Network Address Translation |
| TTL | Time To Live (default = 64) |
| ARP | Address Resolution Protocol (IP → MAC, hanya IPv4) |
| NDP | Neighbor Discovery Protocol (pengganti ARP di IPv6) |
| SNMP | Simple Network Management Protocol |
| ICMP | Internet Control Message Protocol (protokol ping & traceroute) |
| FQDN | Fully Qualified Domain Name |
| HTB | Hierarchical Token Bucket (basis implementasi queue) |

---

### 📌 COMMAND PENTING

| Command | Fungsi |
|---|---|
| `/ip address` | Kelola IP address di interface |
| `/ip route` | Kelola routing table |
| `/ip firewall filter` | Atur firewall filter rules |
| `/ip firewall nat` | Atur NAT rules |
| `/ip firewall mangle` | Marking paket/koneksi |
| `/ip dhcp-server` | Konfigurasi DHCP server |
| `/ip dhcp-client` | Konfigurasi DHCP client |
| `/ip arp` | Lihat/kelola tabel ARP |
| `/interface wireless` | Konfigurasi interface wireless |
| `/interface wireless access-list` | Kelola access list wireless |
| `/queue simple` | Simple queue |
| `/queue tree` | Queue tree (PCQ) |
| `/ppp secret` | Kelola PPP user accounts |
| `/system backup save` | Simpan backup |
| `/export` | Export konfigurasi ke .rsc |
| `/import` | Import file .rsc |
| `/system scheduler` | Jadwalkan perintah (bukan cron, bukan watchdog!) |
| `/system reboot` | Reboot router |

---

### 📌 SHORTCUT SUBNETTING

Untuk menghitung jumlah host dari prefix:
- /24 → 254 host
- /23 → 510 host (dua kali /24 dikurangi 2)
- /25 → 126 host (setengah /24 dikurangi 2)
- /30 → 2 host (paling sering untuk point-to-point)
- /32 → 1 IP (single host, no subnet)

**Rumus cepat:** Host = 2^(32-prefix) - 2

---

### 📌 TROUBLESHOOTING DASAR

1. Tidak bisa ping → cek IP, gateway, firewall, kabel
2. Tidak dapat IP → cek DHCP server aktif, interface benar
3. Internet tidak jalan → cek NAT masquerade, DNS, default route
4. Wireless tidak konek → cek SSID, password, default authenticate, access list
5. Winbox tidak bisa connect → cek port 8291, service aktif

---

## 📝 BAGIAN 4: ANALISIS CONTOH SOAL LENGKAP

---

### SOAL 1
**Pernyataan benar tentang /export (rsc file)?**

**JAWABAN BENAR:** B (Exports full configuration) dan C (Exports only part of configuration, e.g. /ip firewall)

**ALASAN:** Export bisa mengekspor semua konfigurasi ATAU hanya satu bagian saja.

**KENAPA OPSI LAIN SALAH:**
- A. Export tidak mengekspor log (/log)
- D. Export tidak mengekspor scripts dari /system script
- E. Export BISA diedit (plain text)

**KONSEP:** Perbedaan Export (.rsc) vs Backup

**TRIK CEPAT:** Export = fleksibel (bisa sebagian), bisa diedit. Backup = seluruh config, tidak bisa diedit.

---

### SOAL 2
**Static routing butuh package tambahan selain system?**

**JAWABAN BENAR:** A. None

**ALASAN:** Static routing sudah termasuk dalam package `system` bawaan RouterOS.

**KONSEP:** Tidak semua fitur butuh package tambahan. Dynamic routing (OSPF, BGP) butuh package `routing`, tapi static routing tidak.

---

### SOAL 3
**Dari mana bisa download Winbox?**

**JAWABAN BENAR:** A (Router's webpage) dan D (mikrotik.com)

**KENAPA OPSI LAIN SALAH:**
- B. Files menu di router — Winbox tidak ada di sana
- C. Console cable — tidak bisa download software via cable console

---

### SOAL 4
**Default route mana yang aktif?**
```
add distance=10 gateway=1.1.1.1
add distance=5 gateway=2.2.2.2
```

**JAWABAN BENAR:** B. Route via gateway 2.2.2.2

**ALASAN:** Distance lebih **kecil** = diprioritaskan. Distance 5 < 10, jadi gateway 2.2.2.2 yang aktif.

**TRIK CEPAT:** Distance kecil = jalur utama. Distance besar = backup.

---

### SOAL 5
**Protokol apa yang dipakai ping dan traceroute?**

**JAWABAN BENAR:** C. ICMP

**KENAPA OPSI LAIN SALAH:**
- UDP dan TCP = transport layer, bukan untuk ping
- DHCP = untuk IP assignment
- IP = terlalu umum

**TRIK CEPAT:** Ping = ICMP. Selalu ICMP.

---

### SOAL 6
**`/interface wireless access-list` digunakan untuk?**

**JAWABAN BENAR:** C. Handles a list of clients MAC address to permit/deny connection to AP

**ALASAN:** Access list memfilter siapa yang boleh konek ke AP berdasarkan MAC address.

**KENAPA OPSI LAIN SALAH:**
- A. "Shows" — access list bukan hanya menampilkan, tapi juga mengontrol
- B. Hotspot user = menu terpisah
- D. Security profile = pengaturan enkripsi, bukan access list

---

### SOAL 7
**Collision mungkin terjadi di full-duplex Ethernet?**

**JAWABAN BENAR:** FALSE

**ALASAN:** Full-duplex = bisa kirim dan terima secara bersamaan di jalur terpisah. Collision hanya terjadi di half-duplex (CSMA/CD).

---

### SOAL 8
**OSI model punya berapa layer?**

**JAWABAN BENAR:** E. 7

**TRIK CEPAT:** 7 layer = Physical, Data Link, Network, Transport, Session, Presentation, Application

---

### SOAL 10
**ARP dipakai di IPv6?**

**JAWABAN BENAR:** FALSE

**ALASAN:** IPv6 menggunakan NDP (Neighbor Discovery Protocol), bukan ARP.

---

### SOAL 12
**Perlu reboot RouterBoard setelah import .rsc file?**

**JAWABAN BENAR:** TRUE (menurut dokumen soal)

> Catatan: Sebenarnya untuk export/import file biasanya tidak perlu reboot, tapi backup file perlu reboot. Dalam konteks soal ini, jawaban yang diminta adalah TRUE.

---

### SOAL 13
**Maksimal entri ARP di MikroTik RouterOS?**

**JAWABAN BENAR:** C. 8192

**TRIK CEPAT:** Hafal angka 8192 = maksimal ARP entry di MikroTik.

---

### SOAL 15
**Port yang digunakan SNMP?**

**JAWABAN BENAR:** C (UDP 161) dan E (UDP 162)

**TRIK CEPAT:** SNMP = **UDP** (bukan TCP!). Port 161 untuk query, 162 untuk trap.

---

### SOAL 16
**Berapa usable IP di subnet /23 (255.255.254.0)?**

**JAWABAN BENAR:** A. 510

**CARA HITUNG:** 2^(32-23) - 2 = 2^9 - 2 = 512 - 2 = **510**

---

### SOAL 17
**Berapa priorities yang tersedia untuk queue di MikroTik?**

**JAWABAN BENAR:** A. 8

**Hafal:** MikroTik queue priorities = **8 level** (1 paling tinggi)

---

### SOAL 18
**Berapa bit subnet mask IPv4?**

**JAWABAN BENAR:** D. 32

**ALASAN:** IPv4 = 32 bit. IPv6 = 128 bit.

---

### SOAL 26
**Default protocol/port Winbox?**

**JAWABAN BENAR:** D. TCP/8291

**TRIK CEPAT:** Winbox = TCP 8291. Hafal ini!

---

### SOAL 27
**Backup file disimpan dalam plain text?**

**JAWABAN BENAR:** FALSE

**Backup = binary, tidak bisa dibuka Notepad. Export = plain text, bisa dibuka Notepad.**

---

### SOAL 29
**User apa yang ada di PPP Secrets?**

**JAWABAN BENAR:** A (L2TP), B (PPPoE), D (PPTP)

**YANG BUKAN PPP Secrets:** Hotspot users, Winbox users, Wireless users

---

### SOAL 34
**Queue types yang tersedia di RouterOS?**

**JAWABAN BENAR:** A (SFQ), C (FIFO), E (PCQ), F (RED)

**YANG BUKAN Queue MikroTik:** DRR (Deficit Round Robin) dan LIFO — ini jebakan!

---

### SOAL 45
**TCP states di connection tracking?**

**JAWABAN BENAR:** A (New), C (Related), D (Invalid), E (Established)

**YANG BUKAN:** Syn, Closed — ini jebakan umum!

**HAFAL 4 STATE:** New, Established, Related, Invalid

---

### SOAL 47
**Default TTL pada router MikroTik?**

**JAWABAN BENAR:** D. 64

---

### SOAL 55
**Command untuk menjalankan perintah terjadwal di MikroTik?**

**JAWABAN BENAR:** C. /system scheduler

**JEBAKAN:** /system cron dan /system watchdog adalah jebakan. Yang benar = **/system scheduler**

---

### SOAL 63
**Subnet berapa yang memberikan tepat 2 host untuk komunikasi Layer-3 antara 2 host?**

**JAWABAN BENAR:** C. /30

**ALASAN:** /30 = 2^2 - 2 = 2 host yang bisa dipakai. Perfect untuk point-to-point.

---

### SOAL 72
**Action apa untuk DST-NAT rule agar semua DNS request di-resolve oleh router?**

**JAWABAN BENAR:** D. redirect

**ALASAN:** Redirect = alihkan paket ke router itu sendiri (port tertentu). Masquerade = untuk srcnat, bukan dstnat.

---

## 🧪 BAGIAN 5: SIMULASI SOAL TAMBAHAN

---

**SOAL A:**
Berapa jumlah host yang bisa digunakan dalam subnet /29?

A. 6
B. 8
C. 14
D. 30

**JAWABAN: A. 6**
Cara hitung: 2^(32-29) - 2 = 2^3 - 2 = 8 - 2 = 6

---

**SOAL B:**
Manakah yang BENAR mengenai perbedaan backup dan export file?

A. Keduanya bisa diedit dengan teks editor
B. Backup bisa diedit, export tidak bisa
C. Export bisa diedit, backup tidak bisa
D. Keduanya tidak bisa diedit

**JAWABAN: C**
Export (.rsc) = plain text, bisa diedit. Backup = binary, tidak bisa diedit.

---

**SOAL C:**
Protokol apa yang menggantikan ARP di IPv6?

A. DHCP6
B. NDP (Neighbor Discovery Protocol)
C. ICMP6
D. RARP

**JAWABAN: B. NDP**

---

**SOAL D:**
Apa yang terjadi jika Default Authenticate di wireless dinonaktifkan?

A. Semua client tidak bisa konek
B. Hanya client yang MAC address-nya ada di Access List yang bisa konek
C. Access point mati
D. Semua client bisa konek tanpa password

**JAWABAN: B**
Default Authenticate OFF = hanya MAC address yang terdaftar di Access List yang bisa konek.

---

**SOAL E:**
Manakah command masquerade yang benar untuk jaringan 192.168.0.0/24 dengan outgoing interface ether1?

A. `/ip firewall nat add action=masquerade chain=dstnat out-interface=ether1`
B. `/ip firewall nat add action=masquerade chain=srcnat out-interface=ether1`
C. `/ip firewall nat add action=masquerade chain=srcnat in-interface=ether1`
D. `/ip firewall nat add action=redirect chain=srcnat out-interface=ether1`

**JAWABAN: B**
Masquerade = action untuk srcnat, dengan out-interface menuju ke internet.

---

**SOAL F:**
State connection tracking apa yang digunakan jika paket adalah bagian dari koneksi yang sudah ada?

A. new
B. related
C. established
D. invalid

**JAWABAN: C. established**
Established = paket milik koneksi yang sudah ada dan sudah established sebelumnya.

---

**SOAL G:**
Port berapa yang digunakan Winbox untuk connect ke router?

A. TCP/22
B. TCP/80
C. TCP/8291
D. UDP/5678

**JAWABAN: C. TCP/8291**

---

**SOAL H:**
Queue type mana yang TIDAK ADA di RouterOS?

A. SFQ
B. PCQ
C. FIFO
D. LIFO

**JAWABAN: D. LIFO**
LIFO tidak ada di RouterOS. Yang ada: SFQ, PCQ, FIFO (BFIFO, PFIFO), RED.

---

**SOAL I:**
Jika sebuah router punya dua route ke 0.0.0.0/0, satu dengan distance=1 via 10.0.0.1 dan satu dengan distance=10 via 10.0.0.2, route mana yang akan digunakan?

A. Route via 10.0.0.2 (distance 10)
B. Keduanya digunakan sekaligus (load balance)
C. Route via 10.0.0.1 (distance 1)
D. Tidak ada yang aktif

**JAWABAN: C. Route via 10.0.0.1 (distance 1)**
Distance lebih kecil = prioritas lebih tinggi = jalur utama yang aktif.

---

**SOAL J:**
Berapa maksimal ARP entries di MikroTik RouterOS?

A. 1024
B. 4096
C. 8192
D. Unlimited

**JAWABAN: C. 8192**

---

## 🚀 BAGIAN 6: RINGKASAN H-1 UJIAN

---

### ⚡ DAFTAR HAFALAN SUPER PADAT

**ANGKA-ANGKA PENTING:**
- OSI Layer = **7**
- IPv4 = **32 bit**
- IPv6 = **128 bit**
- ARP max entries = **8192**
- Queue priorities = **8**
- Winbox port = **TCP/8291**
- SNMP port = **UDP 161** (query) + **UDP 162** (trap)
- TTL default = **64**
- /30 = **2 host** (point-to-point)
- /23 = **510 host**
- /24 = **254 host**

**PROTOKOL:**
- Ping & Traceroute = **ICMP**
- Winbox = **TCP 8291**
- SSH = **TCP 22**
- SNMP = **UDP 161/162**
- ARP = **hanya IPv4**
- IPv6 pakai **NDP** (bukan ARP)

**TRUE/FALSE YANG SERING KELUAR:**
- Collision di full-duplex = **FALSE**
- Backup file dalam plain text = **FALSE**
- NStreme hanya 40MHz = **FALSE**
- ARP dipakai IPv6 = **FALSE**
- Static routing butuh package tambahan = **FALSE**
- WPA dan WPA2 bisa bersamaan dalam satu security profile = **TRUE**
- PPTP client dan server bisa berjalan bersamaan di satu router = **TRUE**

---

### ⚡ KESALAHAN UMUM PESERTA

1. Mengira LIFO dan DRR adalah queue type MikroTik → **Salah!**
2. Mengira connection tracking punya state Syn/Closed → **Hanya 4: New, Established, Related, Invalid**
3. Mengira masquerade pakai chain=dstnat → **Masquerade = srcnat!**
4. Mengira distance besar = jalur utama → **Distance kecil = prioritas tinggi!**
5. Mengira ARP dipakai di IPv6 → **IPv6 pakai NDP!**
6. Mengira backup file bisa diedit → **Tidak bisa! Export yang bisa diedit**
7. Mengira /system scheduler = /system cron → **/system scheduler yang benar!**
8. Mengira Default Authenticate ON = hanya client tertentu yang konek → **Sebaliknya! OFF = hanya client di access list**

---

### ⚡ STRATEGI MENGERJAKAN UJIAN

1. **Baca soal sampai tuntas** sebelum melihat pilihan jawaban
2. **Waspadai kata "NOT", "CANNOT", "NEVER", "ONLY"** — sering jadi jebakan
3. **Soal multiple answer**: tandai semua yang benar, jangan asal pilih satu
4. **Soal True/False**: pikirkan 2x, banyak jebakan di sini
5. **Soal command**: perhatikan syntax detail (chain=srcnat vs dstnat)
6. **Skip soal yang tidak yakin**, kerjakan yang yakin dulu
7. **Manajemen waktu**: MTCNA biasanya 30 soal dalam 30 menit (1 menit per soal)

---

### ⚡ MATERI YANG PALING PENTING DIPELAJARI DI MALAM SEBELUM UJIAN

Prioritas tertinggi (urutan belajar):
1. ✅ OSI Layer (7 layer, unit data per layer)
2. ✅ 4 Connection Tracking States
3. ✅ Perbedaan Export vs Backup
4. ✅ Distance di Static Routing (kecil = utama)
5. ✅ Port penting (Winbox=8291, SNMP=UDP161/162)
6. ✅ ICMP = protokol ping
7. ✅ ARP = IPv4 only, max 8192, NDP untuk IPv6
8. ✅ NAT Masquerade = srcnat, Redirect = dstnat
9. ✅ Default Authenticate OFF = hanya Access List yang bisa konek
10. ✅ Queue: 8 priorities, SFQ/PCQ/FIFO/RED (bukan LIFO/DRR)
11. ✅ /30 = 2 host, /23 = 510 host, /24 = 254 host
12. ✅ PPP Secrets = PPPoE, PPTP, L2TP (bukan Hotspot/Winbox)

---

*Good luck ujian MTCNA-nya! 💪*
*Semoga lulus dan bisa lanjut ke MTCRE, MTCINE, dst!*
