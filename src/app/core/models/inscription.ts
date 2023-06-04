import { Course } from "./course";
import { Student } from "./student";
import { Subject } from "./subject";

export interface Inscription {
    id: number,
    subjectId?: number,
    studentId?: number,
    courseId?: number
};

export interface InscriptionWithStudent extends Inscription {
   student?: Student
};
export interface InscriptionWithCourse extends Inscription {
    course?: Course
};
 export interface InscriptionWithSubject extends Inscription {
    subject?: Subject
};

export interface CreateInscriptionData {
    subjectId?: number,
    studentId?: number,
    courseId?: number
}

export type InscriptionWithAll = InscriptionWithStudent & InscriptionWithCourse & InscriptionWithSubject;