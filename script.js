document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY HEADER SCROLL ACTION SYSTEM
    // ==========================================
    const headerElement = document.querySelector('.luxury-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            headerElement.classList.add('sticky');
        } else {
            headerElement.classList.remove('sticky');
        }
    });

    // ==========================================
    // RESPONSIVE MOBILE NAVIGATION DRAWER MATRIX
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent background document scrolling when fullscreen overlay menu is active
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Auto-close overlay drawer menu when any individual target link is selected
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================
    // SEAMLESS TREATMENT MENU TABS CONTROLLER
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryGroups = document.querySelectorAll('.service-category-group');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryGroups.forEach(group => group.classList.remove('active'));
            
            button.classList.add('active');
            const targetCategory = button.getAttribute('data-category');
            document.getElementById(targetCategory).classList.add('active');
            
            // Smoothly auto-scroll horizontal overflow tracking if tab button is clipped on tiny views
            button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // ==========================================
    // DYNAMIC INTERACTIVE RESERVATION ENGINE
    // ==========================================
    const serviceSelector = document.getElementById('booking-service');
    const ledgerPreviewBlock = document.getElementById('ledger-preview');
    const summaryManifestContainer = document.getElementById('summary-data-manifest');

    function refreshLedgerState() {
        const selectedValue = serviceSelector.value;
        if (!selectedValue) {
            ledgerPreviewBlock.style.display = 'none';
            return;
        }

        const dateString = document.getElementById('booking-date').value || "Not selected";
        const timeString = document.getElementById('booking-time').value;

        // Parse visual currency metrics cleanly
        const baseRateMatch = selectedValue.match(/R\s*(\d+)/);
        const subtotalValue = baseRateMatch ? parseInt(baseRateMatch[1], 10) : 0;
        const depositRequirement = Math.floor(subtotalValue * 0.5);

        summaryManifestContainer.innerHTML = `
            <div class="ledger-row"><span>Treatment:</span><strong>${selectedValue.split(' - ')[0]}</strong></div>
            <div class="ledger-row"><span>Date Slot:</span><strong>${dateString}</strong></div>
            <div class="ledger-row"><span>Target Window:</span><strong>${timeString}</strong></div>
            <div class="ledger-row total"><span>Holding Deposit (50%):</span><strong style="color:#C5A880;">R ${depositRequirement}.00</strong></div>
        `;
        ledgerPreviewBlock.style.display = 'block';
    }

    // Trigger dynamic state re-calculation across interaction inputs
    serviceSelector.addEventListener('change', refreshLedgerState);
    document.getElementById('booking-date').addEventListener('change', refreshLedgerState);
    document.getElementById('booking-time').addEventListener('change', refreshLedgerState);

    // Form submission processing handling
    const mainBookingForm = document.getElementById('luxury-booking-engine');
    const successOutputPane = document.getElementById('success-screen');

    mainBookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const clientName = document.getElementById('cust-name').value;
        const targetedTreatment = serviceSelector.value.split(' - ')[0];
        const confirmedDate = document.getElementById('booking-date').value;
        const confirmedTime = document.getElementById('booking-time').value;

        // Visual layout structural updates
        mainBookingForm.style.display = 'none';
        
        const receiptContentBox = document.getElementById('receipt-box-content');
        receiptContentBox.innerHTML = `
            <p><strong>Guest:</strong> ${clientName}</p>
            <p><strong>Ritual:</strong> ${targetedTreatment}</p>
            <p><strong>Allocation Window:</strong> ${confirmedDate} @ ${confirmedTime}</p>
            <p style="margin-top:12px; border-top:1px dashed rgba(255,255,255,0.05); padding-top:12px; color:#C5A880;"><strong>System ID Trace:</strong> MAL-${Math.floor(100000 + Math.random() * 900000)}</p>
        `;
        
        successOutputPane.style.display = 'block';
        
        // Ensure successful verification scrolls directly into view context across mobile devices
        successOutputPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});