const API_KEY = 'AIzaSyCIo00gH_2R0OPKOErlWfePYNQRCOty_78';  // Ваш ключ API

// Функция для проверки существования видео с использованием YouTube Data API
function checkURL(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.items.length > 0) {
        console.log("Видео существует.");
        return true;
      } else {
        console.log("Видео не найдено.");
        return false;
      }
    })
    .catch(error => {
      console.log("Ошибка подключения:", error);
      return false;
    });
}

// Генерация и проверка URL
async function generateValidURL() {
  let videoId = generateURL();
  const isValid = await checkURL(videoId);  // Проверка существования видео
  
  if (isValid) {
    return videoId;
  } else {
    return generateValidURL(); // Рекурсивный вызов, если URL не существует
  }
}

// Функция для обновления видео
async function generate() {
  const iframe = document.getElementById('vid');
  const urlP = document.getElementById('url');
  
  const videoId = await generateValidURL();  // Генерация и проверка URL
  iframe.src = `https://www.youtube.com/embed/${videoId}`;  // Вставка видео
  urlP.textContent = videoId;  // Отображение ID видео
}
