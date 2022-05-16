window.addEventListener('load', function () {
    const container = document.getElementById("container");
    const canvas = document.getElementById("canvas1");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let audioSource;
    let analyser;

    container.addEventListener('click', function () {
        const audio1 = document.getElementById("audio1");
        audio1.src = './tune.mp3'
        const audioContext = new AudioContext();
        console.log(audioSource)
        if (!audioSource) {
            audioSource = audioContext.createMediaElementSource(audio1);
            analyser = audioContext.createAnalyser();
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        analyser.fftSize = 128;
        console.log(analyser.fftSize)
        const bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);

        const dataArray = new Uint8Array(bufferLength);

        const barWidth = (canvas.width / bufferLength);
        let barHeight;
        let x = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            x = 0;
            analyser.getByteFrequencyData(dataArray);
            let i = 0;
            while (i < bufferLength) {
                barHeight = dataArray[i] * 1;

                const red = 200 * (i / bufferLength);
                const green = 0;
                const blue = barHeight + (1 * (i / bufferLength));

                ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
                i++;
            }
            requestAnimationFrame(animate);
        }

        animate();
    });
});