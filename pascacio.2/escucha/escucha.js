let mediaRecorder;
let audioChunks = [];
let videoStream;

document.getElementById('recordButton').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.start();
    document.getElementById('recordButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = document.getElementById('audioPlayback');
        audio.src = audioUrl;
        audio.style.display = 'block';

        // Aquí puedes enviar el audioBlob a un servidor si lo necesitas
        // const formData = new FormData();
        // formData.append('audio', audioBlob, 'recording.wav');
        // fetch('/upload', { method: 'POST', body: formData });
    };
});

document.getElementById('stopButton').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('recordButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
});

document.getElementById('cameraButton').addEventListener('click', async () => {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById('video');
    video.srcObject = videoStream;
    video.play();
    video.style.display = 'block';
    document.getElementById('takePhotoButton').style.display = 'block';
});

document.getElementById('takePhotoButton').addEventListener('click', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    video.pause();
    video.srcObject = null;
    videoStream.getTracks().forEach(track => track.stop());
    video.style.display = 'none';
    document.getElementById('takePhotoButton').style.display = 'none';

    const imageData = canvas.toDataURL('image/png');
    const formData = new FormData();
    formData.append('image', imageData);

    // Aquí puedes enviar formData al servidor si lo necesitas
    // fetch('/upload', { method: 'POST', body: formData });

    canvas.style.display = 'block';
});

document.getElementById('sendButton').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const imageData = canvas.toDataURL('image/png');
    const formData = new FormData();
    formData.append('image', imageData);

    fetch('/upload', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
