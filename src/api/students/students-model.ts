export interface Student {
  id: string;
  name: string;
  score: number;
  subjects: string[];
}

const students: Student[] = [];

export const findAll = () => students;

export const findById = (id: string) =>
  students.find(student => student.id === id);

export const createStudent = (newStudent: Student) => {
  if (students.some(student => student.id === newStudent.id)) {
    throw new Error('The student exits');
  }

  students.push(newStudent);
};
