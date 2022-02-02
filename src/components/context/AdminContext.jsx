import React, { useState } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../util/paginate";
import NewCourseDialog from "./../admin/dialogs/newCourseDialog";
import EditCourseDialog from "../admin/dialogs/EditDialog";

const AdminContext = ({ children, courses }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [currentCourse, setCurrentCourse] = useState({});
  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [editCourseDialog, setEditCourseDialog] = useState(false);

  const openNewCourseDialog = () => setNewCourseDialog(true);
  const closeNewCourseDialog = () => setNewCourseDialog(false);

  const openEditCourseDialog = (course) => {
    setEditCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeEditCourseDialog = () => setEditCourseDialog(false);

  const handleChangePage = (page) => {
    setcurrentPage(page);
  };

  const courseData = paginate(courses, currentPage, perPage);

  return (
    <dashContext.Provider
      value={{
        currentPage,
        perPage,
        handleChangePage,
        courseData,
        openNewCourseDialog,
        openEditCourseDialog,
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
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
