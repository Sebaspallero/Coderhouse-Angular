import { Subject } from "./subject";

export interface Course {
    id: number,
    subjectId: number,
    startDate: Date,
    endDate: Date,
}

export interface CourseWithSubject extends Course {
    subject: Subject
 };