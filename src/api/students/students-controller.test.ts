import { Request, Response } from 'express';
import { StudentModel } from './student-schema';
import {
  getStudentByIdController,
  getStudentsController,
} from './students-controllers';

describe('Given a getStudentsController function from studentsContoller', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const students = [
    {
      id: 'studentID',
      name: 'Alex',
      score: 0,
      subjects: ['deepWeb101'],
    },
  ];

  test('when the database response is successfull it, then it should respond with a list of students', async () => {
    StudentModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(students),
    }));
    await getStudentsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(students);
  });
  test('when the database throws an error then it should the error should not be captured', async () => {
    StudentModel.find = jest.fn().mockImplementationOnce(() => {
      throw new Error('somethign was wrong');
    });
    expect(async () => {
      await getStudentsController(request, response as Response, jest.fn());
    }).rejects.toThrow();
  });
});

describe('Given a getStudentByIdController from studentController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    locals: {
      email: 'alex@test.test',
    },
  } as Partial<Response>;

  const student = {
    id: 'mockId',
    name: 'Alex',
    score: 0,
    subjects: ['deepWeb101'],
  };

  StudentModel.findById = jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(student),
  }));

  test('when the user exists then it should respond with a student', async () => {
    await getStudentByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(student);
  });
});
