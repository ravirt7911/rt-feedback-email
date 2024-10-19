const axios = require('axios');

class FeedbackForm {
    constructor(apiKey) {
        // Use the provided API key
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.web3forms.com/submit';
    }

    async sendFeedback(data) {
        if (!data || !data.email || !data.message) {
            throw new Error('Email and message are required fields');
        }

        try {
            const response = await axios.post(this.apiUrl, {
                access_key: this.apiKey,
                email: data.email,
                message: data.message,
            }, {
                timeout: 10000 // 10-second timeout
            });

            if (response.data.success) {
                console.log('Feedback sent successfully!');
                return { success: true, message: 'Feedback sent successfully!' };
            } else {
                console.log('Failed to send feedback:', response.data.message);
                return { success: false, message: response.data.message };
            }

        } catch (error) {
            console.error('Error sending feedback:', error.message);
            return { success: false, message: 'An error occurred while sending feedback.' };
        }
    }
}

module.exports = FeedbackForm;
