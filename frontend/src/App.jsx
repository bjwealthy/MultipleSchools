import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Attendance from './school/components/attendance/Attendance';
import Examinations from './school/components/examinations/Examinations';
import Notice from './school/components/notice/Notice';
import Dashboard from './school/components/dashboard/Dashboard';
import Schedule from './school/components/schedule/Schedule';
import Students from './school/components/students/Students';
import Subjects from './school/components/subjects/Subjects';
import Teachers from './school/components/teachers/Teachers';
import Teacher from './teacher/Teacher'
import Class from './school/components/class/Class';
import School from './school/School';
import Client from './client/Client';
import Home from './client/components/home/Home';
import Register from './client/components/register/Register';
import Login from './client/components/login/Login';
import TeacherDetails from './teacher/components/teacher details/TeacherDetails';
import ScheduleTeacher from './teacher/components/schedule/ScheduleTeacher';
import AttendanceTeacher from './teacher/components/attendance/AttendanceTeacher';
import ExaminationsTeacher from './teacher/components/examinatins/ExaminationsTeacher';
import NoticeTeacher from './teacher/components/notice/NoticeTeacher';
import StudentDetails from './student/components/student details/StudentDetails';
import ScheduleStudent from './student/components/schedule/ScheduleStudent';
import AttendanceStudent from './student/components/attendance/AttendanceStudent';
import ExaminationStudent from './student/components/examination/ExaminationStudent';
import NoticeStudent from './student/components/notice/NoticeStudent';
import Student from './student/Student';
import ProtectedRoute from './guard/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* SCHOOL ROUTE */}
          <Route path='school' element={<ProtectedRoute allowedRoles={['SCHOOL']}><School /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='attendance' element={<Attendance />} />
            <Route path='class' element={<Class />} />
            <Route path='examination' element={<Examinations />} />
            <Route path='notice' element={<Notice />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='students' element={<Students />} />
            <Route path='subject' element={<Subjects />} />
            <Route path='teachers' element={<Teachers />} />
          </Route>

          {/* STUDENTS ROUTE */}
          <Route path="student" element={<ProtectedRoute allowedRoles={['STUDENT']}><Student /></ProtectedRoute>}>
            <Route index element={<StudentDetails />} />
            <Route path="schedule" element={<ScheduleStudent />} />
            <Route path="attendance" element={<AttendanceStudent />} />
            <Route path="examinations" element={<ExaminationStudent />} />
            <Route path="notice" element={<NoticeStudent />} />
          </Route>

          {/* TEACHER ROUTE */}
          <Route path="teacher" element={<ProtectedRoute allowedRoles={['TEACHER']}><Teacher /></ProtectedRoute>}>
            <Route index element={<TeacherDetails />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="attendance" element={<AttendanceTeacher />} />
            <Route path="examinations" element={<ExaminationsTeacher />} />
            <Route path="notice" element={<NoticeTeacher />} />
          </Route>

          {/* CLIENT ROUTE */}
          <Route path='/' element={<Client />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
