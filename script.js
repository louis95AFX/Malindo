document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY NAVIGATION UI MATRIX EFFECT
    // ==========================================
    const headerElement = document.querySelector('.luxury-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerElement.classList.add('sticky');
        } else {
            headerElement.classList.remove('sticky');
        }
        trackActiveScrollSection();
    });

    // ==========================================
    // MOBILE NAV RESPONSIVE INTERFACE CONSOLE
    // ==========================================
    const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navMenuContainer = document.querySelector('.nav-menu');
    const navMenuLinks = document.querySelectorAll('.nav-link, .nav-btn');

    mobileToggleBtn.addEventListener('click', () => {
        navMenuContainer.classList.toggle('active');
        mobileToggleBtn.classList.toggle('open');
        // Simple visual toggle for menu lines
        const bars = mobileToggleBtn.querySelectorAll('.bar');
        if(mobileToggleBtn.classList.contains('open')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenuContainer.classList.remove('active');
            mobileToggleBtn.classList.remove('open');
            const bars = mobileToggleBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // ==========================================
    // MULTI-CATEGORY SERVICES INTERACTIVE SWITCH
    // ==========================================
    const tabTriggers = document.querySelectorAll('.tab-btn');
    const categoryGroups = document.querySelectorAll('.service-category-group');

    tabTriggers.forEach(tab => {
        tab.addEventListener('click', () => {
            tabTriggers.forEach(btn => btn.classList.remove('active'));
            categoryGroups.forEach(group => group.classList.remove('active'));
            
            tab.classList.add('active');
            const targetCategory = tab.getAttribute('data-category');
            document.getElementById(targetCategory).classList.add('active');
        });
    });

    // ==========================================
    // EXCLUSIVE MULTI-STEP BOOKING LOGIC CONTROLLER
    // ==========================================
    const bookingForm = document.getElementById('luxury-booking-engine');
    const stepModules = document.querySelectorAll('.booking-step');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const progressIndicators = document.querySelectorAll('.step-indicator');
    const successScreenElement = document.getElementById('success-screen');
    let currentStepIndex = 0;

    function renderActiveStep(stepIndex) {
        stepModules.forEach((module, idx) => {
            module.classList.toggle('active', idx === stepIndex);
        });
        
        progressIndicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === stepIndex);
            indicator.classList.toggle('complete', idx < stepIndex);
        });
        
        if (stepIndex === 4) {
            compileBookingLedgerOverview();
        }
    }

    nextStepButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStepInputs()) {
                currentStepIndex++;
                renderActiveStep(currentStepIndex);
            }
        });
    });

    prevStepButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStepIndex--;
            renderActiveStep(currentStepIndex);
        });
    });

    function validateStepInputs() {
        const activeFields = stepModules[currentStepIndex].querySelectorAll('[required]');
        let isValid = true;
        activeFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4d4d';
            } else {
                field.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
        return isValid;
    }

    function compileBookingLedgerOverview() {
        const selectedService = document.getElementById('booking-service').value;
        const designatedTherapist = document.querySelector('input[name="therapist"]:checked').value;
        const reservationDate = document.getElementById('booking-date').value;
        const scheduledTimeSlot = document.querySelector('input[name="time-slot"]:checked').value;
        
        // Extract pricing digits programmatically (Fixed regex escaping for the literal capital 'R')
        const numericalPriceMatch = selectedService.match(/R\s*(\d+)/);
        const subtotalAmount = numericalPriceMatch ? parseInt(numericalPriceMatch[1], 10) : 0;
        const authorizationDepositAmount = subtotalAmount * 0.50;

        const ledgerManifestContainer = document.getElementById('summary-data-manifest');
        ledgerManifestContainer.innerHTML = `
            <div class="ledger-row"><span>Selected Ritual:</span><strong>${selectedService.split(' - ')[0]}</strong></div>
            <div class="ledger-row"><span>Master Artisan:</span><strong>${designatedTherapist}</strong></div>
            <div class="ledger-row"><span>Chronos Window:</span><strong>${reservationDate} @ ${scheduledTimeSlot}</strong></div>
            <div class="ledger-row"><span>Standard Tariff Valuation:</span><strong>R ${subtotalAmount}.00</strong></div>
            <div class="ledger-row total"><span>Authorized Escrow Deposit (50%):</span><span class="text-gold">R ${authorizationDepositAmount}.00</span></div>
        `;
    }

    // Processing Final Form Dispatch Execution
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const clientNameValue = document.getElementById('cust-name').value;
        const allocatedServiceString = document.getElementById('booking-service').value;
        const selectedDateValue = document.getElementById('booking-date').value;
        const activeTimeValue = document.querySelector('input[name="time-slot"]:checked').value;
        const specificVendorSelected = document.querySelector('input[name="payment-vendor"]:checked').value;

        bookingForm.style.display = 'none';
        document.querySelector('.booking-sidebar').style.display = 'none';
        document.querySelector('.booking-wrapper').style.gridTemplateColumns = '1fr';
        
        const receiptContainer = document.getElementById('receipt-box-content');
        receiptContainer.innerHTML = `
            <p style="margin-bottom:10px;"><strong>Guest Name:</strong> ${clientNameValue}</p>
            <p style="margin-bottom:10px;"><strong>Treatment:</strong> ${allocatedServiceString.split(' - ')[0]}</p>
            <p style="margin-bottom:10px;"><strong>Schedule:</strong> ${selectedDateValue} at ${activeTimeValue}</p>
            <p style="margin-bottom:10px;"><strong>Secure Gateway Processor:</strong> ${specificVendorSelected}</p>
            <p style="border-top:1px dashed rgba(255,255,255,0.1); padding-top:10px; margin-top:10px; color:#D4AF37;"><strong>Transaction Identity Trace:</strong> AUR-${Math.floor(100000 + Math.random() * 900000)}</p>
        `;
        
        successScreenElement.style.display = 'block';
    });

    // ==========================================
    // SCROLL ELEMENT MONITOR ACTIVE ROUTING
    // ==========================================
    const dynamicSections = document.querySelectorAll('section[id]');
    
    function trackActiveScrollSection() {
        const verticalScrollPosition = window.pageYOffset;
        
        dynamicSections.forEach(section => {
            const blockHeight = section.offsetHeight;
            const topBoundaryOffset = section.offsetTop - 150;
            const targetSectionID = section.getAttribute('id');
            
            if (verticalScrollPosition > topBoundaryOffset && verticalScrollPosition <= topBoundaryOffset + blockHeight) {
                document.querySelector(`.nav-menu a[href*="${targetSectionID}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*="${targetSectionID}"]`)?.classList.remove('active');
            }
        });
    }
});