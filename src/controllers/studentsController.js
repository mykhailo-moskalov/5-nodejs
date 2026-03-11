// / Libraries
import createHttpError from 'http-errors';
// / Model
import { Student } from '../models/student.js';

// ! GET
export const getStudents = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    gender,
    minAvgMark,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * perPage;

  const studentsQuery = Student.find({ userId: req.user._id });

  if (search) studentsQuery.where({ $text: { $search: search } });
  // if (search) studentsQuery.where({ name: { $regex: search, $options: 'i' } });

  if (gender) studentsQuery.where('gender').equals(gender);

  if (minAvgMark) studentsQuery.where('avgMark').gte(minAvgMark);

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, students });
};

// ! GET
export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOne({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) throw createHttpError(404, 'Student not found');

  res.status(200).json(student);
};

// ! POST
export const createStudent = async (req, res) => {
  const student = await Student.create({ ...req.body, userId: req.user._id });

  res.status(201).json(student);
};

// ! DELETE
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndDelete({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) throw createHttpError(404, 'Student not found');

  res.status(200).json(student);
};

// ! PATCH
export const updateStudent = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndUpdate(
    { _id: studentId, userId: req.user._id },
    req.body,
    {
      new: true,
      // includeResultMetadata: true,
      // upsert: true,
    },
  );

  if (!student) throw createHttpError(404, 'Student not found');

  res.status(200).json(student);
};
