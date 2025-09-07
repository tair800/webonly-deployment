import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [splineError, setSplineError] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ name: '', email: '', message: '' });
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-circle-background-left"></div>
            <div className="contact-circle-background-right"></div>

            <div className="contact-center">
                <div className="contact-rainbow">
                    {!splineError ? (
                        <Spline
                            scene="https://prod.spline.design/mP2TljaQ-tsNIzZt/scene.splinecode"
                            onError={(error) => {
                                setSplineError(true);
                            }}
                        />
                    ) : (
                        <div className="spline-fallback">
                            <img src="/assets/rainbow.png" alt="Rainbow" />
                        </div>
                    )}
                </div>
            </div>

            <div className="contact-main-section">
                <div className="contact-left-section">
                    <div className="contact-content">
                        <div className="contact-heading">
                            <h1 className="heading-line-1">Sualınız var?</h1>
                            <h1 className="heading-line-2">Həllini bilirik</h1>
                        </div>
                        <div className="contact-description">
                            <p>Texnoloji tərəfdaşınız olaraq suallarınızı, fikirlərinizi və əməkdaşlıq təkliflərinizi dəyərli sayırıq. Bizimlə əlaqə saxlamaq bir klik uzağınızdadır.</p>
                        </div>
                        <div className="contact-location">
                            <span>1 Ahmad Rajabli, Baku, Azerbaijan</span>
                        </div>
                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/phone-icon.png" alt="Phone" />
                                </div>
                                <span>+994 xx xxx xx xx</span>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/phone-icon.png" alt="Phone" />
                                </div>
                                <span>+994 xx xxx xx xx</span>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/email-icon.png" alt="Email" />
                                </div>
                                <span>example@mail.az</span>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <img src="/assets/location-icon.png" alt="Location" />
                                </div>
                                <span>Baku</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-right-section">
                    <div className="contact-form-container">
                        <h2>Sənin məlumatların</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Adınız <span className="required">*</span></label>
                                    <input type="text" id="name" name="name" placeholder="Sənin adın" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Elektron poçt <span className="required">*</span></label>
                                    <input type="email" id="email" name="email" placeholder="Sənin elektron poçtun" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Mövzu <span className="required">*</span></label>
                                <input type="text" id="subject" name="subject" placeholder="Mesajın mövzusu" value={formData.subject} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Şərh / Sual <span className="required">*</span></label>
                                <textarea id="message" name="message" placeholder="Mesajın" value={formData.message} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="submit-btn">Göndər</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=1+Ahmad+Rajabli,Baku,Azerbaijan"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Softech Location - 1 Ahmad Rajabli, Baku, Azerbaijan"
                ></iframe>
            </div>
        </div>
    );
}

export default Contact;

