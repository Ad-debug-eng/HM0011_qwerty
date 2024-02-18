import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubePlayer = ({ apiKey }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        if (videos.length > 0) {
            setSelectedVideo(videos[0]); // Automatically select the first video after search
        }
    }, [videos]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    q: searchTerm,
                    part: 'snippet',
                    maxResults: 5,
                    type: 'video',
                    key: apiKey,
                },
            });
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (selectedVideo) {
            const videoId = selectedVideo.id.videoId;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.width = '560';
            iframe.height = '315';
            iframe.frameBorder = '0';
            iframe.allowFullScreen = true;
            document.body.appendChild(iframe);
            return () => {
                document.body.removeChild(iframe);
            };
        }
    }, [selectedVideo]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a song..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {/* {videos.map((video) => (
                    <div key={video.id.videoId} onClick={() => setSelectedVideo(video)}>
                        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        <p>{video.snippet.title}</p>
                    </div>
                ))} */}
            </div>
            {selectedVideo && (
                <div>
                    {/* <p>Selected Video:</p>
                    <p>{selectedVideo.snippet.title}</p>
                    <p>{selectedVideo.snippet.description}</p> */}
                    <a href={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`} target="_blank" rel="noopener noreferrer">
                        {/* Watch on YouTube */}
                    </a>
                </div>
            )}
        </div>
    );
};

export default YoutubePlayer;
