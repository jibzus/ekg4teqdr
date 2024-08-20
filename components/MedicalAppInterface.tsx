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
import ReactMarkdown from 'react-markdown';

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

**Patient Information**
The patient is a 28-year-old man with no other clinical information provided.

**Technical Quality**
The ECG is of good quality with all 12 leads visible. There are no significant artifacts affecting interpretation.

**Heart Rate and Rhythm**
The heart rate is approximately 88 beats per minute (calculated from the R-R interval). The rhythm is regular sinus rhythm.

**Intervals and Axes**
- PR interval: Normal, approximately 160 ms
- QRS duration: Normal, approximately 80 ms
- QT interval: Normal, approximately 360 ms
- QTc (using Bazett's formula): Normal, approximately 435 ms
- Cardiac axis: Normal

**Waveform Analysis**
- P waves: Normal morphology and duration
- QRS complexes: Normal morphology with appropriate R wave progression across precordial leads
- ST segments: No significant ST elevation or depression
- T waves: Upright in most leads, with slight flattening in leads III and aVF

**Specific Findings**
1. Sinus rhythm with normal rate
2. Normal intervals (PR, QRS, QT)
3. Normal axis
4. No signs of chamber enlargement or hypertrophy
5. No acute ischemic changes
6. Slight T wave flattening in leads III and aVF, which may be a normal variant but warrants attention

**Interpretation**
This ECG demonstrates a normal sinus rhythm without any significant abnormalities. The overall ECG is within normal limits for a 28-year-old male. The slight T wave flattening in leads III and aVF is noted but may be a normal variant. There are no signs of acute coronary syndrome, conduction abnormalities, or other pathological conditions.
`
  },
  'ECG 2': {
    image: '/images/ecg2.jpeg',
    interpretation: `


**Patient Information**

The patient is an 83-year-old man with a history of aortic stenosis.

**Technical Quality**

The ECG quality is good. All 12 leads are visible, and there are no significant artifacts that would interfere with interpretation.

**Heart Rate and Rhythm**

The heart rate is approximately 75 beats per minute, calculated using the R-R interval method. The rhythm is irregularly irregular, consistent with atrial fibrillation.

**Intervals and Axes**

- PR interval: Not applicable due to atrial fibrillation

- QRS duration: Prolonged at approximately 120-130 ms

- QT interval: Difficult to measure accurately due to atrial fibrillation, but appears prolonged

- QTc: Cannot be accurately calculated due to irregular rhythm

- Cardiac axis: Left axis deviation

** Waveform Analysis**

- P waves: Absent, replaced by fibrillatory waves typical of atrial fibrillation

- QRS complexes: Widened with a qR pattern in lead I and aVL, and an rS pattern in leads V1-V3

- ST segments: ST depression visible in lateral leads (I, aVL, V5-V6)

- T waves: T wave inversion in lateral leads (I, aVL, V5-V6)

**Specific Findings**

1. Atrial fibrillation with rapid ventricular response

2. Left bundle branch block (LBBB)

3. Left ventricular hypertrophy (LVH) - likely due to aortic stenosis

4. ST-T wave changes consistent with LVH strain pattern

5. Possible left atrial enlargement (difficult to assess due to atrial fibrillation)

**Interpretation**

This ECG shows atrial fibrillation with a rapid ventricular response in an 83-year-old man with known aortic stenosis. There is evidence of left bundle branch block, which can mask other ECG changes. The presence of left ventricular hypertrophy is consistent with the patient's history of aortic stenosis. The ST-T wave changes in the lateral leads are consistent with a strain pattern often seen in LVH. 

The combination of atrial fibrillation, LBBB, and LVH suggests significant cardiac remodeling and increased risk for adverse cardiac events. The rapid ventricular rate in the setting of atrial fibrillation and aortic stenosis may lead to hemodynamic compromise.
    `
  },
  'ECG 3': {
    image: '/images/ecg3.jpeg',
    interpretation: `
      

**Patient Information**
A 79-year-old man presenting with 5 hours of chest pain.

**Technical Quality**
The ECG quality appears adequate for interpretation. All 12 leads are visible, and there are no significant artifacts that would interfere with analysis.

**Heart Rate and Rhythm**
The heart rate is approximately 75 beats per minute, calculated using the R-R interval method. The rhythm is regular and appears to be sinus rhythm, as evidenced by the presence of P waves before each QRS complex.

**Intervals and Axes**
- PR interval: Normal, approximately 160-180 ms
- QRS duration: Normal, approximately 80-100 ms
- QT interval: Normal, approximately 360-400 ms
- Cardiac axis: Normal, between 0 and +90 degrees

**Waveform Analysis**
- P waves: Normal morphology and duration
- QRS complexes: Normal duration and morphology in most leads, with significant Q waves in leads II, III, and aVF
- ST segments: Significant ST-segment elevation in leads II, III, and aVF; reciprocal ST depression in leads I and aVL
- T waves: T wave inversion in leads II, III, and aVF

**Specific Findings**
1. ST-segment elevation in leads II, III, and aVF, consistent with acute inferior myocardial infarction
2. Reciprocal ST depression in leads I and aVL
3. Pathological Q waves in leads II, III, and aVF, suggesting evolving inferior myocardial infarction
4. No signs of right ventricular involvement (no ST elevation in V1)
5. No signs of posterior involvement (no prominent R waves in V1-V2)

**Interpretation**
This ECG is consistent with an acute ST-elevation myocardial infarction (STEMI) in the inferior wall. The presence of pathological Q waves suggests that the infarction is evolving and may have been ongoing for several hours, which aligns with the patient's reported 5 hours of chest pain. The lack of ST elevation in V1 suggests that right ventricular involvement is less likely, but cannot be completely ruled out without right-sided leads.
    `
  }
};

const MedicalAppInterface: React.FC = () => {
  const [selectedECG, setSelectedECG] = useState<string>('ECG 1');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [patientInfo, setPatientInfo] = useState('');

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
              <ReactMarkdown>{ecgInterpretations[selectedECG].interpretation}</ReactMarkdown>
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
          <div className="flex flex-col gap-4 p-4">
            <Input
              placeholder="Enter patient information (e.g., age, symptoms)"
              value={patientInfo}
              onChange={(e) => setPatientInfo(e.target.value)}
            />
            </div>
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