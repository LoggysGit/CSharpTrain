<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random YouTube Video</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #333;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
        iframe {
            margin: 20px;
            border: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #555;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #777;
        }
        a {
            color: #1e90ff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Random YouTube Video</h1>
    <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
    <p>
        <a id="video-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Open video in YouTube</a>
    </p>
    <button onclick="fetchRandomVideo()">Get Random Video</button>

    <script>
        const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Замените на ваш ключ API
        const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

        function getRandomQuery() {
            const chars = "abcdefghijklmnopqrstuvwxyz";
            let query = "";
            for (let i = 0; i < 3; i++) {
                query += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return query;
        }

        async function fetchRandomVideo() {
            const query = getRandomQuery();
            const url = `${SEARCH_URL}?q=${query}&key=${API_KEY}&part=snippet&type=video&maxResults=1`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    updateVideo(videoId);
                } else {
                    console.log("No video found, trying again...");
                    fetchRandomVideo();
                }
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        }

        function updateVideo(videoId) {
            const iframe = document.getElementById('video');
            const link = document.getElementById('video-link');

            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            link.href = `https://www.youtube.com/watch?v=${videoId}`;
            link.textContent = `https://www.youtube.com/watch?v=${videoId}`;
        }
    </script>
</body>
</html>
