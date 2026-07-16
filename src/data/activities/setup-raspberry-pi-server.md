---
title: "Setup Raspberry Pi sebagai Home Server"
date: 2026-07-10
category: "Software & Programming"
coverImage: "/uploads/cover-raspberry-pi.png"
summary: "Konfigurasi Raspberry Pi 4 sebagai home server multi-fungsi: Pi-hole ad blocker, Samba file sharing, dan Portainer untuk manage Docker containers."
tags:
  - Raspberry Pi
  - Linux
  - Docker
  - Home Server
  - Pi-hole
---

## Latar Belakang

Saya punya Raspberry Pi 4 (4GB RAM) yang nganggur. Daripada jadi pajangan, saya putuskan untuk jadikan home server yang bisa:

1. **Blokir iklan** di seluruh jaringan rumah (Pi-hole)
2. **File sharing** antar device (Samba)
3. **Run Docker containers** untuk berbagai service

## Persiapan

### Hardware

- Raspberry Pi 4 Model B (4GB)
- MicroSD 32GB (untuk boot)
- SSD 256GB via USB 3.0 (untuk data)
- Casing aluminium dengan heatsink pasif
- Power supply 5V/3A USB-C

### Software

- **Raspberry Pi OS Lite** (64-bit, headless — tanpa desktop environment)
- SSH untuk remote access

## Instalasi

### 1. Flash OS & Boot dari SSD

```bash
# Flash Raspberry Pi OS ke SSD menggunakan rpi-imager
# Enable SSH dan set username/password di Imager settings

# Setelah boot, update system
sudo apt update && sudo apt upgrade -y

# Set static IP
sudo nmcli con mod "Wired connection 1" \
  ipv4.addresses 192.168.1.100/24 \
  ipv4.gateway 192.168.1.1 \
  ipv4.dns "1.1.1.1,8.8.8.8" \
  ipv4.method manual
```

### 2. Install Docker & Portainer

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Portainer
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 \
  --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

### 3. Setup Pi-hole (via Docker)

```bash
docker run -d --name pihole \
  -p 53:53/tcp -p 53:53/udp -p 80:80 \
  -e TZ='Asia/Jakarta' \
  -e WEBPASSWORD='supersecret' \
  -v pihole_data:/etc/pihole \
  -v dnsmasq_data:/etc/dnsmasq.d \
  --dns=127.0.0.1 --dns=1.1.1.1 \
  --restart=unless-stopped \
  pihole/pihole:latest
```

Setelah jalan, set DNS router ke `192.168.1.100` — semua device di jaringan otomatis terfilter iklannya.

### 4. Setup Samba File Sharing

```bash
sudo apt install samba -y

# Buat shared folder
sudo mkdir -p /mnt/ssd/shared
sudo chmod 777 /mnt/ssd/shared

# Edit config
sudo nano /etc/samba/smb.conf
```

## Monitoring

Saya setup **Glances** sebagai system monitor yang bisa diakses via web browser:

```bash
docker run -d --name glances \
  -p 61208:61208 \
  --pid=host \
  -v /var/run/docker.sock:/var/run/docker.sock \
  nicolargo/glances:latest \
  -w
```

## Hasil Akhir

| Service | Port | Status |
|---------|------|--------|
| Portainer | 9443 | ✅ Running |
| Pi-hole | 80 | ✅ Running |
| Samba | 445 | ✅ Running |
| Glances | 61208 | ✅ Running |

### Performance

- **CPU**: Idle ~5%, load saat filtering DNS ~15%
- **RAM**: Terpakai ~1.2GB dari 4GB
- **Suhu**: 45-52°C (dengan heatsink pasif, tanpa fan)
- **Uptime**: Sudah 6 hari non-stop tanpa masalah

Pi-hole berhasil memblokir **~30% total DNS queries** — artinya hampir sepertiga request dari semua device di rumah adalah iklan/tracker. 🛡️
