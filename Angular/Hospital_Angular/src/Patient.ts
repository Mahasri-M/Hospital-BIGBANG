import { Course } from "./Course";

export class Patient {
  AppointmentId: number;
  PatientName: string;
  PatientEmail: string;
  Age: number;
  Gender: string;
  Slot: Date;
  Problem: string;
  Id: number;
  DoctorId: Course;
}
