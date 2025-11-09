
async function loadProducts(){
  try{
    const res = await fetch('./data/products.json');
    const items = await res.json();
    const grid = document.querySelector('#products-grid');
    if(!grid) return;
    grid.innerHTML = items.map(p => `
      <div class="card">
        <img loading="lazy" src="${p.image || './assets/placeholder.svg'}" alt="${p.name}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
          <strong>${p.name}</strong>
          <span class="badge">₹${p.price.toLocaleString('en-IN')}</span>
        </div>
        <div class="small" style="margin-top:6px">${p.brand}</div>
      </div>
    `).join('');
  }catch(e){console.error(e);}
}
document.addEventListener('DOMContentLoaded', loadProducts);
