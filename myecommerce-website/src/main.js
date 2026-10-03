 import './style.css';

document.querySelector(`#app`).innerHTML = `
<div style="font-family:Arial padding:20px;">
<h1 style="text-align:center;">Katebeauty Fabrics and Tailoring Accessories</h1>
<div style="display:flex;flex-wrap:wrap;gap:20px;max-width:800px;margin:0 auto;">
${fabrics.map(fabric=> `
  <div style="border:1px solid #ddd;padding:15px;width:200px;">
  <img src="${fabric.image}" style="width:100%;height:150px;object-fit:cover;">
  <h3>${fabric.name}</h3>
  <p>${fabric.category}</p>
  <strong>${fabric.price}</strong><br><br>
  <button class="add-btn">Add to Cart</button>
  </div>
  `).join('')}
  </div>
  </div>
  `;  