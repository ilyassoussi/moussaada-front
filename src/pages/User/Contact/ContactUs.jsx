import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/contactCompo/button';
import { Input } from '../../../components/contactCompo/input';
import { Textarea } from '../../../components/contactCompo/textarea';
import { Toaster } from '../../../components/contactCompo/toaster';
import { useToast } from '../../../components/contactCompo/use-toast';
import NavBar from '../../../components/Header/Navbar';
import Footer from "../../../components/Footer/Footer";
import { useTranslation } from 'react-i18next';
import {
    Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Wheat, Tractor, Sun, Droplets
} from 'lucide-react';



const FloatingLabelInput = ({ id, label, type, value, onChange, dir }) => (
    <div className="floating-label-group">
        <Input
            id={id}
            type={type}
            name={id}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="floating-input pt-6"
            required
        />
        <label htmlFor={id} className={`floating-label ${dir === 'rtl' ? 'font-cairo' : 'font-readex'}`}>
            {label}
        </label>
    </div>
);

const FloatingLabelTextarea = ({ id, label, value, onChange, dir }) => (
    <div className="floating-label-group">
        <Textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="floating-input pt-6 min-h-[120px]"
            required
        />
        <label htmlFor={id} className={`floating-label ${dir === 'rtl' ? 'font-cairo' : 'font-readex'}`}>
            {label}
        </label>
    </div>
);

function ContactUs() {
    const [lang, setLang] = useState('fr');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle');
    const { toast } = useToast();
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const { t, i18n } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
            toast({
                title: <div className="flex items-center gap-2"><CheckCircle className="text-green-500" /><span>{t('contactus.successTitle')}</span></div>,
                description: t.successDesc,
            });
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    const toggleLang = () => {
        setLang(currentLang => (currentLang === 'fr' ? 'ar' : 'fr'));
    };

    const handleSocialClick = () => {
        toast({
            title: <div className="flex items-center gap-2"><AlertCircle className="text-yellow-500" /><span>Alerte Fonctionnalité</span></div>,
            description: t.featureToast,
        });
    };

    return (
        <>
            <div className={`bg-background ${dir === 'rtl' ? 'font-cairo' : 'font-readex'}`}>
                <NavBar linkColor="text-white" linkHoverColor="hover:text-green-600" />
                <main>
                    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-white text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-green-800 to-green-600 opacity-80 z-10"></div>
                        <div className="absolute inset-0 farm-bg">
                            <img src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop" alt="Lush green agricultural field under a bright sun" className="w-full h-full object-cover" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-20 container mx-auto px-4"
                        >
                            <div className="flex justify-center gap-4 mb-4">
                                <Wheat className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                                <Tractor className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                                <Sun className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                                <Droplets className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">{t('contactus.heroTitle')}</h1>
                            <p className="max-w-3xl mx-auto text-lg md:text-xl text-green-100 drop-shadow-lg">{t('contactus.heroSubtitle')}</p>
                        </motion.div>
                    </section>

                    <section className="py-16 md:py-24 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="grid lg:grid-cols-5 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                    className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg"
                                >
                                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('contactus.formTitle')}</h2>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <FloatingLabelInput id="name" label={t('contactus.formName')} type="text" value={formData.name} onChange={handleInputChange} dir={dir} />
                                        <FloatingLabelInput id="email" label={t('contactus.formEmail')} type="email" value={formData.email} onChange={handleInputChange} dir={dir} />
                                        <FloatingLabelInput id="phone" label={t('contactus.formPhone')} type="tel" value={formData.phone} onChange={handleInputChange} dir={dir} />
                                        <FloatingLabelTextarea id="message" label={t('contactus.formMessage')} value={formData.message} onChange={handleInputChange} dir={dir} />
                                        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg" disabled={formStatus === 'sending'}>
                                            <AnimatePresence mode="wait">
                                                {formStatus === 'sending' ? (
                                                    <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                                                        <span>Envoi...</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                        <Send className="w-5 h-5" />
                                                        <span>{t('contactus.formSubmit')}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                    </form>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="lg:col-span-2 space-y-12"
                                >
                                    <div className="bg-white p-8 rounded-xl shadow-lg">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contactus.contactTitle')}</h3>
                                        <div className="space-y-4 text-gray-600">
                                            <div className="flex items-start gap-4">
                                                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                                <span>{t('contactus.address')}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                                                <a href="mailto:contact@moussaada.ma" className="hover:text-primary transition-colors">contact@moussaada.ma</a>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                                                <a href="tel:+212537000000" className="hover:text-primary transition-colors">+212 537 00 00 00</a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <section className="h-[400px] md:h-[500px] w-full pb-10">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.583985550207!2d-6.840628684786806!3d34.0132549806265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9fe3d3e7d3e1a1%3A0x55c8a9a5b3c3d3e1!2sHassan%20II%20Avenue%2C%20Rabat!5e0!3m2!1sen!2sma!4v1678886453210!5m2!1sen!2sma"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map Location"
                            className="filter grayscale(1) contrast(1.2) opacity-90 hover:grayscale(0) transition-all duration-300"
                        ></iframe>
                    </section>
                </main>
                <Toaster />
                <Footer />
            </div>
        </>
    );
}

export default ContactUs;