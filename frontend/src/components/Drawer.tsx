import type { Consultation } from "../types";

interface DrawerProps {
  consultations: Consultation[];
  onConsultationSelect: (consultation: Consultation) => void;
}

const Drawer = ({ consultations, onConsultationSelect }: DrawerProps) => {
  return (
    <div className="h-screen">
      <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-24">
        <li className="disabled">
          <p className="text-xl mb-2 font-semibold">
            Select Consultation Below
          </p>
        </li>
        {consultations.map((consultation) => (
          <li key={consultation.consultationId}>
            <button
              className="btn btn-ghost text-left w-full justify-start"
              onClick={() => onConsultationSelect(consultation)}
            >
              <div>
                <p className="font-semibold">
                  Consultation #{consultation.consultationId}
                </p>
                <p className="text-sm text-gray-500">
                  {consultation.doctorName} ↔ {consultation.patientName}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
