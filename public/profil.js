// profil.js
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    window.location.href = 'login.html'; // redirect kalau belum login
  }

  const fotoProfil = document.getElementById('foto-profil');
  const fotoUpload = document.getElementById('foto-upload');
  const form = document.getElementById('profil-form');
  const namaInput = document.getElementById('nama');
  const emailInput = document.getElementById('email');
  const bioInput = document.getElementById('bio');
  const btnEdit = document.getElementById('btn-edit');
  const btnCancel = document.getElementById('btn-cancel');
  const backBtn = document.getElementById('back-btn');

  let editMode = false;

  // Load profil dari localStorage
  function loadProfil() {
    const profil = localStorage.getItem(`profil_${user}`);
    if (profil) {
      const data = JSON.parse(profil);
      namaInput.value = data.nama || '';
      emailInput.value = data.email || '';
      bioInput.value = data.bio || '';
      if (data.foto) {
        fotoProfil.src = data.foto;
      }
    }
  }

  // Simpan profil ke localStorage
  function simpanProfil(data) {
    localStorage.setItem(`profil_${user}`, JSON.stringify(data));
  }

  // Set input bisa diedit atau readonly
  function setEditable(mode) {
    namaInput.readOnly = !mode;
    emailInput.readOnly = !mode;
    bioInput.readOnly = !mode;
    fotoUpload.style.display = mode ? 'inline-block' : 'none';

    if (mode) {
      btnEdit.textContent = 'Simpan';
      btnCancel.style.display = 'inline-block';
    } else {
      btnEdit.textContent = 'Edit';
      btnCancel.style.display = 'none';
    }
  }

  // Reset form ke data profil saat ini
  function resetForm() {
    loadProfil();
    setEditable(false);
    editMode = false;
  }

  // Event: Klik foto profil untuk upload foto
  fotoProfil.addEventListener('click', () => {
    if (editMode) {
      fotoUpload.click();
    }
  });

  // Event: Upload foto, ubah preview
  fotoUpload.addEventListener('change', () => {
    const file = fotoUpload.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        fotoProfil.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Event: Klik tombol edit/simpan
  btnEdit.addEventListener('click', () => {
    if (!editMode) {
      // Masuk mode edit
      editMode = true;
      setEditable(true);
    } else {
      // Simpan data
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const dataProfil = {
        nama: namaInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioInput.value.trim(),
        foto: fotoProfil.src
      };
      simpanProfil(dataProfil);
      alert('Profil berhasil disimpan!');
      editMode = false;
      setEditable(false);
    }
  });

  // Event: Klik tombol batal
  btnCancel.addEventListener('click', () => {
    if (editMode) {
      if (confirm('Batalkan perubahan? Semua perubahan akan hilang.')) {
        resetForm();
      }
    }
  });

  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Init
  loadProfil();
  setEditable(false);
});
