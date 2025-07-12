import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';

const QRCodeGenerator = forwardRef(({ reservationData }, ref) => {
  const canvasRef = useRef(null);

  // Permet au parent d'accéder au canvas
  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current
  }));

  useEffect(() => {
    if (reservationData && canvasRef.current) {
      const qrData = {
        reservationId: reservationData.id,
        eventTitle: reservationData.event.titre,
        eventDate: reservationData.event.date,
        eventTime: reservationData.event.heure,
        eventLocation: reservationData.event.lieu,
        participantName: reservationData.paysan.nom,
        participantId: reservationData.paysan.identite,
        participantPhone: reservationData.paysan.telephone,
        participantEmail: reservationData.paysan.email,
        reservationDate: reservationData.dateReservation,
        status: reservationData.statut
      };

      const qrString = JSON.stringify(qrData);

      QRCode.toCanvas(canvasRef.current, qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [reservationData]);

  if (!reservationData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="qr-container rounded-xl p-6 mx-auto max-w-sm">
        <canvas
          ref={canvasRef}
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto">
        <h4 className="font-semibold text-gray-900 mb-3">Détails de la réservation :</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Participant :</span>
            <span className="font-medium">{reservationData.paysan.nom}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ID :</span>
            <span className="font-medium">{reservationData.paysan.identite}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Événement :</span>
            <span className="font-medium">{reservationData.event.titre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date :</span>
            <span className="font-medium">
              {new Date(reservationData.event.date).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Heure :</span>
            <span className="font-medium">{reservationData.event.heure}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Présentez ce QR code à l'entrée de l'événement pour confirmer votre participation.
      </p>
    </motion.div>
  );
});

export default QRCodeGenerator;
