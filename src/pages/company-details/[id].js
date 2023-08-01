import { Col, Form, Row, Table } from "react-bootstrap";
import { t } from "i18next";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SortableTableHead from "@/components/company-list/SortableTableHead";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Head from "next/head";
import { BiEdit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import EditModal from "@/components/company-list/EditModal";
import WarningModal from "@/components/elements/WarningModal";
import { checkLogin } from "@/actions/LoginActions";
import {
  getCloudCompanyDetails,
  getCloudModules,
  changeCloudUserStatus,
} from "@/actions/CloudActions";
import i18n from "@/helpers/translation/i18n";
import { capitalize } from "lodash";
import Loading from "@/components/elements/Loading";
import { toast } from "react-toastify";

function CompanyDetails({ compInfo, moduleList, companyId, token }) {
  const [unfilteredList, setUnfilteredList] = useState(compInfo.users);
  const [filteredList, setFilteredList] = useState(compInfo.users);
  const [page, setPage] = useState(1);
  const pageLimit = 20;
  const [modules, setModules] = useState(
    moduleList.filter((item) => compInfo.cloud_modules.includes(item.id))
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    user_id: 0,
    is_active: null,
  });

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

  const [selectedModules, setSelectedModules] = useState([]);

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
    setFilteredList(
      unfilteredList.filter(({ name }) =>
        name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
    );
  };

  const handleEditModule = async () => {
    setLoading(true);
    let newInfo = await getCloudCompanyDetails(token, companyId);
    setLoading(false);
    setModules(
      moduleList.filter((item) => newInfo.cloud_modules.includes(item.id))
    );
  };

  const handleChangeUserStatus = async () => {
    setLoading(true);
    let response = await changeCloudUserStatus(token, selectedUser);
    setLoading(false);
    if (response.status === "success") {
      setLoading(true);
      let newInfo = await getCloudCompanyDetails(token, companyId);
      setLoading(false);
      setUnfilteredList(newInfo.users);
      setFilteredList(newInfo.users);
      toast.success(t("user-status-changed"));
    } else {
      toast.error(t("unexpected-error"));
    }
  };

  return (
    <>
      <Head>
        <title>{t("company-info") + ` | ${compInfo.name}`}</title>
      </Head>
      {loading ? <Loading /> : null}
      <div>
        <Tooltip id="edit" style={{ zIndex: 1 }} />
        {selectedModules.length > 0 ? (
          <EditModal
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
            action={handleEditModule}
            data={{
              id: compInfo.id,
              modules: selectedModules,
            }}
            moduleList={moduleList}
            token={token}
            setLoading={setLoading}
          />
        ) : null}
        {selectedUser.user_id > 0 ? (
          <WarningModal
            modalOpen={warningModal}
            setModalOpen={setWarningModal}
            text={t("approve-activate")}
            action={handleChangeUserStatus}
          />
        ) : null}
        <h3>{t("company-info")}</h3>
        <div
          style={{
            background: "bisque",
            padding: 20,
            borderRadius: 8,
            marginBottom: 30,
          }}
        >
          <Row>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("comp-name")}:{" "}
                </label>
                <span> {compInfo.name}</span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("comp-mail")}:{" "}
                </label>
                <span> {compInfo.email}</span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("auth-name")}:{" "}
                </label>
                <span> {compInfo.related_person_name}</span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("auth-mail")}:{" "}
                </label>
                <span> {compInfo.related_person_email}</span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("membership-type")}:{" "}
                </label>
                <span>
                  {" "}
                  {capitalize(compInfo.membership_type)}&nbsp;
                  {compInfo.membership_type.includes("emo") && (
                    <span>
                      ({compInfo.days} {t("days-left")})
                    </span>
                  )}
                </span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <label style={{ transform: "translateY(0)" }}>
                {t("active-user")}:{" "}
              </label>
              <span> {compInfo.active_user_count}</span>
            </Col>
            <Col xl={3} lg={4} md={6} className="mb-2">
              <div>
                <label style={{ transform: "translateY(0)" }}>
                  {t("comp-lang")}:{" "}
                </label>
                <span>
                  {compInfo.language === "tr" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      className="rounded mr-2"
                      id="flag-icon-css-tr"
                      viewBox="0 0 512 512"
                      style={{ marginBottom: 3, marginLeft: 5 }}
                    >
                      <g fillRule="evenodd">
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
                      className="rounded mr-2"
                      src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-250.png"
                      alt="uk-flag"
                      style={{
                        width: 18,
                        height: 18,
                        marginBottom: 3,
                        marginLeft: 5,
                      }}
                    ></img>
                  )}
                </span>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <label style={{ transform: "translateY(0)" }}>
                {t("module")}:{" "}
                <BiEdit
                  size={25}
                  style={{
                    cursor: "pointer",
                    transform: "translate(1px,-1px)",
                  }}
                  data-tooltip-id="edit"
                  data-tooltip-content={t("edit-module")}
                  onClick={() => {
                    setSelectedModules(modules.map((item) => item.id));
                    setEditModalOpen(true);
                  }}
                />
              </label>
              <ul>
                {modules?.map((module, index) => (
                  <li key={index}>
                    <span> {module.name}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <div className="d-flex flex-row"></div>
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
              <input
                type="text"
                className="form-control"
                placeholder={t("search")}
                onChange={handleSearch}
              />
            </div>
          </div>
        </row>

        <Table striped bordered variant="light" responsive>
          <SortableTableHead columns={columns} sortDataBy={sortDataBy} />
          {filteredList.length ? (
            <tbody>
              {filteredList
                .slice((page - 1) * pageLimit, page * pageLimit)
                .map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
                    <td>
                      {i18n.language == "TR"
                        ? row.user_type_title
                        : row.user_type_title_en}
                    </td>
                    <td>{row.phone}</td>
                    <td>{row.company}</td>
                    <td>{row.team}</td>
                    <td>{row.customer}</td>
                    <td className="d-flex">
                      <Form.Check
                        type="switch"
                        checked={row.is_active}
                        isValid={row.is_active && true}
                        isInvalid={!row.is_active && true}
                        onClick={() => {
                          setSelectedUser({
                            user_id: row.id,
                            is_active: row.is_active,
                          });
                          setWarningModal(true);
                        }}
                        readOnly
                      />
                      <span>{row.is_active ? t("active") : t("passive")}</span>
                    </td>
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

export async function getServerSideProps({ req, params }) {
  const token = req.cookies.token;
  const isLogged = await checkLogin(token);
  if (!isLogged) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const companyId = params.id;
  const compInfo = await getCloudCompanyDetails(token, companyId);
  if (!compInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const moduleList = await getCloudModules(token);
  return {
    props: {
      compInfo,
      moduleList,
      companyId,
      token,
    },
  };
}
