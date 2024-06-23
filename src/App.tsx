import './App.css';
import '@twa-dev/sdk';
import { Telegram } from "@twa-dev/types";
import React from 'react';
// import { b64toBlob } from './hooks/base64';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function App() {
  const [testo, setTesto] = React.useState('');
  const [caselle, setCaselle] = React.useState<{ text: string, callback: string }[]>([]);

  const inviaMessaggio = () => {
    const data = {
      caption: testo,
      callback: caselle,
    };
    // const data = `caption: ${testo}, username: ${username}`
    window.Telegram.WebApp.sendData(JSON.stringify(data));
  };

  const aggiungiCasella = () => {
    setCaselle([...caselle, { text: '', callback: '' }]);
  };

  const rimuoviCasella = () => {
    setCaselle(caselle.slice(0, -1));
  };

  const handleCasellaChange = (index: number, field: 'text' | 'callback', value: string) => {
    const newCaselle = caselle.map((casella, i) => 
      i === index ? { ...casella, [field]: value } : casella
    );
    setCaselle(newCaselle);
  };
  return (
    <div>
      {/* Casella di input per l'id o l'username del canale */}
      {/* Casella di input per il testo */}
      <textarea
        placeholder="Scrivi qui il testo"
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        className="input-caption"
      />

      {/* Bottone di invio post */}
      <button onClick={inviaMessaggio}>Invia Post</button>

      {/* Aggiungi o rimuovi caselle */}
      <fieldset id="bottoniContainer">
        <legend>Aggiungi o rimuovi caselle:</legend>
        <button type="button" onClick={aggiungiCasella}>+</button>
        <button type="button" onClick={rimuoviCasella}>-</button>
      </fieldset>

      {caselle.map((casella, index) => (
        <div key={index} className="casella">
          <input
            type="text"
            placeholder={`Testo ${index + 1}`}
            value={casella.text}
            onChange={(e) => handleCasellaChange(index, 'text', e.target.value)}
            className="input-casella"
          />
          <input
            type="text"
            placeholder={`Callback ${index + 1}`}
            value={casella.callback}
            onChange={(e) => handleCasellaChange(index, 'callback', e.target.value)}
            className="input-casella"
          />
        </div>
      ))}
    </div>
  );
}

export default App;


