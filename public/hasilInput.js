export function tampilkanHasilInput(data) {
  const rekomendasiDiv = document.getElementById('rekomendasi');
  const rekomendasiText = document.getElementById('rekomendasi-text');
  const inputForm = document.getElementById('input-form-container');
  
  // Format data yang di-input
  const hasilText = `
    <h3>Data Tanaman Anda:</h3>
    <p><strong>Jenis Tanaman:</strong> ${data.jenis}</p>
    <p><strong>Umur Tanaman (Hari):</strong> ${data.umur}</p>
    <p><strong>Kondisi Tanaman:</strong> ${data.kondisi}</p>
    <p><strong>Lokasi Tanaman:</strong> ${data.lokasi}</p>
    <p><strong>Jumlah Air Terakhir (ml):</strong> ${data.air}</p>
    <p><strong>Penyiraman Terakhir:</strong> ${data.terakhir}</p>
  `;
  
  // Menampilkan hasil input
  rekomendasiText.innerHTML = hasilText;

  // Menambahkan gambar tanaman terlebih dahulu
  const gambarTanaman = getGambarTanaman(data.jenis);
  rekomendasiText.innerHTML += `<h5>Gambar Tanaman:</h5><img src="${gambarTanaman}" alt="${data.jenis}" width="200">`;

  // Menambahkan rekomendasi terkait
  const rekomendasi = generateRekomendasi(data);
  rekomendasiText.innerHTML += `<h4>Rekomendasi umum:</h4>`;

  // Menambahkan saran perawatan dan lainnya
  rekomendasiText.innerHTML += `<ul>${rekomendasi}</ul>`;

  // Sembunyikan form input dan tampilkan hasil rekomendasi
  inputForm.style.display = 'none';
  rekomendasiDiv.style.display = 'block';

  // Hapus tombol "Input Ulang" jika sudah ada sebelumnya
  const existingBtn = rekomendasiDiv.querySelector('.kembali-btn');
  if (existingBtn) {
    existingBtn.remove();
  }

  // Menambahkan tombol 'Kembali' untuk input ulang
  const ulangBtn = document.createElement('button');
  ulangBtn.textContent = '🔄 Input Ulang';
  ulangBtn.className = 'kembali-btn';
  ulangBtn.addEventListener('click', () => {
    rekomendasiDiv.style.display = 'none'; // Menyembunyikan rekomendasi
    inputForm.style.display = 'block';     // Menampilkan form input lagi
  });
  
  // Menambahkan tombol ulang ke dalam div rekomendasi
  rekomendasiDiv.appendChild(ulangBtn);
}

// Fungsi untuk generate rekomendasi berdasarkan data yang diinputkan
function generateRekomendasi(data) {
  let rekomendasi = '';

  // Saran perawatan berdasarkan kondisi tanaman
  rekomendasi += `<li><strong>Saran Perawatan:</strong> `;
  if (data.kondisi === 'sehat') {
    rekomendasi += 'Pastikan tanaman tetap terawat dengan baik, perhatikan penyiraman, dan berikan pupuk secara teratur.';
  } else if (data.kondisi === 'sakit') {
    rekomendasi += 'Periksa apakah ada tanda-tanda hama atau penyakit dan sesuaikan jumlah air yang diberikan.';
  }
  rekomendasi += `</li>`;

  // Saran pembibitan berdasarkan umur tanaman
  rekomendasi += `<li><strong>Saran Pembibitan:</strong> `;
  if (data.umur < 30) {
    rekomendasi += 'Tanaman masih muda, jadi perhatikan penyiraman dan pencahayaan yang cukup untuk pertumbuhannya.';
  } else if (data.umur >= 30 && data.umur < 60) {
    rekomendasi += 'Tanaman sudah dewasa, pastikan tanaman mendapatkan nutrisi yang cukup dan sesuai dengan fase pertumbuhannya.';
  } else {
    rekomendasi += 'Tanaman sudah cukup tua, pertimbangkan untuk melakukan pemangkasan dan perawatan lebih lanjut.';
  }
  rekomendasi += `</li>`;

  // Saran pencahayaan berdasarkan lokasi tanaman
  rekomendasi += `<li><strong>Saran Pencahayaan:</strong> `;
  if (data.lokasi === 'indoor') {
    rekomendasi += 'Tanaman di dalam ruangan membutuhkan cahaya alami yang cukup. Pastikan tanaman mendapatkan pencahayaan yang memadai.';
  } else if (data.lokasi === 'outdoor') {
    rekomendasi += 'Tanaman di luar ruangan bisa lebih toleran terhadap cuaca, namun tetap pastikan tanah tetap lembap dan terlindung dari sinar matahari langsung.';
  }
  rekomendasi += `</li>`;

  // Saran pemberian pupuk berdasarkan jumlah air
  rekomendasi += `<li><strong>Saran Pemberian Pupuk:</strong> `;
  if (data.air < 100) {
    rekomendasi += 'Karena jumlah air yang diberikan sedikit, perhatikan jumlah pupuk yang diberikan agar tidak berlebihan.';
  } else {
    rekomendasi += 'Dengan jumlah air yang cukup, Anda bisa memberikan pupuk sesuai dengan jenis tanaman untuk pertumbuhan optimal.';
  }
  rekomendasi += `</li>`;

  return rekomendasi;
}

// Fungsi untuk mendapatkan gambar tanaman berdasarkan jenis
function getGambarTanaman(jenis) {
  // Ini contoh, Anda bisa menambahkan lebih banyak jenis tanaman dan gambar mereka
  const gambarTanaman = {
    'Padi': 'images/padi.jpg',
    'Jagung': 'images/jagung.jpg',
    'Kedelai': 'images/kedelai.jpg',
    'Bayam': 'images/bayam.jpg',
    'Wortel': 'images/wortel.jpg',
    'Kangkung': 'images/kangkung.webp',
    'Melon': 'images/melon.jpg',
    'Semangka': 'images/semangka.jpg',
    'Mangga': 'images/mangga.jpeg'
  };

  // Kembalikan gambar tanaman berdasarkan jenis yang dipilih
  return gambarTanaman[jenis] || 'images/default.jpg'; // Gambar default jika jenis tanaman tidak ada
}
