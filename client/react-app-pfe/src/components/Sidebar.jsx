import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const [tab, setTab] = useState("");
  const [section, setSection] = useState("");
  const payloadSM = JSON.parse(localStorage.getItem("payload_SM"));

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const sectionFromUrl = urlParams.get("section");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      setSection();
    }
    if (sectionFromUrl) {
      setSection(sectionFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/dashboard" className="block">
            <div className="flex items-center mb-6 text-2xl font-bold text-white">
              Iset PFE
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Gestion PFE */}
              {payloadSM && payloadSM.role == "responsable" && (
                <SidebarLinkGroup activecondition={section === "PFE"}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${
                            section === "PFE"
                              ? "hover:text-slate-200"
                              : "hover:text-white"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className={`fill-current ${
                                    section === "PFE"
                                      ? "text-indigo-300"
                                      : "text-slate-400"
                                  }`}
                                  d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                />
                                <path
                                  className={`fill-current ${
                                    section === "PFE"
                                      ? "text-indigo-600"
                                      : "text-slate-700"
                                  }`}
                                  d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                />
                                <path
                                  className={`fill-current ${
                                    section === "PFE"
                                      ? "text-indigo-500"
                                      : "text-slate-600"
                                  }`}
                                  d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Gestion PFE
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                  open && "rotate-180"
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                            {/* Sous Links */}
                            {/* Validation Stage */}
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/dashboard?tab=VaildationStage&section=PFE"
                                className={
                                  "block transition duration-150 truncate " +
                                  (tab === "VaildationStage"
                                    ? "text-indigo-500"
                                    : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Validation Stage
                                </span>
                              </NavLink>
                            </li>
                            {/* Validation Resultat */}
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/dashboard?tab=VaildationResultat&section=PFE"
                                className={
                                  "block transition duration-150 truncate " +
                                  (tab === "VaildationResultat"
                                    ? "text-indigo-500"
                                    : "text-slate-400 hover:text-slate-200")
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Validation Resultat
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}

              {/* Stage */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  tab === "Stage" && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard?tab=Stage"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    tab === "Stage"
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          tab === "Stage" ? "text-indigo-500" : "text-slate-600"
                        }`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current ${
                          tab === "Stage" ? "text-indigo-300" : "text-slate-400"
                        }`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Stage
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* DemandeEncadrement */}
              {payloadSM && payloadSM.role == "enseignant" && (
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    tab === "DemandeEncadrement" && "bg-slate-900"
                  }`}
                >
                  <NavLink
                    end
                    to="/dashboard?tab=DemandeEncadrement"
                    className={`block text-slate-200 truncate transition duration-150 ${
                      tab === "DemandeEncadrement"
                        ? "hover:text-slate-200"
                        : "hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            tab === "DemandeEncadrement"
                              ? "text-indigo-500"
                              : "text-slate-600"
                          }`}
                          d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                        />
                        <path
                          className={`fill-current ${
                            tab === "DemandeEncadrement"
                              ? "text-indigo-300"
                              : "text-slate-400"
                          }`}
                          d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                        />
                      </svg>

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Demandes d'Encadrement
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}
              {/* Soutenance */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  tab === "Soutenance" && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard?tab=Soutenance"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    tab === "Soutenance"
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          tab === "Soutenance"
                            ? "text-indigo-500"
                            : "text-slate-600"
                        }`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current ${
                          tab === "Soutenance"
                            ? "text-indigo-300"
                            : "text-slate-400"
                        }`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Soutenance
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Messages */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="#"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current ${
                            pathname.includes("messages")
                              ? "text-indigo-500"
                              : "text-slate-600"
                          }`}
                          d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                        />
                        <path
                          className={`fill-current ${
                            pathname.includes("messages")
                              ? "text-indigo-300"
                              : "text-slate-400"
                          }`}
                          d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Messages
                      </span>
                    </div>
                    {/* Badge */}
                    <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">
                        4
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
