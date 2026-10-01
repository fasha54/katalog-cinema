/**
 * SINEMA - Script Interaktivitas Vanilla JavaScript
 * Sesuai kurikulum Pemrograman Web 1 (Universitas Pamulang)
 * 
 * Fitur:
 * 1. Live Search & Filter Kategori Film (film.html)
 * 2. Formulir Pemesanan Tiket & Langganan Interaktif dengan Live Calculator (kontak.html)
 * 3. Pop-up Modal Box Trailer (index.html & film.html)
 * 4. Sistem Rating Bintang & Ulasan Pengunjung dengan LocalStorage (film.html)
 */

document.addEventListener('DOMContentLoaded', function () {
  initModalTrailer();
  initFilmFilter();
  initOrderForm();
  initReviews();
});

/* ==========================================================================
   FITUR 1: PENCARIAN & FILTER GENRE FILM
   ========================================================================== */
function initFilmFilter() {
  const searchInput = document.getElementById('cariFilm');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const films = document.querySelectorAll('.film[data-genre]');
  const countBadge = document.getElementById('jumlahFilm');
  const emptyState = document.getElementById('pesanKosong');

  if (!searchInput && filterBtns.length === 0) return;

  let activeGenre = 'all';

  function applyFilter() {
    const keyword = (searchInput ? searchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    films.forEach(film => {
      const title = (film.getAttribute('data-title') || '').toLowerCase();
      const genre = (film.getAttribute('data-genre') || '').toLowerCase();

      const matchSearch = title.includes(keyword) || genre.includes(keyword);
      const matchGenre = activeGenre === 'all' || genre.includes(activeGenre);

      if (matchSearch && matchGenre) {
        film.style.display = '';
        visibleCount++;
      } else {
        film.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `Menampilkan ${visibleCount} dari ${films.length} film`;
    }

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeGenre = this.getAttribute('data-genre').toLowerCase();
      applyFilter();
    });
  });
}

/* ==========================================================================
   FITUR 2: FORMULIR PEMESANAN INTERAKTIF & KALKULATOR HARGA
   ========================================================================== */
function initOrderForm() {
  const orderForm = document.getElementById('formPemesanan');
  if (!orderForm) return;

  const tipeSelect = document.getElementById('orderTipe');
  const itemSelect = document.getElementById('orderItem');
  const qtyInput = document.getElementById('orderQty');
  const ringkasanItem = document.getElementById('ringkasanItem');
  const ringkasanHarga = document.getElementById('ringkasanHarga');
  const ringkasanTotal = document.getElementById('ringkasanTotal');

  // Opsi item berdasarkan tipe
  const dataPaket = [
    { id: 'reguler', nama: 'Paket Reguler (1 Bulan)', harga: 5 },
    { id: 'premium', nama: 'Paket Premium (1 Bulan)', harga: 9 },
    { id: 'vip', nama: 'Paket VIP (1 Bulan)', harga: 15 }
  ];

  const dataTiket = [
    { id: 'laskar-pelangi', nama: 'Tiket: Laskar Pelangi', harga: 7 },
    { id: 'aadc', nama: 'Tiket: Ada Apa Dengan Cinta?', harga: 6 },
    { id: 'shawshank', nama: 'Tiket: The Shawshank Redemption', harga: 8 },
    { id: 'interstellar', nama: 'Tiket: Interstellar', harga: 12 }
  ];

  function populateItems(tipe) {
    const list = tipe === 'paket' ? dataPaket : dataTiket;
    itemSelect.innerHTML = '';
    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.setAttribute('data-harga', item.harga);
      opt.textContent = `${item.nama} - $${item.harga}`;
      itemSelect.appendChild(opt);
    });
    updateKalkulasi();
  }

  function updateKalkulasi() {
    const selectedOpt = itemSelect.options[itemSelect.selectedIndex];
    if (!selectedOpt) return;

    const harga = parseFloat(selectedOpt.getAttribute('data-harga') || 0);
    const qty = parseInt(qtyInput.value) || 1;
    const total = harga * qty;

    if (ringkasanItem) ringkasanItem.textContent = selectedOpt.textContent.split(' - ')[0];
    if (ringkasanHarga) ringkasanHarga.textContent = `$${harga} × ${qty}`;
    if (ringkasanTotal) ringkasanTotal.textContent = `$${total}`;
  }

  // Cek parameter URL dari halaman Home (misal ?paket=premium)
  const urlParams = new URLSearchParams(window.location.search);
  const paketParam = urlParams.get('paket');

  if (paketParam) {
    tipeSelect.value = 'paket';
    populateItems('paket');
    const matchedOpt = Array.from(itemSelect.options).find(opt => opt.value === paketParam);
    if (matchedOpt) {
      itemSelect.value = paketParam;
    }
  } else {
    populateItems(tipeSelect.value);
  }

  tipeSelect.addEventListener('change', function () {
    populateItems(this.value);
  });

  itemSelect.addEventListener('change', updateKalkulasi);
  qtyInput.addEventListener('input', updateKalkulasi);

  // Submit Handler
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nama = document.getElementById('orderNama').value.trim();
    const email = document.getElementById('orderEmail').value.trim();
    const item = ringkasanItem.textContent;
    const total = ringkasanTotal.textContent;

    if (!nama || !email) {
      alert('Mohon lengkapi nama dan alamat email Anda.');
      return;
    }

    const konfirmasi = confirm(
      `KONFIRMASI PESANAN SINEMA:\n\n` +
      `Nama: ${nama}\n` +
      `Email: ${email}\n` +
      `Pilihan: ${item}\n` +
      `Total Pembayaran: ${total}\n\n` +
      `Lanjutkan untuk membuat tagihan pesanan?`
    );

    if (konfirmasi) {
      alert(
        `Terima kasih, ${nama}!\n` +
        `Pesanan ${item} (${total}) berhasil dibuat.\n` +
        `Instruksi pembayaran resmi telah dikirimkan ke email ${email}.`
      );
      orderForm.reset();
      populateItems('paket');
    }
  });
}

/* ==========================================================================
   FITUR 3: MODAL BOX POP-UP TRAILER
   ========================================================================== */
function initModalTrailer() {
  const modal = document.getElementById('modalTrailer');
  if (!modal) return;

  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalJudul');
  const closeBtn = modal.querySelector('.modal-close');

  function openTrailer(src, title) {
    if (modalTitle) modalTitle.textContent = title || 'Cuplikan Trailer';
    if (modalVideo) {
      modalVideo.src = src;
      modalVideo.play().catch(() => {});
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeTrailer() {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Tombol buka trailer (bisa dipicu dari atribut data-trailer)
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-trailer-src]');
    if (trigger) {
      e.preventDefault();
      const src = trigger.getAttribute('data-trailer-src');
      const title = trigger.getAttribute('data-trailer-title');
      openTrailer(src, title);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeTrailer);
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeTrailer();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeTrailer();
    }
  });
}

/* ==========================================================================
   FITUR 4: SISTEM RATING BINTANG & ULASAN PENGUNJUNG
   ========================================================================== */
function initReviews() {
  const reviewContainers = document.querySelectorAll('.review-box');
  if (reviewContainers.length === 0) return;

  const defaultReviews = {
    'laskar-pelangi': [
      { user: 'Budi Santoso', rating: 5, date: '28 Sep 2026', comment: 'Film yang sangat menginspirasi generasi muda untuk pantang menyerah!' },
      { user: 'Siti Rahma', rating: 5, date: '29 Sep 2026', comment: 'Soundtrack Nidji dan pemandangan Belitung sangat memorable.' }
    ],
    'aadc': [
      { user: 'Dian Permata', rating: 4, date: '25 Sep 2026', comment: 'Puisi Rangga dan kisah romansa SMA yang tidak pernah bosan ditonton ulang.' }
    ],
    'shawshank': [
      { user: 'Reza Pratama', rating: 5, date: '20 Sep 2026', comment: 'Masterpiece terbaik sepanjang masa tentang arti harapan dan persahabatan sejati.' }
    ],
    'interstellar': [
      { user: 'Ahmad Fauzi', rating: 5, date: '22 Sep 2026', comment: 'Visual luar angkasa dan scoring musik Hans Zimmer tiada duanya!' }
    ]
  };

  reviewContainers.forEach(container => {
    const filmId = container.getAttribute('data-film-id');
    const starInput = container.querySelector('.star-input');
    const reviewList = container.querySelector('.review-list');
    const form = container.querySelector('.review-form');
    let selectedRating = 5;

    // Load data dari localStorage jika ada
    const storageKey = 'sinema_reviews_' + filmId;
    let reviews = [];
    try {
      const saved = localStorage.getItem(storageKey);
      reviews = saved ? JSON.parse(saved) : (defaultReviews[filmId] || []);
    } catch (e) {
      reviews = defaultReviews[filmId] || [];
    }

    function renderReviews() {
      if (!reviewList) return;
      if (reviews.length === 0) {
        reviewList.innerHTML = '<p class="review-empty">Belum ada ulasan. Jadilah yang pertama memberikan ulasan!</p>';
        return;
      }
      reviewList.innerHTML = reviews.map(r => `
        <div class="review-card">
          <div class="review-top">
            <span class="review-user">${escapeHtml(r.user)}</span>
            <span class="review-stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</span>
          </div>
          <p class="review-comment">${escapeHtml(r.comment)}</p>
        </div>
      `).join('');
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Interaktivitas bintang input
    if (starInput) {
      const stars = starInput.querySelectorAll('.star');
      function highlightStars(count) {
        stars.forEach((s, idx) => {
          if (idx < count) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      }
      highlightStars(selectedRating);

      stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
          const val = parseInt(this.getAttribute('data-val'));
          highlightStars(val);
        });
        star.addEventListener('click', function () {
          selectedRating = parseInt(this.getAttribute('data-val'));
          highlightStars(selectedRating);
        });
      });

      starInput.addEventListener('mouseleave', function () {
        highlightStars(selectedRating);
      });
    }

    // Submit review
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const userInput = form.querySelector('.review-user-input');
        const textInput = form.querySelector('.review-text-input');

        const userVal = userInput.value.trim();
        const textVal = textInput.value.trim();

        if (!userVal || !textVal) {
          alert('Mohon masukkan nama dan ulasan Anda.');
          return;
        }

        const newReview = {
          user: userVal,
          rating: selectedRating,
          date: 'Hari ini',
          comment: textVal
        };

        reviews.unshift(newReview);
        try {
          localStorage.setItem(storageKey, JSON.stringify(reviews));
        } catch (e) {}

        renderReviews();
        form.reset();
        selectedRating = 5;
        if (starInput) {
          const stars = starInput.querySelectorAll('.star');
          stars.forEach(s => s.classList.add('active'));
        }
      });
    }

    renderReviews();
  });
}
