// Shared navigation + optional character modal wiring
(function(){
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = navMenu ? Array.from(navMenu.querySelectorAll('a')) : [];

  function closeMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (path === href || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const grid = document.getElementById('charactersGrid');
  const modal = document.getElementById('charModal');
  const modalImg = document.getElementById('charModalImg');
  const modalTitle = document.getElementById('charTitle');
  const modalNote = document.getElementById('charNote');
  const modalClose = document.getElementById('charModalClose');

  if (grid && modal && modalImg && modalTitle && modalNote && modalClose) {
    const CHARACTERS = [
      { id:'don', name:'Don Quixote', role:'The Idealist Knight', traits:['Noble','Poetic','Deluded'], note:'The novel’s tragicomic hero. He seeks to revive knight-errantry in a world devoid of chivalric virtues. Honest, dignified, proud, and idealistic, he sees the world not as it is but as he imagines it. He begins as a ridiculous figure and ends as a wise but broken old man.', img:'images/dondon.png' },
      { id:'sancho', name:'Sancho Panza', role:'The Loyal Squire', traits:['Practical','Loyal','Witty'], note:'A peasant laborer—greedy but kind—who becomes Don Quixote’s squire. His folktale wisdom and earthy realism contrast with Don Quixote’s idealism. He is loyal, humorous, and eventually grows confident and philosophical.', img:'images/sancho.png' },
      { id:'rocinante', name:'Rocinante', role:'Don Quixote’s Horse', traits:['Faithful','Slow','Worn-out'], note:'Don Quixote’s old, skinny horse. Rocinante is as exhausted and noble as his master, following him faithfully through every misadventure.', img:'images/horse.jpg' },
      { id:'dulcinea', name:'Dulcinea del Toboso', role:'Idealized Lady', traits:['Imagined','Symbolic'], note:'A simple peasant woman idealized by Don Quixote as his perfect lady. She never appears physically, but she motivates all of Quixote’s quests.', img:'images/dulcinea.png' },
      { id:'dapple', name:'Dapple', role:'Sancho’s Donkey', traits:['Loyal','Gentle'], note:'Sancho Panza’s beloved donkey. Dapple is loyal and dependable, and his repeated disappearance becomes a humorous and symbolic theme in the story.', img:'images/dapple.jpg' },
      { id:'duke', name:'Duke & Duchess', role:'Cruel Mockers', traits:['Manipulative','Playful'], note:'Wealthy nobles who amuse themselves by playing elaborate pranks on Don Quixote and Sancho. Their cruelty and boredom contrast with Quixote’s noble intentions.', img:'images/duke&duch.jpg' },
      { id:'samson', name:'Sampson Carrasco', role:'The Clever Foiler', traits:['Sarcastic','Ambitious'], note:'A student from Don Quixote’s village who first mocks him, then fights him disguised as the Knight of the Mirrors. After losing, he obsessively seeks revenge.', img:'images/sanson.png' },
      { id:'teresa', name:'Teresa Panza', role:'Sancho’s Wife', traits:['Wise','Practical','Honest'], note:'Sancho Panza’s good-hearted wife. Speaking in proverbs like her husband, she is wise and grounded. Though a bit greedy, she supports Sancho faithfully.', img:'images/teresa.png' },
      { id:'benengeli', name:'Cide Hamete Benengeli', role:'Fictional Historian', traits:['Critical','Sarcastic'], note:'A fictional Moorish historian whose manuscripts Cervantes "translates." Cervantes uses him to explore authorship, history, and truth in storytelling.', img:'images/hamete.jpeg' },
      { id:'cervantes', name:'Miguel de Cervantes', role:'Narrator / Translator', traits:['Playful','Self-referential'], note:'Cervantes appears as the supposed translator of Benengeli’s manuscript. His interruptions create a playful, meta-literary tone and question the nature of fiction.', img:'images/cervantes.jpg' },
      { id:'altisidora', name:'Altisidora', role:'Maid of the Duchess', traits:['Bratty','Teasing'], note:'The Duchess’s mischievous maid who pretends to be in love with Don Quixote, mocking his romantic idealism.', img:'images/altisidora.jpg' },
      { id:'priest', name:'The Priest', role:'Quixote’s Friend', traits:['Concerned','Contradictory'], note:'A friend of Don Quixote who disapproves of chivalric books but secretly enjoys them. He worries about Quixote yet finds humor in his madness.', img:'images/priest.jpg' },
      { id:'barber', name:'The Barber', role:'Friend Who Helps the Priest', traits:['Skeptical','Supportive'], note:'Another friend of Don Quixote. He recognizes Quixote’s madness and helps the priest plan interventions to stop his knightly pursuits.', img:'images/barber.jpg' },
      { id:'cardenio', name:'Cardenio', role:'The Mad Lover', traits:['Passionate','Wronged'], note:'A noble man driven into madness by his wife Lucinda’s betrayal and Ferdinand’s treachery. Represents the extreme turmoil of romantic love.', img:'images/cardenio.png' },
      { id:'lucinda', name:'Lucinda', role:'Cardenio’s Love', traits:['Beautiful','Innocent'], note:'Cardenio’s faithful and gentle lover. Docile and courtly, she becomes the center of the tragic romantic conflict.', img:'images/lucinda.jpg' },
      { id:'fernando', name:'Ferdinand', role:'Deceptive Duke', traits:['Proud','Cruel'], note:'An arrogant young nobleman who steals Lucinda from Cardenio without remorse, triggering the lovers’ suffering.', img:'images/fernando.jpg' },
      { id:'dorothea', name:'Dorothea', role:'Faithful Lover', traits:['Clever','Determined'], note:'Ferdinand’s forsaken lover. Courageous and cunning, she disguises herself and fights to reclaim her honor and dignity.', img:'images/dorothea.jpg' },
      { id:'trifaldi', name:'Countess Trifaldi', role:'Comic Impersonation', traits:['Ridiculous','Exaggerated'], note:'A fictional damsel in distress impersonated by the Duke’s steward. Her absurd tale launches Don Quixote and Sancho on the wooden horse adventure.', img:'images/trifaldi.jpg' },
      { id:'gines', name:'Gines de Pasamonte', role:'Ungrateful Criminal', traits:['Cunning','Humorous'], note:'A galley slave freed by Don Quixote who later causes trouble. His behavior questions Quixote’s ideas of justice and mercy.', img:'images/gines.jpg' },
      { id:'roque', name:'Roque Guinart', role:'Chivalrous Bandit', traits:['Generous','Conflicted'], note:'A noble-hearted outlaw who believes in justice but kills a follower for challenging him. A complex mix of honor and violence.', img:'images/roque.jpg' }
    ];

    function openCharModal(c) {
      modalImg.src = c.img;
      modalTitle.textContent = `${c.name} — ${c.role}`;
      modalNote.textContent = c.note;
      modal.classList.remove('hidden');
    }

    function closeCharModal() {
      modal.classList.add('hidden');
    }

    function renderCharacters() {
      grid.innerHTML = '';
      CHARACTERS.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.style.setProperty('--i', idx);

        const traitChips = c.traits.map(t => `<span class="char-pill">${t}</span>`).join('');

        card.innerHTML = `
          <div class="char-card-imgbox">
            <img src="${c.img}" class="char-card-img" alt="${c.name}">
            <span class="char-glint" aria-hidden="true"></span>
          </div>
          <div class="char-card-body">
            <div class="char-topline">
              <span class="char-tag">${c.role}</span>
              <span class="char-trait-count">${c.traits.length} traits</span>
            </div>
            <h3 class="char-card-name">${c.name}</h3>
            <div class="char-traits">${traitChips}</div>
            <div class="char-card-foot">
              <span class="char-action">View bio</span>
              <span class="char-chevron" aria-hidden="true">↗</span>
            </div>
          </div>
        `;

        card.onclick = () => openCharModal(c);
        grid.appendChild(card);
      });
    }

    modalClose.addEventListener('click', closeCharModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeCharModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeCharModal();
    });

    renderCharacters();
  }
})();
