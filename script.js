function checkURL(url) {
  return fetch(url, { method: 'GET' })
    .then(response => {
      if (response.status === 200) {
        console.log("Видео существует.");
        return true;
      } else if (response.status === 404) {
        console.log("Видео не найдено (ошибка 404).");
        return false;
      } else {
        console.log("Видео недоступно, код ошибки: " + response.status);
        return false;
      }
    })
    .catch(error => {
      console.log("Ошибка подключения: " + error.message);
      return false;
    });
}

function generateValidURL() {
  let url = generateURL();
  return checkURL(url).then(isValid => {
    if (isValid) {
      return url;
    } else {
      return generateValidURL(); // Рекурсивный вызов, если URL не существует
    }
  });
}

function generateURL() {
  const charMass = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890[]'/?><!#$%^&*()_+=-*}{`~";
  let password = "";
  
  for (let i = 0; i < 11; i++) {
    let index = Math.floor(Math.random() * charMass.length);
    password += charMass.charAt(index);
  }

  return `https://www.youtube.com/$password`; // Создаем пример URL
}

function generate(){
  const iframe = document.getElementById('vid');
  const urlP = document.getElementById('url');
  newVideoId = generateValidURL()
  iframe.src = `https://www.youtube.com/embed/${newVideoId}`;
  urlP.textContent = newVideoId
}
