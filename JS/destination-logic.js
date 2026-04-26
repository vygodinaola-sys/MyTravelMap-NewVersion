// ===== Visited/Favorite =====
function updateDestinationStatus(destinationName, statusType, isActive) {
  const key = `travel_${destinationName}_${statusType}`;
  localStorage.setItem(key, String(isActive));
  console.log(`Saved locally: ${destinationName} ${statusType} is now ${isActive}`);
}

function handleStatus(btn, type) {
  btn.classList.toggle('active');
  const isActive = btn.classList.contains('active');
  const destinationName = document.querySelector('h1')?.innerText?.trim() || 'Unknown';

  if (type === 'Visited') {
    btn.innerText = isActive ? '✓ Visited' : 'Mark as Visited';
    btn.style.backgroundColor = isActive ? '#10b981' : 'transparent';
    btn.style.color = isActive ? 'white' : '#23addb';
  } else {
    btn.innerText = isActive ? '❤️ Favorite' : 'Add to Favorites';
  }

  updateDestinationStatus(destinationName, type, isActive);
}

const API_URL = './Includes/experiences.php';

function destinationName() {
  return document.querySelector('h1')?.innerText?.trim() || 'Unknown';
}


function showMsg(text, ok = true) {
  const el = document.getElementById('expMsg');
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? '#10b981' : '#ef4444';
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function renderReviews(rows) {
  const list = document.getElementById('reviewsList');
  if (!list) return;

  if (!Array.isArray(rows) || rows.length === 0) {
    list.innerHTML = '<p style="opacity:.75">No experiences yet.</p>';
    return;
  }

  list.innerHTML = rows.map(r => {
    const rating = Number(r.rating || 0);
    const stars = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
    return `
      <div style="padding:12px;border:1px solid rgba(0,0,0,.08);border-radius:12px;margin-bottom:10px;background:#fff">
        <div style="display:flex;justify-content:space-between;gap:10px">
          <div>
            <div style="font-weight:700">${escapeHtml(r.title || '')}</div>
            <div style="font-size:.9em;opacity:.8">${escapeHtml(r.name || '')} • ${escapeHtml(r.created_at || '')}</div>
          </div>
          <div style="font-weight:700;white-space:nowrap">${stars}</div>
        </div>
        <p style="margin:10px 0 0;line-height:1.4">${escapeHtml(r.experience || '')}</p>
        ${r.tips ? `<p style="margin:8px 0 0;opacity:.85"><strong>Tips:</strong> ${escapeHtml(r.tips)}</p>` : ''}
      </div>
    `;
  }).join('');
}

async function loadReviews() {
  try {
    const url = `${API_URL}?destination=${encodeURIComponent(destinationName())}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
    const raw = await res.text();

    const data = JSON.parse(raw);
    if (!res.ok || !data.ok) {
      console.error('GET API error raw:', raw);
      return;
    }
    renderReviews(data.reviews || []);
  } catch (e) {
    console.error('loadReviews failed:', e);
  }
}

async function submitForm(form) {
  try {
    showMsg('Saving...', true);

    const fd = new FormData(form);
    fd.append('destination', destinationName());

    const res = await fetch(API_URL, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }});
    const raw = await res.text();

    let data;
    try { data = JSON.parse(raw); } catch (e) {
      console.error('Non-JSON response:', raw);
      showMsg('Server returned non-JSON (check Console/Network).', false);
      return;
    }

    if (!res.ok || !data.ok) {
      console.error('POST API error raw:', raw);
      showMsg(data.error || 'Save failed.', false);
      return;
    }

    showMsg('Saved! ✅', true);
    form.reset();
    await loadReviews();
  } catch (e) {
    console.error('submitForm failed:', e);
    showMsg('Network/Server error (check Console).', false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('experienceForm');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      submitForm(form);
    });
  }
  loadReviews();
});


