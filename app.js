const firebaseConfig = {
  apiKey: "AIzaSyCDIVc7ey-MTLMJ2z8SivmF7N5r935DeDA",
  authDomain: "rastreio-motoboy-db827.firebaseapp.com",
  databaseURL: "https://rastreio-motoboy-db827-default-rtdb.firebaseio.com",
  projectId: "rastreio-motoboy-db827",
  storageBucket: "rastreio-motoboy-db827.firebasestorage.app",
  messagingSenderId: "710886207691",
  appId: "1:710886207691:web:dc7db2b7f49c1376286b4e",
  measurementId: "G-NF87X0HWF0"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('startTracking').addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const status = document.getElementById('status');
  if (!nome) {
    status.innerText = "Digite seu nome!";
    return;
  }
  if (!navigator.geolocation) {
    status.innerText = "Geolocalização não suportada.";
    return;
  }
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    database.ref('motoboys/' + nome).set({
      nome: nome,
      latitude: lat,
      longitude: lng,
      timestamp: Date.now()
    });
    status.innerText = `Localização enviada: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }, error => {
    status.innerText = "Erro ao obter localização: " + error.message;
  });
});
