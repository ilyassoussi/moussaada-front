import React, { useState, useEffect } from 'react';
import {
    Wheat,
    Users,
    Target,
    Award,
    Sprout,
    TrendingUp,
    MapPin,
    Phone,
    Mail,
    ChevronDown,
    Leaf,
    Sun,
    Droplets,
    Heart,
    ArrowRight,
    ExternalLink,
    Star,
    Shield,
    Globe
} from 'lucide-react';
import NavBar from '../../components/Header/Navbar';
import { useTranslation } from 'react-i18next';
import Footer from "../../components/Footer/Footer";
import logoMarocain from '../../assets/ArmoiriesduMaroc.svg'
function ProposNous() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visibleSection, setVisibleSection] = useState('');
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const CounterAnimation = ({ target, label, suffix = "" }) => {
        const [count, setCount] = useState(0);
        const [hasAnimated, setHasAnimated] = useState(false);

        useEffect(() => {
            if (visibleSection === 'stats' && !hasAnimated) {
                setHasAnimated(true);
                const duration = 2000;
                const increment = target / (duration / 50);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(current));
                    }
                }, 50);

                return () => clearInterval(timer);
            }
        }, [visibleSection, target, hasAnimated]);

        return (
            <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {count.toLocaleString()}{suffix}
                </div>
                <div className="text-gray-700 font-medium">{label}</div>
            </div>
        );
    };

    const ServiceCard = ({ icon: Icon, title, description, color }) => (
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100">
            <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );

    const TeamMember = ({ name, role, speciality, experience, achievements }) => (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Profile Image Section */}
            <div className="relative h-64 bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10 w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-16 h-16 text-white" />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 bg-white rounded-full opacity-40 group-hover:scale-125 transition-transform duration-700"></div>
            </div>

            {/* Content Section */}
            <div className="relative p-6 space-y-4">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-green-600 font-semibold text-lg mb-2">{role}</p>
                    <p className="text-gray-500 text-sm">{speciality}</p>
                </div>

                {/* Experience Badge */}
                <div className="flex justify-center">
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>{experience} {t("aboutPage.feedback.experience")}</span>
                    </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 text-center">{t("aboutPage.feedback.Réalisations")}</h4>
                    <div className="space-y-1">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                                <span>{achievement}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Button */}
                <div className="pt-4 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{t('aboutPage.btn.contact')}</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const handleContactRedirect = () => {
        // Redirection vers la page de contact
        window.location.href = '/contact';
    };
    
        const handleServiceRedirect = () => {
        // Redirection vers la page de contact
        window.location.href = '/nos-services';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <NavBar linkColor="text-white" linkHoverColor="hover:text-green-600" />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-bounce-in">
                            {t('aboutPage.header.hed')}
                            <span className="block text-yellow-400 mt-2">{t('aboutPage.header.span')}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            {t('aboutPage.header.p')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                onClick={handleServiceRedirect}
                            >
                                {t('aboutPage.btn.decouvrir')}
                            </button>
                            <button
                                onClick={handleContactRedirect}
                                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <span>{t('aboutPage.btn.nosContact')}</span>
                                <ExternalLink className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-white opacity-80" />
                </div>
            </section>

            {/* Description Section with Image */}
            <section id="description" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                <Shield className="w-4 h-4" />
                                <span>Excellence & Innovation</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                                {t('aboutPage.intro.title')}
                                <span className="text-green-600 block">{t('aboutPage.intro.stitle')}</span>
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('aboutPage.intro.text')}
                            </p>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t('aboutPage.intro.texts')}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center space-x-2 text-green-600">
                                    <Globe className="w-5 h-5" />
                                    <span className="font-medium">Couverture nationale</span>
                                </div>
                                <div className="flex items-center space-x-2 text-green-600">
                                    <Award className="w-5 h-5" />
                                    <span className="font-medium">Certifié ISO 9001</span>
                                </div>
                                <div className="flex items-center space-x-2 text-green-600">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium">Équipe d'experts</span>
                                </div>
                            </div>

                            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
                                <span>En savoir plus</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src={logoMarocain}
                                    alt="Agriculture moderne au Maroc"
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">Agriculture Moderne</h3>
                                    <p className="text-green-100">Innovation et tradition au service de la productivité</p>
                                </div>
                            </div>

                            {/* Floating Stats Cards */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">98%</div>
                                    <div className="text-sm text-gray-600">Satisfaction</div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">250+</div>
                                    <div className="text-sm text-gray-600">Projets</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section id="mission" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {t("aboutPage.mission.title")} <span className="text-green-600">{t("aboutPage.mission.span")}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t("aboutPage.mission.text")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="group">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">{t("aboutPage.mission.Vision")}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed pl-16">
                                    {t("aboutPage.mission.visionText")}
                                </p>
                            </div>

                            <div className="group">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">{t("aboutPage.mission.Valeurs")}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed pl-16">
                                    {t("aboutPage.mission.valeurText")}
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white rounded-xl p-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <Sprout className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-gray-800">Innovation</div>
                                        </div>
                                        <div className="text-center">
                                            <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-gray-800">Durabilité</div>
                                        </div>
                                        <div className="text-center">
                                            <Droplets className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-gray-800">Ressources</div>
                                        </div>
                                        <div className="text-center">
                                            <Leaf className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-gray-800">Écologie</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section id="stats" className="py-20 bg-gradient-to-br from-green-50 to-green-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <CounterAnimation target={15000} label="Agriculteurs accompagnés" suffix="+" />
                        <CounterAnimation target={250} label="Projets réalisés" suffix="+" />
                        <CounterAnimation target={94} label="Taux de satisfaction" suffix="%" />
                        <CounterAnimation target={60} label="Années d'expérience" />
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {t("aboutPage.service.title")} <span className="text-green-600">{t("aboutPage.service.span")}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t("aboutPage.service.text")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard
                            icon={Sprout}
                            title={t("aboutPage.service.conseils")}
                            description={t("aboutPage.service.conseilsText")}
                            color="bg-gradient-to-br from-green-500 to-green-600"
                        />
                        <ServiceCard
                            icon={TrendingUp}
                            title={t("aboutPage.service.Formation")}
                            description={t("aboutPage.service.FormationText")}
                            color="bg-gradient-to-br from-blue-500 to-blue-600"
                        />
                        <ServiceCard
                            icon={Award}
                            title={t("aboutPage.service.Certification")}
                            description={t("aboutPage.service.CertificationText")}
                            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
                        />
                        <ServiceCard
                            icon={Droplets}
                            title={t("aboutPage.service.ressources")}
                            description={t("aboutPage.service.ressourcesText")}
                            color="bg-gradient-to-br from-cyan-500 to-cyan-600"
                        />
                        <ServiceCard
                            icon={Users}
                            title={t("aboutPage.service.Developpement")}
                            description={t("aboutPage.service.DeveloppementText")}
                            color="bg-gradient-to-br from-purple-500 to-purple-600"
                        />
                        <ServiceCard
                            icon={Leaf}
                            title={t("aboutPage.service.Agriculture")}
                            description={t("aboutPage.service.AgricultureText")}
                            color="bg-gradient-to-br from-green-600 to-green-700"
                        />
                    </div>
                </div>
            </section>

            {/* Modern Team Section */}
            <section id="equipe" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Users className="w-4 h-4" />
                            <span>{t("aboutPage.feedback.NotreEquipe")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {t("aboutPage.feedback.title")} <span className="text-green-600">{t("aboutPage.feedback.span")}</span> {t("aboutPage.feedback.title2")}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t("aboutPage.feedback.text")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TeamMember
                            name="Dr. Ahmed Benali"
                            role={t("aboutPage.feedback.role1")}
                            speciality={t("aboutPage.feedback.speciality1")}
                            experience="15"
                            achievements={[
                                t("aboutPage.feedback.Réalisations1"),
                                t("aboutPage.feedback.Réalisations2"),
                                t("aboutPage.feedback.Réalisations3")
                            ]}
                        />
                        <TeamMember
                            name="Fatima Zahra El Amri"
                            role={t("aboutPage.feedback.role2")}
                            speciality={t("aboutPage.feedback.speciality2")}
                            experience="12"
                            achievements={[
                                t("aboutPage.feedback.Réalisations1"),
                                t("aboutPage.feedback.Réalisations2"),
                                t("aboutPage.feedback.Réalisations3")
                            ]}
                        />
                        <TeamMember
                            name="Mohamed Tahiri"
                            role={t("aboutPage.feedback.role3")}
                            speciality={t("aboutPage.feedback.speciality3")}
                            experience="10"
                            achievements={[
                                t("aboutPage.feedback.Réalisations1"),
                                t("aboutPage.feedback.Réalisations2"),
                                t("aboutPage.feedback.Réalisations3")
                            ]}
                        />
                    </div>

                    {/* Team Stats */}
                    <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="group">
                                <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                                <div className="text-gray-600 font-medium">Experts</div>
                            </div>
                            <div className="group">
                                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">15</div>
                                <div className="text-gray-600 font-medium">Départements</div>
                            </div>
                            <div className="group">
                                <div className="text-3xl font-bold text-yellow-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                                <div className="text-gray-600 font-medium">Engagement</div>
                            </div>
                            <div className="group">
                                <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                                <div className="text-gray-600 font-medium">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProposNous;