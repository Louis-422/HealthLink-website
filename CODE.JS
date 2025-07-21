
        // Medicine data with Ghana Cedis prices
        const medicines = [
            { id: 1, name: "Lydia", description: "Contraceptive pill", dosage: "1 pill daily", price: 20.00 },
            { id: 2, name: "Kiss Condom", description: "Birth Control", price: 5 },
            { id: 3, name: "Atorvastatin", description: "Cholesterol lowering", dosage: "20mg at bedtime", price: 30.25 },
            { id: 4, name: "Metformin", description: "Type 2 diabetes", dosage: "500mg twice daily", price: 12.80 },
            { id: 5, name: "Levothyroxine", description: "Thyroid hormone replacement", dosage: "50mcg every morning", price: 18.40 },
            { id: 6, name: "Albuterol Inhaler", description: "Asthma relief", dosage: "2 puffs every 4-6 hours", price: 45.90 },
            { id: 7, name: "Omeprazole", description: "Acid reducer for heartburn", dosage: "20mg before breakfast", price: 14.25 },
            { id: 8, name: "Sertraline", description: "Antidepressant", dosage: "50mg once daily", price: 27.60 },
            { id: 9, name: "Ibuprofen", description: "Pain and inflammation", dosage: "400mg every 6 hours", price: 8.75 },
            { id: 10, name: "Hydrochlorothiazide", description: "Diuretic for hypertension", dosage: "25mg once daily", price: 10.50 },
            { id: 11, name: "Metoprolol", description: "Beta blocker for heart", dosage: "50mg twice daily", price: 16.80 },
            { id: 12, name: "Warfarin", description: "Blood thinner", dosage: "Varies - requires monitoring", price: 19.95 },
            { id: 13, name: "Amoxicillin", description: " Antibiotic for bacterial infections", dosage:"500mg three times daily", price: 50.56 } 

        ];

        // Cart to store selected medicines
        let cart = [];
        let selectedStore = '';
        let paymentMethod = '';
        
        // Page navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the requested page
            document.getElementById(`${pageId}-page`).classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // If showing payment page, update order summary
            if (pageId === 'payment') {
                updateOrderSummary();
            }
        }
        
        // Populate medicine selection
        document.addEventListener('DOMContentLoaded', function() {
            const medicineContainer = document.getElementById('medicineSelection');
            
            medicines.forEach(medicine => {
                const card = document.createElement('div');
                card.className = 'medicine-card';
                card.innerHTML = `
                    <h4>${medicine.name}</h4>
                    <p>${medicine.description}</p>
                    <p><strong>Dosage:</strong> ${medicine.dosage}</p>
                    <div class="medicine-price">GH₵ ${medicine.price.toFixed(2)}</div>
                `;
                
                card.addEventListener('click', function() {
                    this.classList.toggle('selected');
                    
                    // Add or remove from cart
                    if (this.classList.contains('selected')) {
                        cart.push(medicine);
                    } else {
                        cart = cart.filter(item => item.id !== medicine.id);
                    }
                    
                    // Update cart badge
                    updateCartBadge();
                });
                
                medicineContainer.appendChild(card);
            });
            
            // Initialize payment form
            selectPayment('momo');
        });
        
        // Update cart badge in navigation
        function updateCartBadge() {
            const badge = document.getElementById('cart-badge');
            if (badge) {
                badge.textContent = cart.length;
                badge.style.display = cart.length ? 'flex' : 'none';
            }
        }
        
        // Process prescription form
        function processPrescription() {
            // Get form values
            const name = document.getElementById('fullName').value;
            const weight = document.getElementById('weight').value;
            const temperature = document.getElementById('temperature').value;
            const symptoms = document.getElementById('symptoms').value;
            
            // Validate vital signs
            if (weight < 10 || weight > 300) {
                alert('Please enter a valid weight between 10kg and 300kg');
                return;
            }
            
            if (temperature < 90 || temperature > 110) {
                alert('Please enter a valid temperature between 90°F and 110°F');
                return;
            }
            
            if (cart.length === 0) {
                alert('Please select at least one medicine');
                return;
            }
            
            // Show payment page
            showPage('payment');
        }
        
        // Update order summary on payment page
        function updateOrderSummary() {
            const orderItemsContainer = document.getElementById('orderItems');
            orderItemsContainer.innerHTML = '';
            
            let total = 0;
            
            if (cart.length === 0) {
                orderItemsContainer.innerHTML = '<p>No medicines selected yet</p>';
                document.getElementById('orderTotal').textContent = 'GH₵ 0.00';
                return;
            }
            
            cart.forEach(medicine => {
                const item = document.createElement('div');
                item.className = 'order-item';
                item.innerHTML = `
                    <span>${medicine.name}</span>
                    <span>GH₵ ${medicine.price.toFixed(2)}</span>
                `;
                orderItemsContainer.appendChild(item);
                total += medicine.price;
            });
            
            document.getElementById('orderTotal').textContent = `GH₵ ${total.toFixed(2)}`;
        }
        
        // Select store for pickup
        function selectStore(storeName) {
            selectedStore = storeName;
            alert(`You've selected ${storeName} for pickup. Continue to checkout.`);
            showPage('payment');
        }
        
        // Select payment method
        function selectPayment(method) {
            paymentMethod = method;
            
            // Update active button
            document.querySelectorAll('.method-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(`${method}-btn`).classList.add('active');
            
            // Update form based on payment method
            const formContainer = document.getElementById('payment-form-container');
            let formHTML = '';
            
            switch(method) {
                case 'momo':
                    formHTML = `
                        <div class="form-group">
                            <label for="momoNumber">MTN MoMo Number</label>
                            <input type="tel" id="momoNumber" class="form-control" placeholder="05X XXX XXXX" required>
                        </div>
                        <div class="form-group">
                            <label for="momoPin"> MoMo PIN </label> 
                            <input type="password" id="momoPin" class="form-control" placeholder="PIN" required>
                        </div>
                    `;
                    break;
                    
                case 'ghana-card':
                    formHTML = `
                        <div class="form-group">
                            <label for="ghanaCardNumber">Ghana Card Number</label>
                            <input type="text" id="ghanaCardNumber" class="form-control" placeholder="GHA-XXXXXXXXX-X" required>
                        </div>
                        <div class="form-group">
                            <label for="ghanaCardPin">Card PIN</label>
                            <input type="password" id="ghanaCardPin" class="form-control" placeholder="PIN" required>
                        </div>
                    `;
                    break;
                    
                case 'visa':
                    formHTML = `
                        <div class="payment-card">
                            <div class="card-logo">
                                <i class="fab fa-cc-visa"></i>
                            </div>
                            <div class="card-number">•••• •••• •••• 1234</div>
                            <div class="card-details">
                                <div>
                                    <div>Card Holder</div>
                                    <div>Agbedela Collins</div>
                                </div>
                                <div>
                                    <div>Expires</div>
                                    <div>12/25</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cardName">Name on Card</label>
                                <input type="text" id="cardName" class="form-control" placeholder="Agbedela Collins" required>
                            </div>
                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" class="form-control" placeholder="1234 5678 9012 3456" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" class="form-control" placeholder="MM/YY" required>
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" class="form-control" placeholder="123" required>
                            </div>
                        </div>
                    `;
                    break;
            }
            
            formContainer.innerHTML = formHTML;
        }
        
        // Process payment
        function processPayment() {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add medicines first.');
                showPage('prescription');
                return;
            }
            
            if (!paymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            let valid = true;
            let message = '';
            
            // Validate based on payment method
            switch(paymentMethod) {
                case 'momo':
                    const momoNumber = document.getElementById('momoNumber').value;
                    const momoPin = document.getElementById('momoPin').value;
                    if (!momoNumber || !momoPin) {
                        valid = false;
                        message = 'Please complete all MoMo payment details';
                    }
                    break;
                    
                case 'visa':
                    const visaName = document.getElementById('cardName').value;
                    const visaNumber = document.getElementById('cardNumber').value;
                    const expiry = document.getElementById('expiry').value;
                    const cvv = document.getElementById('cvv').value;
                    if (!visaName || !visaNumber || !expiry || !cvv) {
                        valid = false;
                        message = 'Please complete all Visa payment details';
                    }
                    break;
            }
            
            if (!valid) {
                alert(message);
                return;
            }
            
            // Calculate total
            let total = 0;
            cart.forEach(medicine => total += medicine.price);
            
            // Simulate secure payment processing
            setTimeout(() => {
                alert(`Payment successful! Your order total is GH₵ ${total.toFixed(2)}.\n\nThank you for choosing HealthLink Pharmacy.`);
                
                // Reset form and cart
                document.getElementById('prescriptionForm').reset();
                cart = [];
                updateCartBadge();
                document.querySelectorAll('.medicine-card').forEach(card => {
                    card.classList.remove('selected');
                });
                selectedStore = '';
                paymentMethod = '';
                
                // Return to home page
                showPage('home');
            }, 1000);
        }
        
        // Initialize cart badge
        updateCartBadge();
    