import React from "react";

function KategoriFiltre({ kategori, onKategoriChange }) {
  return (
    <div>
      <label htmlFor="kategori">Kategoriye göre filtrele:</label>
      <select id="kategori" value={kategori} onChange={onKategoriChange}>
        <option value="Tümü">Tümü</option>
        <option value="Yapay Zeka">Yapay Zeka</option>
        <option value="Sistem">Sistem</option>
        <option value="Güvenlik">Güvenlik</option>
        <option value="Yazılım">Yazılım</option>
      </select>
    </div>
  );
}

export default KategoriFiltre;