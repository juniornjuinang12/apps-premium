import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

const appData = {
  1: {
    nom: "CapCut Pro PC",
    titre: "CapCut Pro à vie",
    desc: "CapCut Pro PC est une version avancée de l’éditeur vidéo populaire. Éditez vos vidéos sans filigrane, profitez de toutes les fonctionnalités premium et exportez en haute qualité.",
    image: "/capcut.png",
    taille: "250 Mo",
    prix: "1000 F",
    features: [
      "Sans filigrane",
      "Transitions et effets premium",
      "Exportation jusqu’à 4K",
      "Bibliothèque musicale intégrée",
      "Interface simple et intuitive"
    ],
    lien: "/capcut_pro_windows.zip"
  }
};

// 🌍 Mapping des pays autorisés
const countryConfig = {
  CM: { name: "Cameroun", dialCode: "+237" },
  CI: { name: "Côte d’Ivoire", dialCode: "+225" },
  SN: { name: "Sénégal", dialCode: "+221" },
  TG: { name: "Togo", dialCode: "+228" },
  BJ: { name: "Bénin", dialCode: "+229" }
};

export default function AppDetail() {
  const { id } = useParams();
  const app = appData[id];

  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [userCountry, setUserCountry] = useState("CM");
  const [loading, setLoading] = useState(false);

  // 🌍 Détection du pays via IP
  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data && countryConfig[data.country]) {
          setUserCountry(data.country);
        }
      } catch (err) {
        console.error("Erreur détection pays:", err);
      }
    }
    detectCountry();
  }, []);

  if (!app) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>❌ Application non trouvée</h2>
        <Link to="/" style={{ color: "#ff7a00" }}>⬅ Retour</Link>
      </div>
    );
  }

  // ✅ Paiement unitaire (1000F)
  const handlePayment = async () => {
    const dialCode = countryConfig[userCountry]?.dialCode || "";
    const fullPhone = dialCode + phone.replace(/^0+/, "");

    if (!/^\+\d{8,15}$/.test(fullPhone) || !paymentMethod) {
      setToastType("error");
      setToastMessage("⚠️ Entrez un numéro valide et choisissez un moyen de paiement !");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    const payload = {
      apikey: "136400783567e7acb1ee0d97.51337281",
      site_id: "105890963",
      transaction_id: Date.now().toString(),
      amount: 1000,
      currency: "XAF",
      description: `Paiement pour ${app.nom}`,
      notify_url: "https://webhook.site/xxxxxxxx",
      return_url: "https://webhook.site/xxxxxxxx",
      channels: "ALL",
      lang: "FR",
      customer_name: "Client",
      customer_surname: "CapCut",
      customer_phone_number: fullPhone,
      customer_email: "client@example.com",
      customer_address: "Adresse",
      customer_city: countryConfig[userCountry]?.name || "Douala",
      customer_country: userCountry,
      customer_state: userCountry,
      customer_zip_code: "00000"
    };

    setLoading(true);
    try {
      const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("📥 Réponse CinetPay:", data);

      if (data.code === "201" && data.data.payment_url) {
        window.location.href = data.data.payment_url;
      } else {
        setToastType("error");
        setToastMessage("❌ Erreur d'initialisation paiement !");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setToastType("error");
      setToastMessage("❌ Impossible de contacter CinetPay.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Paiement pack complet (5000F)
  const handlePackPayment = async () => {
    const payload = {
      apikey: "136400783567e7acb1ee0d97.51337281",
      site_id: "105890963",
      transaction_id: "PACK-" + Date.now().toString(),
      amount: 5000,
      currency: "XAF",
      description: "Paiement pack complet (toutes applications)",
      notify_url: "https://webhook.site/xxxxxxxx",
      return_url: "https://webhook.site/xxxxxxxx",
      channels: "ALL",
      lang: "FR",
      customer_name: "Client",
      customer_surname: "Pack",
      customer_phone_number: "+237600000000",
      customer_email: "client@example.com",
      customer_address: "Adresse",
      customer_city: "Douala",
      customer_country: "CM",
      customer_state: "CM",
      customer_zip_code: "00000"
    };

    setLoading(true);
    try {
      const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("📥 Réponse CinetPay pack:", data);

      if (data.code === "201" && data.data.payment_url) {
        window.location.href = data.data.payment_url;
      } else {
        alert("❌ Erreur lors de l'achat du pack !");
      }
    } catch (error) {
      console.error("Erreur API:", error);
      alert("❌ Impossible de contacter CinetPay.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail-page">
      {/* ✅ Bouton Acheter Pack en haut à droite */}
      <div className="pack-button-container">
        <button className="btn-pack" onClick={handlePackPayment}>
          🎁 Acheter le pack complet – 5000F
        </button>
      </div>

      <div className="logo-row">
        <div className="logo-card">
          <img src={app.image} alt={app.nom} />
        </div>
        <h2 className="app-title">{app.titre}</h2>
      </div>

      <div className="price-promo">
        🔥 Promotion spéciale : <span>{app.prix}</span> seulement !
      </div>

      <div className="detail-main-card">
        <h1>{app.nom}</h1>
        <p>{app.desc}</p>
      </div>

      <div className="detail-info-card">
        <div className="detail-price-tag">{app.prix}</div>
        <h3>📦 Informations</h3>
        <p><strong>Taille :</strong> {app.taille}</p>
        <h3>✨ Fonctionnalités principales</h3>
        <ul>
          {app.features.map((f, index) => <li key={index}>{f}</li>)}
        </ul>
        <div className="detail-actions">
          <button className="btn-download" onClick={() => setShowModal(true)}>
            📥 Télécharger maintenant
          </button>
          <Link className="btn-back" to="/">⬅ Retour aux applications</Link>
        </div>
      </div>

      {/* ✅ Modal paiement individuel */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>💳 Paiement requis</h2>
            <p>Pays détecté : <strong>{countryConfig[userCountry]?.name || "Cameroun"}</strong></p>
            <div className="phone-input">
              <span>{countryConfig[userCountry]?.dialCode}</span>
              <input
                type="tel"
                placeholder="Numéro (sans indicatif)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
            </div>
            <select
              className="input-field"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Choisir un moyen de paiement --</option>
              <option value="Orange Money">Orange Money 📱</option>
              <option value="MTN Mobile Money">MTN Mobile Money 📱</option>
              <option value="Carte Bancaire">Carte Bancaire 💳</option>
            </select>
            <button className="btn-download" onClick={handlePayment}>✅ Payer {app.prix}</button>
            <button className="btn-back" onClick={() => setShowModal(false)}>❌ Annuler</button>
          </div>
        </div>
      )}

      {/* ✅ Loader affiché pendant appel API */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>⏳ Redirection vers CinetPay...</p>
        </div>
      )}

      {toastMessage && <div className={`toast ${toastType}`}>{toastMessage}</div>}
    </div>
  );
}
