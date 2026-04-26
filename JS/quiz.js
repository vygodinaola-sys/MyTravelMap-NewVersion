// Wait for the full HTML document to load before running any script
document.addEventListener('DOMContentLoaded', function () {

    // --- DOM ELEMENTS & STATE ---
    const steps = document.querySelectorAll('.quiz-step');
    const boxes = document.querySelectorAll('.option-box');
    const progressBar = document.querySelector('.progress-bar');
    const counter = document.querySelector('#question-counter');
    const nextButtons = document.querySelectorAll('.btn-quiz-next');
    const backButtons = document.querySelectorAll('.btn-quiz-back');
    
    let currentStepIndex = 0; // let — changes as user navigates between steps

    // --- FUNCTIONS ---
    // Generates dollar icons for budget options based on data-count
    function generateBudgetIcons() {
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            const countAttr = box.getAttribute('data-count');
            const container = box.querySelector('.icon-container');

            if (container != null && countAttr != null) {
                const count = parseInt(countAttr);
                let iconsHtml = ''; // let — built up incrementally in the loop
                
                for (let j = 0; j < count; j++) {
                    iconsHtml = iconsHtml + '<img src="../Images/dollar.png" alt="dollar" class="step-icon">';
                }
                container.innerHTML = iconsHtml;
            }
        }
    }

    // Updates which quiz step is visible, the progress bar, and the question counter
    function showStep(index) {
        
        // Show only the current step, hide all others
        for (let i = 0; i < steps.length; i++) {
            if (i == index) {
                steps[i].style.display = 'flex';
                steps[i].classList.add('active');
            } else {
                steps[i].style.display = 'none';
                steps[i].classList.remove('active');
            }
        }

        // Update progress bar width based on current step
        if (progressBar != null) {
            const percentage = ((index + 1) / steps.length) * 100;
            progressBar.style.width = percentage + '%';
        }

        // Update question counter text and highlight it on the last step
        if (counter != null) {
            counter.innerHTML = "Step " + (index + 1) + " of " + steps.length;
            
            if (index == steps.length - 1) {
                counter.classList.add('highlight-counter'); // Orange style on last question
            } else {
                counter.classList.remove('highlight-counter');
            }
        }
    }

    // --- EVENT LISTENERS ---
    // CARD SELECTION: Clicking any selectable card marks it active and deselects siblings
    document.onclick = function (e) {
        const target = e.target.closest('.selectable');
        
        if (target != null) {
            const parentStep = target.closest('.quiz-step');
            const siblings = parentStep.querySelectorAll('.selectable');
            
            // Remove active from all cards in this step, then add to clicked one
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            target.classList.add('active');
        }
    };

    // NEXT BUTTONS: Handle validation, navigation, and final submission
    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].onclick = function () {
            const currentStep = steps[currentStepIndex];
            const selectedOption = currentStep.querySelector('.selectable.active');

            // Block navigation if no option is selected
            if (selectedOption == null) {
                alert("Please select an option before moving to the next step!");
                return; 
            }

            if (currentStepIndex < steps.length - 1) {
                // Go to next step
                currentStepIndex = currentStepIndex + 1;
                showStep(currentStepIndex);
            } else {
                // Last step — save all selections to localStorage and redirect
                const selections = document.querySelectorAll('.selectable.active');
                
                localStorage.setItem("userTravelCompany", selections[0].innerText.trim());
                localStorage.setItem("userBudget", selections[1].getAttribute('data-count'));
                localStorage.setItem("userVibe", selections[2].innerText.trim());

                alert("Results saved! Generating your travel results... ✈️");
                window.location.href = "destinations.html"; 
            }
        };
    }

    // BACK BUTTONS: Navigate to the previous step    
    for (let i = 0; i < backButtons.length; i++) {
        backButtons[i].onclick = function () {
            // Navigate to previous step if not already on the first one
            if (currentStepIndex > 0) {
                currentStepIndex = currentStepIndex - 1;
                showStep(currentStepIndex);
            }
        };
    }

    // --- INITIAL EXECUTION ---
    generateBudgetIcons(); // Create the dollar icons on load
    showStep(currentStepIndex); // Show the first step on page load
});