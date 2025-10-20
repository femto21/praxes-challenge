export type UserRole = "doctor" | "patient";

export type Consultation = {
  consultationId: number;
  doctorName: string;
  patientName: string;
};

export interface Message {
  id: number;
  consultationId: number;
  author: string;
  authorRole: "doctor" | "patient";
  content: string;
  timestamp: string;
}
