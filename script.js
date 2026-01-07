document.addEventListener('DOMContentLoaded', () => {

    // --- Chat Functionality ---
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                userInput.value = '';

                // Check if we are in Human Chat mode
                if (isHumanChat()) {
                    // Simulate Human Response (Volunteer)
                    setTimeout(() => {
                        const humanReplies = [
                            "أنا أسمعك بقلبي. أكمل، أنا معك.",
                            "هذا يبدو صعباً جداً. أنت قوي لأنك تشارك هذا.",
                            "شكراً لثقتك بي. كيف يمكنني دعمك الآن؟",
                            "هل حدث هذا من قبل؟ أنا هنا لأستمع لكل تفاصي.",
                            "خذ وقتك، لا داعي للعجلة. أنا هنا."
                        ];
                        const reply = humanReplies[Math.floor(Math.random() * humanReplies.length)];
                        addMessage(reply, 'bot');
                    }, 2000 + Math.random() * 2000); // Random delay 2-4s for realism
                } else {
                    // Regular AI Bot Response
                    setTimeout(() => {
                        const response = getBotResponse(message);
                        addMessage(response, 'bot');
                    }, 1000);
                }
            }
        });
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('message', sender);
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mock AI Logic - Simple Keyword Matching
    // Mock AI Logic - Simple Keyword Matching (Arabic Support)
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        // Greeting
        if (lowerInput.match(/مرحبا|أهلا|سلام|هاي|مين/)) {
            return "أهلاً بك يا صديقي! أنا شروق، أنا هنا لأسمعك وأساعدك. كيف تشعر اليوم؟";
        }

        // Emotional State: Sad/Distressed
        if (lowerInput.match(/حزين|زعلان|مخنوق|تعبان|مضايق|ابكي/)) {
            return "أنا آسفة لأنك تشعر هكذا. تذكر أن مشاعرك طبيعية ومهمة. هل تحب أن نجرب تمرين تنفس مريح معاً؟ أو ربما ترغب في التحدث أكثر؟";
        }

        // Emotional State: Happy
        if (lowerInput.match(/سعيد|مبسوط|فرحان|تمام|بخير|الحمدلله/)) {
            return "يا له من خبر رائع! أتمنى أن تدوم سعادتك دائماً. ابتسامتك تنير المكان! ☀️";
        }

        // Activities: Drawing/Art
        if (lowerInput.match(/رسم|لون|ارسم|فن/)) {
            return "الرسم وسيلة رائعة للتعبير عن المشاعر! يمكنك زيارة قسم 'التعلم' هنا في الموقع لتجد مساحة حرة للرسم.";
        }

        // Future/Jobs
        if (lowerInput.match(/شغل|وظيفة|عمل|سي في|cv|مستقبل/)) {
            return "التفكير في المستقبل خطوة شجاعة. أنصحك بزيارة قسم 'المهارات' لتطوير نفسك والاستعداد لسوق العمل.";
        }

        // Thanks
        if (lowerInput.match(/شكرا|تسلم|يعطيك العافية/)) {
            return "على الرحب والسعة! أنا هنا دائماً لأجلك.";
        }

        // Default responses (Arabic)
        const defaults = [
            "أنا أستمع إليك باهتمام، أخبرني المزيد.",
            "هذا مثير للاهتمام... كيف يجعلك هذا تشعر؟",
            "أنا بجانبك دائماً. هل هناك شيء محدد يضايقك؟",
            "أنت تقوم بعمل رائع بمجرد وجودك هنا ومحاولتك.",
            "هل يمكنك توضيح ذلك أكثر؟ أنا أحب أن أفهمك جيداً."
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // --- Drawing Canvas Functionality (will be used in learning.html) ---
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let painting = false;

        function startPosition(e) {
            painting = true;
            draw(e);
        }

        function finishedPosition() {
            painting = false;
            ctx.beginPath();
        }

        function draw(e) {
            if (!painting) return;

            // Handle touch support roughly
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#2C3E50';

            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        // Mouse Events
        canvas.addEventListener('mousedown', startPosition);
        canvas.addEventListener('mouseup', finishedPosition);
        canvas.addEventListener('mousemove', draw);

        // Touch events
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
        canvas.addEventListener('touchend', (e) => { e.preventDefault(); finishedPosition(); });
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

        // Clear Button
        const clearBtn = document.getElementById('clear-canvas');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }
    }
    // --- Human Chat Logic (Simulated) ---
    const connectionStatus = document.getElementById('connection-status');

    // Check if we are on the human chat page
    if (window.location.pathname.includes('human_chat.html') || document.getElementById('connection-status')) {

        const humanChatMessages = document.getElementById('chat-messages');

        // Simulate connection delay
        setTimeout(() => {
            if (connectionStatus) {
                connectionStatus.textContent = "تم الاتصال بالمتطوعة سارة.";
                connectionStatus.style.color = "#4CAF50";
                // Add welcome message
                addMessage("أهلاً بك! أنا سارة، متطوعة هنا لأسمعك. حديثنا سري تماماً وأنا هنا لأجلك. كيف يمكنني مساعدتك؟", 'bot');
            }
        }, 3000); // 3 seconds delay

        // Handle sending for human chat (uses same form ID 'chat-form' usually, or check layout)
        // If human chat uses a different form id or same, we can re-use logic but with different response source
        // For simplicity, let's override or add specific listener if it's on this page

        // Actually, the main listener above handles 'chat-form'. 
        // We need to intercept it to prevent the 'AI' response and use 'Human' response instead if on this page.
    }
});

// Helper to determine response type based on page
function isHumanChat() {
    return window.location.pathname.includes('human_chat.html') || document.getElementById('connection-status');
}

// Modify the original main listener logic to check page type:
// (See next edit for modifying the main listener to branch logic)
