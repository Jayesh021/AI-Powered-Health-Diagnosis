document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Symptom Checker Form Navigation
    setupSymptomChecker();
    
    // Testimonial Slider
    setupTestimonialSlider();
});

function setupSymptomChecker() {
    // Only run this code on the symptom checker page
    if (!document.querySelector('.symptom-checker')) return;

    const forms = document.querySelectorAll('.checker-form');
    const progressSteps = document.querySelectorAll('.progress-step');
    const resultsDiv = document.querySelector('.checker-results');
    
    // Step buttons
    const step1Next = document.getElementById('step1-next');
    const step2Back = document.getElementById('step2-back');
    const step2Next = document.getElementById('step2-next');
    const step3Back = document.getElementById('step3-back');
    const step3Next = document.getElementById('step3-next');
    const restartBtn = document.getElementById('restart-checker');
    const saveResultsBtn = document.getElementById('save-results');
    
    // Step 1 to Step 2
    if (step1Next) {
        step1Next.addEventListener('click', function() {
            goToStep(2);
        });
    }
    
    // Step 2 to Step 1
    if (step2Back) {
        step2Back.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    // Step 2 to Step 3
    if (step2Next) {
        step2Next.addEventListener('click', function() {
            goToStep(3);
        });
    }
    
    // Step 3 to Step 2
    if (step3Back) {
        step3Back.addEventListener('click', function() {
            goToStep(2);
        });
    }
    
    // Step 3 to Results
    if (step3Next) {
        step3Next.addEventListener('click', function() {
            goToResults();
        });
    }
    
    // Restart symptom checker
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    // Medical history form conditionals
    setupMedicalHistoryForm();
    
    // Symptom search functionality
    setupSymptomSearch();
    
    function goToStep(stepNumber) {
        // Hide all forms
        forms.forEach(form => {
            form.classList.remove('active');
        });
        
        // Update progress tracker
        progressSteps.forEach((step, index) => {
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Show the target form
        const targetForm = document.querySelector(`.checker-form[data-step="${stepNumber}"]`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
        
        // Hide results div if going back to form steps
        if (resultsDiv) {
            resultsDiv.classList.remove('active');
        }
        
        // Scroll to top of form
        window.scrollTo({
            top: document.querySelector('.checker-wrapper').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    function goToResults() {
        // Hide all forms
        forms.forEach(form => {
            form.classList.remove('active');
        });
        
        // Update progress tracker
        progressSteps.forEach(step => {
            step.classList.add('active');
        });
        
        // Show results div
        if (resultsDiv) {
            resultsDiv.classList.add('active');
            
            // Simulate loading state
            const loadingDiv = resultsDiv.querySelector('.results-loading');
            const contentDiv = resultsDiv.querySelector('.results-content');
            
            if (loadingDiv && contentDiv) {
                loadingDiv.style.display = 'flex';
                contentDiv.style.display = 'none';
                
                // Simulate AI analysis delay
                setTimeout(() => {
                    loadingDiv.style.display = 'none';
                    contentDiv.style.display = 'block';
                    
                    // Update result date to current date
                    const dateElement = document.getElementById('result-date');
                    if (dateElement) {
                        const now = new Date();
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        dateElement.textContent = now.toLocaleDateString('en-US', options);
                    }
                }, 2500);
            }
        }
        
        // Scroll to top of results
        window.scrollTo({
            top: document.querySelector('.checker-wrapper').offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

function setupMedicalHistoryForm() {
    // Toggle "Other conditions" textarea visibility
    const otherConditionCheckbox = document.querySelector('input[value="other-condition"]');
    const otherConditionGroup = document.getElementById('other-condition-group');
    
    if (otherConditionCheckbox && otherConditionGroup) {
        otherConditionCheckbox.addEventListener('change', function() {
            otherConditionGroup.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Toggle medications list textarea visibility
    const medicationsRadios = document.querySelectorAll('input[name="medications"]');
    const medicationsListGroup = document.getElementById('medications-list-group');
    
    if (medicationsRadios.length && medicationsListGroup) {
        medicationsRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                medicationsListGroup.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });
    }
    
    // Toggle allergies list textarea visibility
    const allergiesRadios = document.querySelectorAll('input[name="allergies"]');
    const allergiesListGroup = document.getElementById('allergies-list-group');
    
    if (allergiesRadios.length && allergiesListGroup) {
        allergiesRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                allergiesListGroup.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });
    }
}

function setupSymptomSearch() {
    const searchInput = document.getElementById('symptom-search');
    const suggestionsList = document.getElementById('symptom-suggestions');
    const selectedSymptomsList = document.getElementById('selected-symptoms-list');
    
    if (!searchInput || !suggestionsList || !selectedSymptomsList) return;
    
    // Sample symptoms list (in a real app, this would come from a database)
    const symptoms = [
        "Headache", "Fever", "Cough", "Fatigue", "Sore Throat", 
        "Shortness of Breath", "Nausea", "Vomiting", "Diarrhea",
        "Muscle Pain", "Joint Pain", "Chest Pain", "Abdominal Pain",
        "Dizziness", "Loss of Appetite", "Rash", "Swelling",
        "Runny Nose", "Sneezing", "Itchy Eyes", "Blurred Vision",
        "Weight Loss", "Chills", "Night Sweats", "Insomnia"
    ];
    
    // Show suggestions when typing in search input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
            return;
        }
        
        const filteredSymptoms = symptoms.filter(symptom => 
            symptom.toLowerCase().includes(query)
        );
        
        if (filteredSymptoms.length) {
            suggestionsList.innerHTML = '';
            filteredSymptoms.forEach(symptom => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = symptom;
                item.addEventListener('click', () => addSymptom(symptom));
                suggestionsList.appendChild(item);
            });
            suggestionsList.style.display = 'block';
        } else {
            suggestionsList.innerHTML = '<div class="no-results">No symptoms found</div>';
            suggestionsList.style.display = 'block';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && !suggestionsList.contains(e.target)) {
            suggestionsList.style.display = 'none';
        }
    });
    
    // Add symptom to selected list
    function addSymptom(symptomName) {
        // Check if symptom already exists
        const existingSymptoms = Array.from(selectedSymptomsList.querySelectorAll('.symptom-name'))
            .map(el => el.textContent);
            
        if (existingSymptoms.includes(symptomName)) {
            // Highlight existing symptom temporarily
            const existingItem = Array.from(selectedSymptomsList.querySelectorAll('.symptom-item'))
                .find(item => item.querySelector('.symptom-name').textContent === symptomName);
                
            if (existingItem) {
                existingItem.classList.add('highlight');
                setTimeout(() => {
                    existingItem.classList.remove('highlight');
                }, 1500);
            }
            return;
        }
        
        // Create a new symptom item
        const symptomId = symptomName.toLowerCase().replace(/\s+/g, '-');
        
        const symptomItem = document.createElement('div');
        symptomItem.className = 'symptom-item';
        symptomItem.innerHTML = `
            <div class="symptom-name">${symptomName}</div>
            <div class="symptom-severity">
                <label class="severity-label">
                    <input type="radio" name="severity-${symptomId}" value="mild" checked>
                    <span>Mild</span>
                </label>
                <label class="severity-label">
                    <input type="radio" name="severity-${symptomId}" value="moderate">
                    <span>Moderate</span>
                </label>
                <label class="severity-label">
                    <input type="radio" name="severity-${symptomId}" value="severe">
                    <span>Severe</span>
                </label>
            </div>
            <div class="symptom-duration">
                <select name="duration-${symptomId}">
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                </select>
            </div>
            <button type="button" class="remove-symptom"><i class="fas fa-times"></i></button>
        `;
        
        // Add remove event listener
        const removeBtn = symptomItem.querySelector('.remove-symptom');
        removeBtn.addEventListener('click', function() {
            symptomItem.remove();
            
            // If no symptoms are left, maybe show a message
            if (selectedSymptomsList.children.length === 0) {
                selectedSymptomsList.innerHTML = '<p class="no-symptoms">No symptoms selected yet.</p>';
            }
        });
        
        // Clear any "no symptoms" message
        const noSymptomsMsg = selectedSymptomsList.querySelector('.no-symptoms');
        if (noSymptomsMsg) {
            noSymptomsMsg.remove();
        }
        
        // Add to the list
        selectedSymptomsList.appendChild(symptomItem);
        
        // Clear search input and hide suggestions
        searchInput.value = '';
        suggestionsList.style.display = 'none';
    }
    
    // Initialize with Headache example or empty state
    if (selectedSymptomsList.children.length === 0 && !selectedSymptomsList.querySelector('.no-symptoms')) {
        selectedSymptomsList.innerHTML = '<p class="no-symptoms">No symptoms selected yet. Use the search box above to add symptoms.</p>';
    }
}

function setupTestimonialSlider() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    if (dots.length === 0) return;
    
    // Simulate a basic slider functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
            
            // In a real application, you would slide to the corresponding testimonial
            // This is just a simplified example
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    let currentDot = 0;
    setInterval(() => {
        currentDot = (currentDot + 1) % dots.length;
        dots.forEach(d => d.classList.remove('active'));
        dots[currentDot].classList.add('active');
    }, 5000);
}

// Save results functionality
function saveResults() {
    // In a real application, this would generate a PDF or printable view
    alert('This feature would save or print your results. Not implemented in this demo.');
}

// Initialize date
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(element => {
        element.textContent = element.textContent.replace('2025', currentYear);
    });
});