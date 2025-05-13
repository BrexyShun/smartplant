document.addEventListener('DOMContentLoaded', () => {
  const kategoriContainer = document.querySelector('.kategori-tanaman');
  const inputForm = document.getElementById('input-form-container');
  const kembaliBtn = document.getElementById('kembali-btn');
  const jenisSelect = document.getElementById('jenis');
  const rekomendasiDiv = document.getElementById('rekomendasi');
  const rekomendasiText = document.getElementById('rekomendasi-text');

  const kategoriData = {
    'tanaman-pangan': ['Padi', 'Jagung', 'Kedelai'],
    'tanaman-sayuran': ['Bayam', 'Wortel', 'Kangkung'],
    'tanaman-buah': ['Melon', 'Semangka', 'Mangga']
  };

  function bukaFormDenganKategori(kategoriId) {
    kategoriContainer.style.display = 'none';
    rekomendasiDiv.style.display = 'none'; // TAMBAHAN: pastikan rekomendasi disembunyikan jika kembali ke form
    inputForm.style.display = 'block';
    isiDropdownJenis(kategoriId);
  }

  function isiDropdownJenis(kategoriId) {
    jenisSelect.innerHTML = '<option value="">--Pilih Jenis--</option>';
    kategoriData[kategoriId].forEach((jenis) => {
      const option = document.createElement('option');
      option.value = jenis;
      option.textContent = jenis;
      jenisSelect.appendChild(option);
    });
  }

  document.getElementById('tanaman-pangan').addEventListener('click', () => {
    bukaFormDenganKategori('tanaman-pangan');
  });

  document.getElementById('tanaman-sayuran').addEventListener('click', () => {
    bukaFormDenganKategori('tanaman-sayuran');
  });

  document.getElementById('tanaman-buah').addEventListener('click', () => {
    bukaFormDenganKategori('tanaman-buah');
  });

  kembaliBtn.addEventListener('click', () => {
    inputForm.style.display = 'none';
    rekomendasiDiv.style.display = 'none'; // TAMBAHAN
    kategoriContainer.style.display = 'flex';
  });

  const formTanaman = document.getElementById('form-tanaman');
  formTanaman.addEventListener('submit', function (e) {
    e.preventDefault();
    const jenis = jenisSelect.value;
    const umur = document.getElementById('umur').value;
    const kondisi = document.getElementById('kondisi').value;
    const lokasi = document.getElementById('lokasi').value;
    const air = document.getElementById('jumlah-air').value;
    const terakhir = document.getElementById('penyiraman-terakhir').value;

    const dataTanaman = {
      jenis,
      umur,
      kondisi,
      lokasi,
      air,
      terakhir
    };

    // Panggil fungsi tampilkanHasilInput yang ada di hasilInput.js untuk menampilkan hasil input dan rekomendasi
    tampilkanHasilInput(dataTanaman);

  });

});
