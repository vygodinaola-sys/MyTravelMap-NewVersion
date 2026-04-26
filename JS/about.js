// Wait for the full HTML document to load before running any script
document.addEventListener('DOMContentLoaded', function () {

    // --- DOM ELEMENTS & STATE ---

    // Video Overlay Elements
    const leftIcon = document.querySelector('.side-left img');
    const videoOverlay = document.getElementById('video-overlay');
    const closeVideo = document.getElementById('close-video');
    const videoPlayer = document.getElementById('about-video');

    // Animated Words Elements
    const  rightIcon = document.querySelector('.side-right img');
    const  wordsContainer = document.getElementById('words-container');
    const  wordsArray = ["Explore", "Dream", "Discover"];
    let step = 0; // Tracks which word to show next

    // Shiri Modal Elements
    const shiriLink = document.getElementById('shiri-link');
    const shiriModal = document.getElementById('shiri-modal');
    const closeShiri = document.getElementById('close-shiri');

    // --- FUNCTIONS ---

    // Handles stopping the video and hiding the overlay
    function stopAndCloseVideo() {
        if (videoOverlay) {
            videoOverlay.style.display = 'none';
        }
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Rewind to the beginning
        }
    }

    // --- EVENT LISTENERS ---

    // --- Video Logic ---
    // Click on left icon to open the video overlay and autoplay
    if (leftIcon) {
        leftIcon.onclick = function () {
            videoOverlay.style.display = 'flex';
            videoPlayer.play();
        };
    }

    // Click the close button to hide overlay, pause and reset the video
    if (closeVideo) {
        closeVideo.onclick = stopAndCloseVideo; 
    }

    // --- Animated Words Logic (Explore -> Dream -> Discover) ---
    if (rightIcon) {
        rightIcon.onclick = function () {
            // Check screen width for responsiveness
            // Words container is hidden on small screens — show an alert instead
            if (window.innerWidth <= 1400) {
                alert("Full interaction is available on wider screens. Expand your window to explore, dream, and discover!");
                return;
            }

            // Step-by-step word animation logic
            if (step === 0) {
                // Show first word
                wordsContainer.innerHTML = '<div id="word-0" class="hidden-word word-visible">' + wordsArray[0] + '</div>';
                step = 1;
            } 
            else if (step === 1) {
                // Highlight previous word, show second word
                document.getElementById('word-0').classList.add('word-highlight');
                wordsContainer.innerHTML += '<div id="word-1" class="hidden-word word-visible">' + wordsArray[1] + '</div>';
                step = 2;
            } 
            else if (step === 2) {
                // Highlight previous word, show third word already highlighted
                document.getElementById('word-1').classList.add('word-highlight');
                wordsContainer.innerHTML += '<div id="word-2" class="hidden-word word-highlight">' + wordsArray[2] + '</div>';
                step = 3;
            } 
            else if (step === 3) {
                // Reset — clear all words and start over
                wordsContainer.innerHTML = '';
                step = 0;
            }
        };
    }

    // --- Shiri Modal Logic ---
    if (shiriLink) {
        shiriLink.onclick = function (e) {
            e.preventDefault(); // Prevent anchor from jumping to top of page
            shiriModal.style.display = 'flex';
        };
    }

    if (closeShiri) {
        closeShiri.onclick = function () {
            shiriModal.style.display = 'none';
        };
    }

    // --- Global Backdrop Click Logic --- ---
    // If the user clicks on the dark overlay (not the content), close the corresponding modal
    window.onclick = function (event) {
        if (event.target === shiriModal) {
            shiriModal.style.display = 'none';
        }
        if (event.target === videoOverlay) {
            stopAndCloseVideo();
        }
    };
});