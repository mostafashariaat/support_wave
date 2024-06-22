const video = document.querySelector(".video")
video.src = await preloadVideo("https://example.com/video.mp4");

// startPreview()

// function startPreview() {
//   video.muted = true;
//   video.currentTime = 1;
//   video.playbackRate = 0.5;
//   video.play();
// //   stopPreview();
// }

// function stopPreview() {
//   video.currentTime = 0;
//   video.playbackRate = 1;
//   video.pause();
// }