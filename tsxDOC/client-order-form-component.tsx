import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Calendar } from "lucide-react";

const ClientOrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl text-center font-semibold text-orange-500 mb-6">
        ORANGE - Nouvelle Commande Client
      </h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === currentStep 
                  ? 'bg-orange-500 text-white' 
                  : step < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              <div className="text-sm mt-2 text-center font-medium">
                {step === 1 ? 'Création client' : step === 2 ? 'Commande' : 'Expédition'}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute w-full top-0 h-1 bg-gray-200 z-0"></div>
          <div 
            className="absolute top-0 h-1 bg-orange-500 z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {currentStep === 1 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Etape 1 : création client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cust ID</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Prenom - Nom</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adresse</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code Postal</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ville</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone client</label>
              <Input type="tel" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tracking ID</label>
              <Input type="text" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={goToNextStep}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Etape 2 : Commande</h3>
          <div className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Reference</label>
                <select className="w-full rounded-md border border-gray-300 py-2 px-3 mt-1">
                  <option>...</option>
                  <option>20002 - ONT XS-010X-Q Post Orange</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">SN</label>
                <Input type="text" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">QT</label>
                <Input type="number" defaultValue="1" className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={goToPreviousStep}
            >
              Retour
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={goToNextStep}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Etape 3 : Expédition</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bon Transport</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Expédition</label>
              <div className="flex">
                <Input type="text" placeholder="mm/dd/yyyy" />
                <Button variant="ghost" size="icon" className="ml-1">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={goToPreviousStep}
            >
              Retour
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Expédition
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOrderForm;