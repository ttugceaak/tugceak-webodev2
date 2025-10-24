import React from "react";
import AramaCubugu from "./AramaCubugu.jsx";
import KategoriFiltre from "./KategoriFiltre";
import KitapListe from "./KitapListe";
import FavoriPaneli from "./FavoriPaneli";


const baslangicKitaplar = [
  {
    id: 101,
    baslik: "Derin Öğrenme Temelleri",
    yazar: "Andrew Ng",
    kategori: "Yapay Zeka",
    favorideMi: true,
  },
  {
    id: 102,
    baslik: "Sistem Programcılığı",
    yazar: "Linus Torvalds",
    kategori: "Sistem",
    favorideMi: true,
  },
  {
    id: 103,
    baslik: "Kriptografi ve Güvenlik",
    yazar: "Bruce Schneier",
    kategori: "Güvenlik",
    favorideMi: false,
  },
  {
    id: 104,
    baslik: "Mikroservis Mimarileri",
    yazar: "Sam Newman",
    kategori: "Yazılım",
    favorideMi: false,
  },
  {
    id: 105,
    baslik: "Design Patterns",
    yazar: "Erich Gamma",
    kategori: "Yazılım",
    favorideMi: false,
  },
];

const getStorageItem = (key, defaultValue) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem) : defaultValue;
};

function App() {
  const [kitaplar, setKitaplar] = React.useState(
    getStorageItem("kitaplar_v1", baslangicKitaplar)
  );

  const [aramaMetni, setAramaMetni] = React.useState(
    getStorageItem("aramaMetni_v1", "")
  );

  const [kategori, setKategori] = React.useState("Tümü");

  React.useEffect(() => {
    localStorage.setItem("aramaMetni_v1", JSON.stringify(aramaMetni));
  }, [aramaMetni]);

  React.useEffect(() => {
    localStorage.setItem("kitaplar_v1", JSON.stringify(kitaplar));
  }, [kitaplar]);

  const handleArama = (event) => {
    setAramaMetni(event.target.value);
  };

  const handleKategori = (event) => {
    setKategori(event.target.value);
  };

  const handleFavoriToggle = (id) => {
    setKitaplar(
      kitaplar.map((kitap) =>
        kitap.id === id ? { ...kitap, favorideMi: !kitap.favorideMi } : kitap
      )
    );
  };

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
    const aramaKosulu =
      kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());

    const kategoriKosulu = kategori === "Tümü" || kitap.kategori === kategori;

    return aramaKosulu && kategoriKosulu;
  });

  const favoriKitaplar = kitaplar.filter((kitap) => kitap.favorideMi);

  return (
    <>
      <h1>Bilgisayar Bilimleri Kütüphanesi</h1>

      <div className="kontrol-paneli">
        <AramaCubugu aramaMetni={aramaMetni} onSearch={handleArama} />
        <KategoriFiltre
          kategori={kategori}
          onKategoriChange={handleKategori}
        />
      </div>

      <div className="ana-icerik">
        <KitapListe
          kitaplar={filtrelenmisKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />
        <FavoriPaneli
          favoriler={favoriKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />
      </div>
    </>
  );
}

export default App;