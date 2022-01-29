import React, { useState } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../util/paginate";
import NewCourseDialog from "./../admin/dialogs/newCourseDialog";

const AdminContext = ({ children, courses }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [newCourseDialog, setNewCourseDialog] = useState(false);

  const openNewCourseDialog = () => setNewCourseDialog(true);
  const closeNewCourseDialog = () => setNewCourseDialog(false);

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
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDiaolg={closeNewCourseDialog}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
