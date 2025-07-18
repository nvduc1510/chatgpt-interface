// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get DOM elements
        const messageInput = document.getElementById('message-input');
        const chatHistory = document.getElementById('chat-history');
        const attachBtn = document.getElementById('attach-btn');
        const searchBtn = document.getElementById('search-btn');
        const voiceBtn = document.getElementById('voice-btn');
        const fileInput = document.getElementById('file-input');
        const chooseFilesButtons = document.querySelectorAll('.file-option-btn');
        const fileStatuses = document.querySelectorAll('.file-status');
        const tempChatCheckbox = document.getElementById('temp-chat-checkbox');

        // Error handling for missing elements
        if (!messageInput || !chatHistory) {
            console.error('Critical DOM elements not found');
            return;
        }

        // Auto-resize textarea
        function autoResizeTextarea() {
            try {
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
            } catch (error) {
                console.error('Error resizing textarea:', error);
            }
        }

        // Handle message input
        messageInput.addEventListener('input', autoResizeTextarea);

        // Handle Enter key press (without Shift)
        messageInput.addEventListener('keydown', function(e) {
            try {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleMessageSubmit();
                }
            } catch (error) {
                console.error('Error handling keydown:', error);
            }
        });

        // Handle message submission
        function handleMessageSubmit() {
            try {
                const message = messageInput.value.trim();
                if (message) {
                    addMessageToChat(message, 'user');
                    messageInput.value = '';
                    autoResizeTextarea();
                    
                    // Simulate AI response after a short delay
                    setTimeout(() => {
                        addMessageToChat("I'm a demo interface. This is where ChatGPT's response would appear.", 'assistant');
                    }, 1000);
                }
            } catch (error) {
                console.error('Error submitting message:', error);
            }
        }

        // Add message to chat history
        function addMessageToChat(message, sender) {
            try {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.textContent = message;
                
                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                messageDiv.appendChild(messageContent);
                messageDiv.appendChild(messageTime);
                chatHistory.appendChild(messageDiv);
                
                // Scroll to bottom
                chatHistory.scrollTop = chatHistory.scrollHeight;
            } catch (error) {
                console.error('Error adding message to chat:', error);
            }
        }

        // Handle attach button
        if (attachBtn && fileInput) {
            attachBtn.addEventListener('click', function() {
                try {
                    fileInput.click();
                } catch (error) {
                    console.error('Error opening file dialog:', error);
                }
            });
        }

        // Handle file selection
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                try {
                    const files = e.target.files;
                    if (files.length > 0) {
                        const fileNames = Array.from(files).map(file => file.name).join(', ');
                        console.log('Files selected:', fileNames);
                        
                        // Update file status displays
                        fileStatuses.forEach((status, index) => {
                            if (index < files.length) {
                                status.textContent = files[index].name;
                            }
                        });
                        
                        // Show a message in chat
                        addMessageToChat(`📎 Files attached: ${fileNames}`, 'system');
                    }
                } catch (error) {
                    console.error('Error handling file selection:', error);
                }
            });
        }

        // Handle choose files buttons
        chooseFilesButtons.forEach(button => {
            button.addEventListener('click', function() {
                try {
                    if (fileInput) {
                        fileInput.click();
                    }
                } catch (error) {
                    console.error('Error with choose files button:', error);
                }
            });
        });

        // Handle search button
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                try {
                    console.log('Search activated');
                    addMessageToChat('🔍 Search functionality would be implemented here.', 'system');
                } catch (error) {
                    console.error('Error with search button:', error);
                }
            });
        }

        // Handle voice button
        if (voiceBtn) {
            voiceBtn.addEventListener('click', function() {
                try {
                    console.log('Voice activated');
                    addMessageToChat('🎤 Voice input functionality would be implemented here.', 'system');
                } catch (error) {
                    console.error('Error with voice button:', error);
                }
            });
        }

        // Handle temporary chat checkbox
        if (tempChatCheckbox) {
            tempChatCheckbox.addEventListener('change', function() {
                try {
                    const isChecked = this.checked;
                    console.log('Temporary chat mode:', isChecked ? 'enabled' : 'disabled');
                    
                    if (isChecked) {
                        addMessageToChat('✓ Temporary chat mode enabled. This conversation will not be saved.', 'system');
                    }
                } catch (error) {
                    console.error('Error handling checkbox change:', error);
                }
            });
        }

        // Add some CSS for message styling
        const messageStyles = `
            <style>
                .message {
                    margin-bottom: 16px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    max-width: 80%;
                }
                
                .user-message {
                    background-color: #0066cc;
                    color: white;
                    margin-left: auto;
                    margin-right: 0;
                }
                
                .assistant-message {
                    background-color: #f1f3f4;
                    color: #000;
                    margin-left: 0;
                    margin-right: auto;
                }
                
                .system-message {
                    background-color: #fff3cd;
                    color: #856404;
                    margin: 0 auto;
                    text-align: center;
                    font-size: 12px;
                    max-width: 90%;
                }
                
                .message-content {
                    margin-bottom: 4px;
                }
                
                .message-time {
                    font-size: 10px;
                    opacity: 0.7;
                }
                
                .user-message .message-time {
                    text-align: right;
                }
            </style>
        `;
        
        // Inject message styles
        document.head.insertAdjacentHTML('beforeend', messageStyles);

        // Initialize the interface
        console.log('ChatGPT interface initialized successfully');
        
        // Add welcome message
        setTimeout(() => {
            addMessageToChat('Welcome to ChatGPT! This is a demo interface. Try typing a message or using the buttons below.', 'system');
        }, 500);

    } catch (error) {
        console.error('Critical error initializing ChatGPT interface:', error);
        
        // Fallback error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ff4444; color: white; padding: 12px; border-radius: 6px; z-index: 1000;';
        errorDiv.textContent = 'Error loading interface. Please refresh the page.';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
