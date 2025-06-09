const openLink = document.getElementById('open-profile'); 
const closeBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popupOverlay');

const browseCards = document.querySelectorAll('.browse-card');
const popupOverlay = document.getElementById('bookOverlay');
const popupImage = document.getElementById('popupImage');
const popupDescription = document.getElementById('popupDescription');
const btnAddBookmark = document.getElementById('btnAddBookmark');
const btnCancelPopup = document.getElementById('btnCancelPopup');
const bookmarksContainer = document.getElementById('bookmarksContainer');

let currentCardData = null;

const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
bookmarks.push(currentCardData); // assume this holds { title, img, etc. }
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

openLink.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});

browseCards.forEach(card => {
  card.addEventListener('click', () => {
    currentCardData = {
      title: card.dataset.title,
      description: card.dataset.description,
      img: card.dataset.img
    };
    popupImage.src = currentCardData.img;
    popupImage.alt = currentCardData.title;
    popupDescription.textContent = currentCardData.description;
    popupOverlay.classList.add('active');
  });
});

btnAddBookmark.addEventListener('click', () => {
  if (!currentCardData) return;

  const bookmarkCard = document.createElement('div');
  bookmarkCard.className = 'bookmark-card';
  bookmarkCard.innerHTML = `
    <img src="${currentCardData.img}" alt="Banner" class="bookmark-banner" />
    <h3>${currentCardData.title}</h3>
    <div class="progress-container">
      <div class="progress-bar" style="width: 0%;"></div>
    </div>
    <p class="progress-label">0% Complete</p>
  `;
  bookmarksContainer.appendChild(bookmarkCard);

  popupOverlay.classList.remove('active');

  const successPopup = document.getElementById('successPopup');
  successPopup.classList.remove('hidden');
  successPopup.classList.add('show');

  setTimeout(() => {
    successPopup.classList.remove('show');
    successPopup.classList.add('hidden');
  }, 2500);

  currentCardData = null;
});

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('active');
  }
});