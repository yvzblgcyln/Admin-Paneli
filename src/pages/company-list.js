import { Table } from "react-bootstrap";
import { t } from "i18next";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";
import SortableTableHead from "@/components/company-list/SortableTableHead";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Tooltip } from "react-tooltip";
import WarningModal from "@/components/elements/WarningModal";
import { toast } from "react-toastify";
import EditModal from "@/components/company-list/EditModal";

const rows = [
  {
    id: 1,
    membership_type: "Premium",
    name: "aTest name",
    email: "atest@asd.a",
    related_person_name: "ayavuz",
    related_person_email: "yazvu@ajlksdk.sas",
    cloud_modules: [1, 2, 3],
    language: "en",
    active_user_count: 15,
  },
  {
    id: 2,
    membership_type: "Demo",
    days: 10,
    name: "bTest name",
    email: "ctest@asd.a",
    related_person_name: "cyavuz",
    related_person_email: "yazvu@ajlksdk.sas",
    cloud_modules: [1, 2, 3],
    language: "tr",
    active_user_count: 15,
  },
  {
    id: 3,
    membership_type: "Demo",
    days: 50,
    name: "dTest name",
    email: "atest@asd.a",
    related_person_name: "byavuz",
    related_person_email: "yazvu@ajlksdk.sas",
    cloud_modules: [1, 2, 3],
    language: "en",
    active_user_count: 25,
  },
  {
    id: 4,
    membership_type: "Demo",
    days: 30,
    name: "cTest name",
    email: "dtest@asd.a",
    related_person_name: "dyavuz",
    related_person_email: "yazvu@ajlksdk.sas",
    cloud_modules: [1, 2, 3],
    language: "en",
    active_user_count: 5,
  },
];

export default function CompanyList() {
  const [filteredList, setFilteredList] = useState(rows);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [page, setPage] = useState(1);
  const pageLimit = 20;

  const columns = [
    { name: t("comp-name"), sortable: true, type: "name", integer: false },
    { name: t("comp-mail"), sortable: true, type: "email", integer: false },
    { name: t("membership-type"), sortable: true, type: "membership_type", integer: false },
    { name: t("auth-name"), sortable: true, type: "related_person_name", integer: false },
    { name: t("auth-mail"), sortable: true, type: "related_person_email", integer: false },
    { name: t("active-user"), sortable: true, type: "active_user_count", integer: true },
    { name: t("comp-lang"), sortable: true, type: "language", integer: false },
    { name: "", sortable: false, type: "customer", integer: false },
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

  const hanlePremiumAction = () => {
    console.log(selectedId);
    toast.success(t("upgrade-premium"));
  };

  return (
    <div>
      <WarningModal
        modalOpen={premiumModalOpen}
        setModalOpen={setPremiumModalOpen}
        text={t("approve-premium")}
        action={hanlePremiumAction}
      />
      <EditModal
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        action={hanlePremiumAction}
        data={selectedId}
      />
      <Tooltip id="premium" />
      <Tooltip id="edit" />
      <row className="d-flex justify-content-between row-responsive">
        <div className="col-lg-6 ">
          <h3>{t("company-list")}</h3>
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
      <Table striped bordered hover variant="light" responsive>
        <SortableTableHead columns={columns} sortDataBy={sortDataBy} />
        <tbody>
          {filteredList.slice((page - 1) * pageLimit, page * pageLimit).map((row) => (
            <tr>
              <td
                onClick={() => window.open(`/company-details/${row.id}`, "_blank")}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {row.name}
              </td>
              <td>{row.email}</td>
              <td>
                {row.membership_type}
                {row.membership_type.includes("emo") && (
                  <span>
                    ({row.days} {t("days-left")})
                  </span>
                )}
              </td>
              <td>{row.related_person_name}</td>
              <td>{row.related_person_email}</td>
              <td>{row.active_user_count}</td>
              <td style={{ textAlign: "center" }}>
                {row.language === "tr" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    class="rounded mr-2"
                    id="flag-icon-css-tr"
                    viewBox="0 0 512 512"
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
                    style={{ width: 24, height: 24 }}
                  ></img>
                )}
              </td>
              <td className="d-flex flex-row align-items-center" style={{ gap: 8 }}>
                <BiEdit
                  size={25}
                  style={{ cursor: "pointer" }}
                  data-tooltip-id="edit"
                  data-tooltip-content={t("edit-module")}
                  onClick={() => {
                    setSelectedId(row);
                    setEditModalOpen(true);
                  }}
                />
                <MdWorkspacePremium
                  size={25}
                  style={{ cursor: "pointer", marginTop: -4 }}
                  data-tooltip-id="premium"
                  data-tooltip-content={t("Premium")}
                  onClick={() => {
                    setPremiumModalOpen(true);
                    setSelectedId(row.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
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
  );
}
