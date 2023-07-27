import { Col, Row, Table } from "react-bootstrap";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SortableTableHead from "@/components/company-list/SortableTableHead";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Head from "next/head";

const rows = [
  {
    company: "Fiz Bili\u015fim",
    customer: "atest",
    email: "baaa@gmail.com",
    id: 88,
    is_active: true,
    name: "baaa deneme",
    phone: "123 1345",
    role: "Kullan\u0131c\u0131",
    status: "Aktif",
    team: "Yaz\u0131l\u0131m Geli\u015ftirme",
    user_type: "initial",
    user_type_id: 1,
    user_type_title: "\u015eirket Kullan\u0131c\u0131s\u0131",
    user_type_title_en: "Company User",
  },
  {
    company: "Fiz Bili\u015fim",
    customer: "testt",
    email: "aaa@gmail.com",
    id: 88,
    is_active: true,
    name: "aaa deneme",
    phone: "4562356",
    role: "aKullan\u0131c\u0131",
    status: "Aktif",
    team: "Yaz\u0131l\u0131m Geli\u015ftirme",
    user_type: "initial",
    user_type_id: 1,
    user_type_title: "\u015eirket Kullan\u0131c\u0131s\u0131",
    user_type_title_en: "Company User",
  },
];

const compInfo = {
  id: 1,
  membership_type: "Premium",
  name: "aTest name",
  email: "atest@asd.a",
  related_person_name: "ayavuz",
  related_person_email: "yazvu@ajlksdk.sas",
  cloud_modules: [1, 2, 3],
  language: "en",
  active_user_count: 15,
};

const modulList = [
  { id: 1, name: t("plan-management") },
  { id: 2, name: t("project-management") },
  { id: 3, name: t("support-management") },
  { id: 4, name: t("permit-management") },
  { id: 5, name: t("performance-management") },
  { id: 6, name: t("cv-management") },
  { id: 7, name: t("budget-management") },
];

function CompanyDetails() {
  const [filteredList, setFilteredList] = useState(rows);
  const [page, setPage] = useState(1);
  const pageLimit = 20;
  const [modules, setModules] = useState(modulList.filter((item) => compInfo.cloud_modules.includes(item.id)));

  const columns = [
    { name: t("name"), sortable: true, type: "name", integer: false },
    { name: t("mail"), sortable: true, type: "email", integer: false },
    { name: t("user-role"), sortable: true, type: "role", integer: false },
    { name: t("user-type"), sortable: true, type: "user_type", integer: false },
    { name: t("phone"), sortable: true, type: "phone", integer: false },
    { name: t("company"), sortable: true, type: "company", integer: false },
    { name: t("team"), sortable: true, type: "team", integer: true },
    { name: t("customer"), sortable: true, type: "customer", integer: false },
    { name: t("status"), sortable: true, type: "status", integer: false },
  ];

  const sortDataBy = (byKey, isInteger, sortDir) => {
    let userData = [...filteredList];
    if (!isInteger) {
      userData = userData.sort(function (a, b) {
        let x = a[byKey].toLowerCase();
        let y = b[byKey].toLowerCase();
        if (sortDir === "desc") return x.localeCompare(y, "tr");
        else {
          if (x.localeCompare(y, "tr") === 1) return -1;
          else if (x.localeCompare(y, "tr") === -1) return 1;
          else return 0;
        }
      });
    } else {
      userData = userData.sort(function (a, b) {
        if (sortDir === "desc") return a[byKey] - b[byKey];
        else return b[byKey] - a[byKey];
      });
    }
    setPage(1);
    setFilteredList(userData);
  };

  const handleSearch = (e) => {
    setFilteredList(rows.filter(({ name }) => name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
  };

  return (
    <>
      <Head>
        <title>{t("company-info") + ` | ${compInfo.name}`}</title>
      </Head>
      <div>
        <h3>{t("company-info")}</h3>
        <div style={{ background: "bisque", padding: 20, borderRadius: 8, marginBottom: 30 }}>
          <Row>
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("comp-name")}: </label>
                <span> {compInfo.name}</span>
              </div>
            </Col>
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("comp-mail")}: </label>
                <span> {compInfo.email}</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("membership-type")}: </label>
                <span> {compInfo.membership_type}</span>
              </div>
            </Col>
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("auth-name")}: </label>
                <span> {compInfo.related_person_name}</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("active-user")}: </label>
                <span> {compInfo.related_person_email}</span>
              </div>
            </Col>
            <Col md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>{t("comp-lang")}: </label>
                <span>
                  {compInfo.language === "tr" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      class="rounded mr-2"
                      id="flag-icon-css-tr"
                      viewBox="0 0 512 512"
                      style={{ marginBottom: 3, marginLeft: 5 }}
                    >
                      <g fill-rule="evenodd">
                        <path fill="#e30a17" d="M0 0h512v512H0z"></path>
                        <path
                          fill="#fff"
                          d="M348.8 264c0 70.6-58.3 127.9-130.1 127.9s-130.1-57.3-130.1-128 58.2-127.8 130-127.8S348.9 193.3 348.9 264z"
                        ></path>
                        <path
                          fill="#e30a17"
                          d="M355.3 264c0 56.5-46.6 102.3-104.1 102.3s-104-45.8-104-102.3 46.5-102.3 104-102.3 104 45.8 104 102.3z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M374.1 204.2l-1 47.3-44.2 12 43.5 15.5-1 43.3 28.3-33.8 42.9 14.8-24.8-36.3 30.2-36.1-46.4 12.8-27.5-39.5z"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <img
                      class="rounded mr-2"
                      src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-250.png"
                      alt="uk-flag"
                      style={{ width: 18, height: 18, marginBottom: 3, marginLeft: 5 }}
                    ></img>
                  )}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="d-flex flex-row">
              <label style={{ transform: "translateY(0)" }}>{t("module")}: </label>
              <div className="d-flex flex-row">
                {modules?.map((module, index) => (
                  <div key={index}>
                    <span> {module.name}</span>
                    {index + 1 !== modules.length && <span>, </span>}
                  </div>
                ))}
              </div>
            </div>
          </Row>
        </div>
        <row className="d-flex justify-content-between row-responsive">
          <div className="col-lg-6 ">
            <h3>{t("user-list")}</h3>
          </div>
          <div className="col-lg-6 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ height: "100%" }}>
                  <IoIosSearch />
                </span>
              </div>
              <input type="text" className="form-control" placeholder={t("search")} onChange={handleSearch} />
            </div>
          </div>
        </row>

        <Table striped bordered variant="light" responsive>
          <SortableTableHead columns={columns} sortDataBy={sortDataBy} />
          {filteredList.length ? (
            <tbody>
              {filteredList.slice((page - 1) * pageLimit, page * pageLimit).map((row) => (
                <tr>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>{row.user_type}</td>
                  <td>{row.phone}</td>
                  <td>{row.company}</td>
                  <td>{row.team}</td>
                  <td>{row.customer}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="empty-data">{t("no-result")}</div>
          )}
        </Table>

        <PaginationControl
          page={page}
          between={3}
          total={filteredList.length}
          limit={pageLimit}
          changePage={(page) => setPage(page)}
          ellipsis={1}
        />
      </div>
    </>
  );
}

export default CompanyDetails;
