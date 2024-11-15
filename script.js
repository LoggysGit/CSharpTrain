const API_KEY = 'AIzaSyCIo00gH_2R0OPKOErlWfePYNQRCOty_78'; // Замените на ваш ключ API

// Генерация случайного видео ID
function generateURL() {
    const charMass = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let videoId = "";

    for (let i = 0; i < 11; i++) {
        let index = Math.floor(Math.random() * charMass.length);
        videoId += charMass.charAt(index);
    }

    return videoId; // Возвращает только ID видео
}

// Проверка существования видео с использованием YouTube Data API
function checkURL(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                console.log("Video exist:", videoId);
                return true;
            } else {
                console.log("Video does not exist:", videoId);
                return false;
            }
        })
        .catch(error => {
            console.log("Error:", error);
            return false;
        });
}

// Рекурсивная проверка для генерации валидного видео URL
async function generateValidURL() {
    const videoId = generateURL();
    const isValid = await checkURL(videoId);

    if (isValid) {
        return videoId;
    } else {
        return generateValidURL(); // Повторяем генерацию, если ID невалиден
    }
}

// Функция для обновления видео
async function generate() {
    const iframe = document.getElementById('vid');
    const urlP = document.getElementById('url');

    const videoId = await generateValidURL(); // Получение валидного ID видео
    iframe.src = `https://www.youtube.com/embed/${videoId}`; // Обновление iframe
    urlP.href = `https://www.youtube.com/watch?v=${videoId}`;
    urlP.textContent = `https://www.youtube.com/watch?v=${videoId}`; 
}
