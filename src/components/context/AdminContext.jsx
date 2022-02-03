import React, { useEffect, useState } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../util/paginate";
import NewCourseDialog from "./../admin/dialogs/newCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditDialog";
import DeleteCourseDialog from "../admin/dialogs/DeleteCourseDialog";

const AdminContext = ({ children, courses }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [currentCourse, setCurrentCourse] = useState({});
  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [editCourseDialog, setEditCourseDialog] = useState(false);
  const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [coursesList, setCoursesList] = useState([]);

  const openNewCourseDialog = () => setNewCourseDialog(true);
  const closeNewCourseDialog = () => setNewCourseDialog(false);

  useEffect(() => setCoursesList(courses), [courses]);

  const openEditCourseDialog = (course) => {
    setEditCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeEditCourseDialog = () => setEditCourseDialog(false);

  const openDeleteCourseDialog = (course) => {
    setDeleteCourseDialog(true);
    setCurrentCourse(course);
  };

  const closeDeleteCourseDialog = () => {
    setDeleteCourseDialog(false);
  };

  const handleChangePage = (page) => {
    setcurrentPage(page);
  };

  const filteredCourses = coursesList.filter((course) =>
    course.title.includes(search)
  );

  const courseData = paginate(filteredCourses, currentPage, perPage);

  return (
    <dashContext.Provider
      value={{
        currentPage,
        perPage,
        handleChangePage,
        courseData,
        openNewCourseDialog,
        openEditCourseDialog,
        openDeleteCourseDialog,
        setSearch,
        filteredCourses,
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDiaolg={closeNewCourseDialog}
      />
      <EditCourseDialog
        showDialog={editCourseDialog}
        closeDialog={closeEditCourseDialog}
        course={currentCourse}
      />
      <DeleteCourseDialog
        showDialog={deleteCourseDialog}
        closeDialog={closeDeleteCourseDialog}
        course={currentCourse}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
