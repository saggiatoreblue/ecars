const sdk = require('@salesforce/salesforce-sdk');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;
const sgMail = require('@sendgrid/mail');

const options = {
    color: {
        dark: '#1A4A83', // Pulsar Blue
        light: '#0000' // Transparent background
    }
};

/**
 * Describe QRCodeGenerator here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param {import("@salesforce/salesforce-sdk").InvocationEvent} event:   represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param {import("@salesforce/salesforce-sdk").Context} context: represents the connection to Evergreen and your Salesforce org.
 * @param {import("@salesforce/salesforce-sdk").Logger} logger:  logging handler used to capture application logs and traces specific
 *                 to a given execution of a function.
 */

module.exports = async function (event, context, logger) {
    console.log('im updated!');
    cloudinary.config({
        //cloud_name: context.secrets.get('cloudinaryAuth')['cloud_name'],
        //api_key: context.secrets.get('cloudinaryAuth')['api_key'],
        //api_secret: context.secrets.get('cloudinaryAuth')['api_secret']
        cloud_name: '',
        api_key: '',
        api_secret: ''
    });

    const payload = event.data;
    /*
    QRCode.toDataURL(event.data.url, options, function (err, qrCode) {
        if (err) throw err;
        console.log(qrCode);
        const url = uploadImage(qrCode, payload);
    });
    */
    const generateQR = async (text) => {
        try {
            return await QRCode.toDataURL(event.data.url, options);
        } catch (err) {
            return console.error(err);
        }
    };
    const qrCode = await generateQR();
    const url = await uploadImage(qrCode, payload);
    return url;
};

async function uploadImage(qrCode, payload) {
    console.log('upload image');
    cloudinary.uploader.upload(
        qrCode,
        { tags: 'basic_sample', public_id: payload.id },
        function (err, image) {
            if (err) {
                console.warn(err);
            }
            console.log('image.url' + image.url);
            sendEmail(image.url, payload);
            return image.url;
        }
    );
}

async function sendEmail(qrCodeURL, payload) {
    console.log('sending email');
    sgMail.setApiKey(
        ''
    );
    console.log(payload.toAddress);
    const msg = {
        to: payload.toAddress, // Change to your recipient
        from: 'stephanwgarcia@gmail.com', // Change to your verified sender
        dynamicTemplateData: {
            qrcode: qrCodeURL,
            carimage: payload.carImage,
            firstname: 'Stephan'
        },
        templateId: 'd-845517024e0f404e8fa2aa4fe5e62eac'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}
