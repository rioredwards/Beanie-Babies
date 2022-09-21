export function renderBeanieBaby(beanieBaby) {
    const li = document.createElement('li');
    li.classList.add('card');

    const img = document.createElement('img');
    img.src = `https://flagcdn.com/72x54/${beanieBaby.iso2.toLowerCase()}.png`;
    img.alt = beanieBaby.name;

    const h2 = document.createElement('h2');
    h2.textContent = beanieBaby.name;

    const p = document.createElement('p');
    p.textContent = beanieBaby.continent;

    li.append(h2, img, p);

    return li;
}
