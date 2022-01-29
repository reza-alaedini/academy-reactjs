import React, { useContext } from "react";
import { dashContext } from "../context/dashContext";
import Pagination from "../Course/Pagination";

const CourseTable = () => {
  const context = useContext(dashContext);

  const {
    currentPage,
    perPage,
    handleChangePage,
    courseData,
    openNewCourseDialog,
  } = context;

  return (
    <section style={{ padding: "1em 2em", marginTop: "60px" }}>
      <div>
        <div className="alert alert-info text-center">لیست دوره ها</div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn btn-primary" onClick={openNewCourseDialog}>
            <span className="fa fa-plus"></span> اضافه کردن دوره جدید
          </button>
          <input
            className="form-control"
            placeholder="جستجوی دوره"
            style={{ marginRight: "40em" }}
          />
        </div>

        <div>
          <table className="table" style={{ marginTop: "2em" }}>
            <thead>
              <tr>
                <th>عنوان دوره</th>
                <th>تصویر دوره</th>
                <th>قیمت دوره (تومان)</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>

            <tbody>
              {courseData.map((course) => (
                <tr>
                  <td>{course.title}</td>
                  <td>
                    <a
                      href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                      className="btn btn-primary"
                    >
                      تصویر دوره
                    </a>
                  </td>
                  <td>{course.price === 0 ? "رایگانــــ" : course.price}</td>
                  <td>
                    <button className="btn btn-warning">ویرایش</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="navbar-fixed-bottom"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "15em",
          }}
        >
          <Pagination
            totalCourses={courseData.length}
            currentPage={currentPage}
            perPage={perPage}
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseTable;
