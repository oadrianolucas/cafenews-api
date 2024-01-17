const axios = require('axios');
const key_beehiiv = ''
const pub_beehiv = ''

const Beehiiv = {
    subscribe: async (req, res) => {
        const { email } = req.body;
        const index = {
            method: 'GET',
            url: `https://api.beehiiv.com/v2/publications/${pub_beehiv}/subscriptions`,
            params: { email, direction: 'asc' },
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + key_beehiiv
            }
        };

        try {
            const { data } = await axios.request(index);
            if (data.data && data.data.length > 0) {
                if (data.data[0].status === 'active') {
                    res.status(400).json({ 'message': 'E-mail já cadastrado.' });
                } else {
                    res.status(400).json({ 'message': 'E-mail já cadastrado, mas não ativo.' });
                }
            } else {
                const options = {
                    method: 'POST',
                    url: `https://api.beehiiv.com/v2/publications/${pub_beehiv}/subscriptions`,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + key_beehiiv
                    },
                    data: {
                        email,
                        reactivate_existing: true,
                        send_welcome_email: false,
                        utm_source: 'cafe-newsletter',
                        utm_campaign: 'start',
                        utm_medium: 'organic',
                        referring_site: 'api.cafenews.com.vr',
                    }
                };

                try {
                    const response = await axios.request(options);
                    res.status(200).send(response.data);
                } catch (error) {
                    console.error('Subscription error:', error);
                    res.status(500).send({ message: 'Error subscribing the user', error: error.message });
                }
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = Beehiiv;
