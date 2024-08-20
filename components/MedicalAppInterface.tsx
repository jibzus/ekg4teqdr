'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Mic, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from 'next/image';

interface ECGInterpretations {
  [key: string]: {
    image: string;
    interpretation: string;
  };
}

const ecgInterpretations: ECGInterpretations = {
  'ECG 1': {
    image: '/images/ecg1.jpeg',
    interpretation: `
      Normal Sinus Rhythm
      
      The ECG shows a normal sinus rhythm with a rate of 72 beats per minute. The PR interval is within normal limits at 160ms. The QRS complex duration is normal at 88ms. The QT/QTc intervals are within normal range.
      
      There are no significant ST segment or T wave abnormalities noted. The axis is normal. There are no signs of chamber enlargement or hypertrophy.
      
      Overall, this appears to be a normal ECG. However, please note that this interpretation is preliminary and should be confirmed by a qualified healthcare professional.
    `
  },
  'ECG 2': {
    image: '/images/ecg2.jpeg',
    interpretation: `
      Atrial Fibrillation
      
      The ECG demonstrates atrial fibrillation with an irregular ventricular response. The average ventricular rate is approximately 110 beats per minute. There is an absence of distinct P waves, replaced by fibrillatory waves.
      
      The QRS complexes are narrow, measuring 90ms. There are no significant ST segment deviations or T wave abnormalities. The axis appears normal.
      
      This ECG is consistent with atrial fibrillation. Further clinical correlation and comparison with previous ECGs is recommended. Consider anticoagulation therapy based on the patient's risk factors.
    `
  },
  'ECG 3': {
    image: '/images/ecg3.jpeg',
    interpretation: `
      Left Bundle Branch Block (LBBB)
      
      The ECG shows a sinus rhythm with a rate of 78 beats per minute. The PR interval is slightly prolonged at 220ms. The QRS complexes are widened, measuring 140ms, which is consistent with a left bundle branch block (LBBB).
      
      Characteristic features of LBBB are present:
      - QS or rS complex in V1
      - Broad, notched R waves in leads I, aVL, V5, and V6
      - Absent Q waves in leads I, V5, and V6
      - ST segment and T wave discordant to the QRS complex
      
      Due to the presence of LBBB, assessment for myocardial ischemia is limited. Clinical correlation and comparison with previous ECGs is strongly recommended. Further cardiac evaluation may be necessary.
    `
  }
};

const MedicalAppInterface: React.FC = () => {
  const [selectedECG, setSelectedECG] = useState<string>('ECG 1');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  const ECGCard: React.FC<{ ecg: string }> = ({ ecg }) => (
    <Card 
      className={`mb-4 cursor-pointer ${selectedECG === ecg ? 'border-primary' : ''}`}
      onClick={() => setSelectedECG(ecg)}
    >
      <CardHeader className="pb-2">
        <CardTitle>{ecg}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image 
          src={ecgInterpretations[ecg].image} 
          alt={`ECG ${ecg}`} 
          width={300} 
          height={200} 
          layout="responsive"
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
          <h1 className="text-2xl font-bold">ECG Interpretation for TEQDR</h1>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> New ECG
          </Button>
        </header>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column */}
          <Card className="w-1/2 rounded-none border-r">
            <CardHeader>
              <CardTitle>ECG List</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {Object.keys(ecgInterpretations).map((ecg) => (
                  <ECGCard key={ecg} ecg={ecg} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Column */}
          <Card className="w-1/2 rounded-none flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Draft Interpretation of {selectedECG}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 mb-4">
                <div className="whitespace-pre-wrap">{ecgInterpretations[selectedECG].interpretation}</div>
              </ScrollArea>
              <Button className="w-full mt-auto">Generate Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Button */}
      <Button
        className="fixed bottom-14 right-4 rounded-full"
        size="icon"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Sidebar */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col p-0">
          <SheetHeader className="px-4 py-2">
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-grow px-4">
              <div className="flex flex-col justify-end min-h-full py-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Teqdr</CardTitle>
                    </CardHeader>
                    <CardContent>
                      Would you like to make any changes?
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Dr Kabunga</CardTitle>
                    </CardHeader>
                    <CardContent>
                      Yes. There are a few peculiarities to take account of.
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex items-center">
                <Input className="flex-grow" placeholder="Type your message..." />
                <Button size="icon" variant="ghost" className="ml-2">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New ECG</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md">
            <Button variant="outline" className="mb-2">
              <Upload className="mr-2 h-4 w-4" /> Choose File
            </Button>
            <Button>
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalAppInterface;