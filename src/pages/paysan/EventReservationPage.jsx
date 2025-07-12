
import React, { useState, useEffect , useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, MapPin, Users, Clock, Download, CheckCircle } from 'lucide-react';
import { Button } from '../../components/PaysanCompo/button';
import { Input } from '../../components/PaysanCompo/input';
import { Card } from '../../components/PaysanCompo/card';
import { Badge } from '../../components/PaysanCompo/badge';
import { useToast } from '../../components/PaysanCompo/use-toast';
import QRCodeGenerator from '../../components/PaysanCompo/QRCodeGenerator';
import { Sidebar } from "../../components/PaysanCompo/sidebar";
import { Header } from "../../components/PaysanCompo/header";
import { Footer } from "../../components/PaysanCompo/footer";
import logo from '../../assets/ArmoiriesduMaroc.svg'; // Assuming you have a logo image

const EventReservationPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const canvasRef = useRef(null);
  const [reservationForm, setReservationForm] = useState({
    nom: '',
    identite: '',
    telephone: '',
    email: ''
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const { toast } = useToast();

  // Mock events data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        titre: 'Formation en Agriculture Biologique',
        description: 'Apprenez les techniques modernes de l\'agriculture biologique adaptées au climat marocain.',
        date: '2024-02-15',
        heure: '09:00',
        lieu: 'Centre de Formation Agricole, Casablanca',
        capacite: 50,
        inscrits: 32,
        prix: 'Gratuit',
        type: 'Formation',
        image: 'organic-farming-training',
        organisateur: 'Ministère de l\'Agriculture'
      },
      {
        id: 2,
        titre: 'Salon de l\'Innovation Agricole',
        description: 'Découvrez les dernières innovations technologiques pour l\'agriculture moderne.',
        date: '2024-02-20',
        heure: '10:00',
        lieu: 'Palais des Congrès, Marrakech',
        capacite: 200,
        inscrits: 145,
        prix: '150 DH',
        type: 'Salon',
        image: 'agricultural-innovation-expo',
        organisateur: 'AgriTech Maroc'
      },
      {
        id: 3,
        titre: 'Atelier Irrigation Intelligente',
        description: 'Techniques d\'irrigation économes en eau utilisant les technologies IoT.',
        date: '2024-02-25',
        heure: '14:00',
        lieu: 'Ferme Pilote, Meknès',
        capacite: 30,
        inscrits: 18,
        prix: '200 DH',
        type: 'Atelier',
        image: 'smart-irrigation-workshop',
        organisateur: 'WaterTech Solutions'
      },
      {
        id: 4,
        titre: 'Conférence sur l\'Agro-écologie',
        description: 'Stratégies durables pour une agriculture respectueuse de l\'environnement.',
        date: '2024-03-01',
        heure: '09:30',
        lieu: 'Université Hassan II, Casablanca',
        capacite: 100,
        inscrits: 67,
        prix: 'Gratuit',
        type: 'Conférence',
        image: 'agroecology-conference',
        organisateur: 'Université Hassan II'
      }
    ];
    
    setEvents(mockEvents);
  }, []);

  const handleReservation = (e) => {
    e.preventDefault();
    
    if (!selectedEvent || !reservationForm.nom || !reservationForm.identite) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const reservation = {
      id: Date.now(),
      event: selectedEvent,
      paysan: reservationForm,
      dateReservation: new Date().toISOString(),
      statut: 'confirmée'
    };

    setReservationData(reservation);
    setShowQRCode(true);
    
    toast({
      title: "Réservation confirmée !",
      description: "Votre QR code a été généré avec succès.",
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Formation': return 'bg-blue-100 text-blue-800';
      case 'Salon': return 'bg-purple-100 text-purple-800';
      case 'Atelier': return 'bg-green-100 text-green-800';
      case 'Conférence': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (inscrits, capacite) => {
    const ratio = inscrits / capacite;
    if (ratio < 0.5) return 'text-green-600';
    if (ratio < 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex h-screen bg-background text-foreground antialiased">
      <Sidebar />
      <Helmet>
        <title>Réservation d'Événements | AgriMaroc</title>
        <meta name="description" content="Réservez votre place aux événements agricoles au Maroc et obtenez votre QR code de participation." />
      </Helmet>

      <div className="flex flex-col flex-1 ">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="m-8 text-center "
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Événements Agricoles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Participez aux événements qui façonnent l'avenir de l'agriculture marocaine
          </p>
        </motion.div>
        {!showQRCode ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Events List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pl-8"
                  >
                    <Card className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedEvent?.id === event.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                          onClick={() => setSelectedEvent(event)}>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48 h-32 rounded-lg overflow-hidden">
                          <img  
                            alt={`Image de l'événement ${event.titre}`}
                            className="w-full h-full object-cover"
                            src={logo} />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.titre}</h3>
                              <p className="text-gray-600 leading-relaxed">{event.description}</p>
                            </div>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-600" />
                              <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span>{event.heure}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-600" />
                              <span className="truncate">{event.lieu}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Users className={`w-4 h-4 ${getAvailabilityColor(event.inscrits, event.capacite)}`} />
                              <span className={getAvailabilityColor(event.inscrits, event.capacite)}>
                                {event.inscrits}/{event.capacite} places
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-green-600">{event.prix}</div>
                            <div className="text-sm text-gray-500">Par {event.organisateur}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <Footer />
            </div>

            {/* Reservation Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24"
              >
                <Card className="p-6 card-shadow">
                  {selectedEvent ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Réserver votre place</h3>
                        <p className="text-sm text-gray-600">{selectedEvent.titre}</p>
                      </div>
                      
                      <form onSubmit={handleReservation} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet *
                          </label>
                          <Input
                            type="text"
                            value={reservationForm.nom}
                            onChange={(e) => setReservationForm({...reservationForm, nom: e.target.value})}
                            placeholder="Votre nom complet"
                            className="border-green-200 focus:border-green-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Numéro d'identité *
                          </label>
                          <Input
                            type="text"
                            value={reservationForm.identite}
                            onChange={(e) => setReservationForm({...reservationForm, identite: e.target.value})}
                            placeholder="Ex: AB123456"
                            className="border-green-200 focus:border-green-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone
                          </label>
                          <Input
                            type="tel"
                            value={reservationForm.telephone}
                            onChange={(e) => setReservationForm({...reservationForm, telephone: e.target.value})}
                            placeholder="+212 6 12 34 56 78"
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={reservationForm.email}
                            onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                            placeholder="votre@email.com"
                            className="border-green-200 focus:border-green-500"
                          />
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span>Prix:</span>
                            <span className="font-bold text-green-600">{selectedEvent.prix}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span>Places disponibles:</span>
                            <span className={getAvailabilityColor(selectedEvent.inscrits, selectedEvent.capacite)}>
                              {selectedEvent.capacite - selectedEvent.inscrits}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full agricultural-gradient text-white border-0 hover:scale-105 transition-transform"
                          disabled={selectedEvent.inscrits >= selectedEvent.capacite}
                        >
                          {selectedEvent.inscrits >= selectedEvent.capacite ? 'Complet' : 'Réserver maintenant'}
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un événement</h3>
                      <p className="text-gray-500">Choisissez un événement pour commencer votre réservation.</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        ) : (
          /* QR Code Display */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 text-center card-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Réservation Confirmée !</h2>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{reservationData?.event.titre}</h3>
                  <p className="text-gray-600 mb-4">
                    {new Date(reservationData?.event.date).toLocaleDateString('fr-FR')} à {reservationData?.event.heure}
                  </p>
                  <p className="text-sm text-gray-500">{reservationData?.event.lieu}</p>
                </div>
                
                <QRCodeGenerator ref={canvasRef} reservationData={reservationData} />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setShowQRCode(false);
                      setSelectedEvent(null);
                      setReservationForm({ nom: '', identite: '', telephone: '', email: '' });
                    }}
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                  >
                    Nouvelle Réservation
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const canvas = canvasRef.current?.getCanvas();
                      if (!canvas) return;
                      const url = canvas.toDataURL('image/png');
                      const link = document.createElement('a');
                      link.download = `reservation-${reservationData.id}.png`;
                      link.href = url;
                      link.click();
                    }}
                    className="agricultural-gradient text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger le QR Code
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EventReservationPage;
