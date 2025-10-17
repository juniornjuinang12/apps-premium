import React from 'react';
import { Download, HardDrive, CheckCircle, ArrowRight } from 'lucide-react';

export default function AdobeDownloadGuide() {
  const adobeApps = [
    { name: 'Photoshop', description: 'Retouche photo et design graphique professionnel' },
    { name: 'Illustrator', description: 'Création de graphiques vectoriels et illustrations' },
    { name: 'Premiere Pro', description: 'Montage vidéo professionnel' },
    { name: 'After Effects', description: 'Effets visuels et motion design' },
    { name: 'InDesign', description: 'Mise en page et publication' },
    { name: 'Lightroom', description: 'Gestion et retouche de photos' },
    { name: 'Audition', description: 'Édition audio professionnelle' },
    { name: 'Media Encoder', description: 'Encodage et conversion de médias' }
  ];

  const steps = [
    {
      title: 'Étape 1 : Cliquez sur Télécharger',
      description: 'Cliquez sur le bouton de téléchargement en bas de cette page pour accéder au lien de téléchargement.',
      image: null
    },
    {
      title: 'Étape 2 : Connectez-vous à Terabox',
      description: 'Sur la page Terabox, créez un compte ou connectez-vous avec votre compte Google. Une fois connecté, cliquez sur le bouton "Téléchargement".',
      image: '/imageDemo/demo1.png'
    },
    {
      title: 'Étape 3 : Téléchargez Terabox Desktop',
      description: 'Téléchargez l\'application Terabox sur votre ordinateur si ce n\'est pas déjà fait. Patientez, puis dans la fenêtre qui apparaît, cliquez sur "Téléchargement".',
      image: '/imageDemo/telechargement 2.png'
    },
    {
      title: 'Étape 4 : Installez Terabox',
      description: 'Une fois le téléchargement de Terabox terminé, double-cliquez sur le fichier d\'installation et suivez la procédure. Attendez la fin de l\'installation.',
      image: '/imageDemo/atendez la fin de l\'instalation.png'
    },
    {
      title: 'Étape 5 : Connectez-vous sur Desktop',
      description: 'Ouvrez l\'application Terabox Desktop et connectez-vous avec le MÊME compte (par ID ou Google) que celui utilisé sur le site web. Assurez-vous d\'être connecté au même compte sur les deux plateformes.',
      image: '/imageDemo/connectez vous.png'
    },
    {
      title: 'Étape 6 : Lancez le transfert',
      description: 'Retournez sur le site web et recliquez sur "Téléchargement". Vous serez automatiquement redirigé vers l\'application Terabox Desktop. Cliquez sur "Transfert" pour voir la progression du téléchargement.',
      image: '/imageDemo/apres avoir cliquer sur le lien a nouveau .png'
    },
    {
      title: 'Étape 7 : Attendez la fin du téléchargement',
      description: 'Patientez pendant le téléchargement complet du pack Adobe (34 Go). Une fois terminé, vous pourrez extraire l\'archive et installer les applications Adobe sur votre ordinateur.',
      image: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Pack Adobe Complet
          </h1>
          <p className="text-xl text-purple-200">Téléchargez toutes les applications Adobe Creative Cloud</p>
        </div>

        {/* Espace requis */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-400/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <HardDrive className="w-12 h-12 text-red-400" />
              <h2 className="text-3xl font-bold text-red-300">Espace Requis</h2>
            </div>
            <p className="text-xl mb-2">
              <span className="font-bold text-2xl text-yellow-300">Minimum 45 Go</span> d'espace libre sur votre disque dur
            </p>
            <p className="text-purple-200">Le fichier archive pèse <span className="font-bold text-yellow-300">34 Go</span></p>
          </div>
        </div>

        {/* Applications incluses */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Applications Incluses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adobeApps.map((app, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-400/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-purple-100">{app.name}</h3>
                </div>
                <p className="text-purple-200 text-sm">{app.description}</p>
                <div className="mt-4 h-24 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/50">{app.name.substring(0, 2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide d'installation */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Guide d'Installation Étape par Étape
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-blue-200">{step.title}</h3>
                    <p className="text-purple-200 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {step.image && (
                  <div className="mt-6 rounded-xl overflow-hidden border-2 border-purple-400/30 shadow-lg">
                    <img
                      src={step.image}
                      alt={`Illustration ${step.title}`}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-12 text-center"><p class="text-purple-300">Image: ' + step.image + '</p></div>';
                      }}
                    />
                  </div>
                )}
                
                {!step.image && index === 0 && (
                  <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-12 border-2 border-dashed border-purple-400/50">
                    <p className="text-center text-purple-300">Cliquez sur le bouton de téléchargement ci-dessous ↓</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de téléchargement animé */}
        <div className="flex justify-center">
          <a
            href="https://www.terabox.app/sharing/link?surl=QVTbKNmszKu1TcKfJQ1Suw"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          >
            <Download className="w-8 h-8 group-hover:animate-bounce" />
            <span>Télécharger le Pack Adobe</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
          </a>
        </div>

        {/* Footer info */}
        <div className="text-center mt-12 text-purple-300">
          <p className="text-sm">Une fois le téléchargement terminé, suivez les instructions d'installation incluses dans l'archive</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}