import { useState } from "react";
import Drawer from "./components/Drawer";
import Navbar from "./components/Navbar";
import type { Consultation } from "./types";
import ChatWindow from "./components/ChatWindow";
import { consultations } from "./data/data";

function App() {
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  return (
    <>
      <div className="flex flex-row">
        <Drawer
          consultations={consultations} 
          onConsultationSelect={setSelectedConsultation}
        />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="p-6 w-full">
            {selectedConsultation ? (
              <ChatWindow consultation={selectedConsultation} />
            ) : (
              <p className=" mt-10 text-gray-500">Select a consultation</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
