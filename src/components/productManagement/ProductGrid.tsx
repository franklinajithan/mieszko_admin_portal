import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";

export default function ProductGrid() {
  const { t } = useTranslation("global");
  const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
  const [skin, setSkin] = useState(currentSkin);

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item active" aria-current="page">
                Website Analytics
              </li>
            </ol>
            <h4 className="main-title mb-0">{t("header.message")}</h4>
          </div>

          <nav className="nav-icon nav-icon-lg">
            <button className="tooltip" aria-label="Share">
              <i className="ri-share-line"></i>
            </button>
            <button className="tooltip" aria-label="Print">
              <i className="ri-printer-line"></i>
            </button>
            <button className="tooltip" aria-label="Report">
              <i className="ri-bar-chart-2-line"></i>
            </button>
          </nav>
        </div>

        <div className="grid gap-3 justify-center">
          <div className="col-span-1 md:col-span-6 xl:col-span-4">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <h3 className="card-value mb-1">4,608</h3>
                    <label className="card-title font-medium text-dark mb-1">
                      Click Through
                    </label>
                    <span className="block text-muted text-xs font-secondary leading-4">
                      No. of clicks to ad that consist of a single impression.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 xl:col-span-4">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <h3 className="card-value mb-1">4,868</h3>
                    <label className="card-title font-medium text-dark mb-1">
                      View Through
                    </label>
                    <span className="block text-muted text-xs font-secondary leading-4">
                      Estimated daily unique views per visitor on the ads.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 xl:col-span-4">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <h3 className="card-value mb-1">8,785</h3>
                    <label className="card-title font-medium text-dark mb-1">
                      Total Conversions
                    </label>
                    <span className="block text-muted text-xs font-secondary leading-4">
                      Estimated total conversions on ads per impressions.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-7 xl:col-span-8">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Organic Visits & Conversions</h6>
                <nav className="nav-icon nav-icon-sm ms-auto">
                  <button>
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button>
                    <i className="ri-more-2-fill"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-5 xl:col-span-4">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Analytics Performance</h6>
                <nav className="nav-icon nav-icon-sm ms-auto">
                  <button>
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button>
                    <i className="ri-more-2-fill"></i>
                  </button>
                </nav>
              </div>
              <div className="card-body p-3">
                <h2 className="performance-value mb-0">
                  9.8{" "}
                  <small className="text-success flex items-center">
                    <i className="ri-arrow-up-line"></i> 2.8%
                  </small>
                </h2>

                <label className="card-title text-sm font-medium">
                  Performance Score
                </label>

                <div className="progress h-2 mt-2 mb-4">
                  <div className="bg-primary w-1/2"></div>
                  <div className="bg-green-500 w-1/4"></div>
                  <div className="bg-orange-500 w-1/20"></div>
                  <div className="bg-pink-500 w-1/20"></div>
                  <div className="bg-blue-500 w-1/10"></div>
                  <div className="bg-indigo-500 w-1/20"></div>
                </div>

                <table className="table-fixed w-full">
                  <tbody>
                    {[
                      {
                        dot: "bg-primary",
                        label: "Excellent",
                        count: "3,007",
                        percent: "50%",
                      },
                      {
                        dot: "bg-green-500",
                        label: "Very Good",
                        count: "1,674",
                        percent: "25%",
                      },
                      {
                        dot: "bg-orange-500",
                        label: "Good",
                        count: "125",
                        percent: "6%",
                      },
                      {
                        dot: "bg-pink-500",
                        label: "Fair",
                        count: "98",
                        percent: "5%",
                      },
                      {
                        dot: "bg-blue-500",
                        label: "Poor",
                        count: "512",
                        percent: "10%",
                      },
                      {
                        dot: "bg-indigo-500",
                        label: "Very Poor",
                        count: "81",
                        percent: "4%",
                      },
                    ].map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className={"badge-dot " + item.dot}></div>
                        </td>
                        <td>{item.label}</td>
                        <td>{item.count}</td>
                        <td>{item.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Acquisition</h6>
                <nav className="nav-icon nav-icon-sm ms-auto">
                  <button>
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button>
                    <i className="ri-more-2-fill"></i>
                  </button>
                </nav>
              </div>
              <div className="card-body">
                <p className="text-sm mb-4">
                  Tells you where your visitors originated from, such as search
                  engines, social networks, or website referrals.{" "}
                  <Link to="">Learn more</Link>
                </p>

                <div className="grid grid-cols-2 mb-2">
                  <div className="flex items-center">
                    <div className="card-icon bg-primary">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">33.50%</h4>
                      <span className="block text-sm font-medium">
                        Bounce Rate
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="card-icon bg-gray-200">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">9,065</h4>
                      <span className="block text-sm font-medium">
                        Page Sessions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 mb-2">
                  <div className="flex items-center">
                    <div className="card-icon bg-gray-200">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">1,005</h4>
                      <span className="block text-sm font-medium">
                        Pages/Session
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="card-icon bg-gray-200">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">00:01:21</h4>
                      <span className="block text-sm font-medium">
                        Avg. Session Duration
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="flex items-center">
                    <div className="card-icon bg-primary">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">88.24%</h4>
                      <span className="block text-sm font-medium">
                        New Sessions
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="card-icon bg-gray-200">
                      <i className="ri-line-chart-fill"></i>
                    </div>
                    <div className="ms-2">
                      <h4 className="card-value mb-1">44.28%</h4>
                      <span className="block text-sm font-medium">
                        Return Visitor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-6">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Audience Metrics</h6>
                <nav className="nav-icon nav-icon-sm ms-auto">
                  <button>
                    <i className="ri-refresh-line"></i>
                  </button>
                  <button>
                    <i className="ri-more-2-fill"></i>
                  </button>
                </nav>
              </div>
              <div className="card-body">
                <p className="text-sm">
                  Audience overview report of your active users on the site.
                </p>
                <ul className="list-unstyled">
                  {[
                    {
                      title: "Total Users",
                      count: "78,865",
                      color: "text-primary",
                    },
                    {
                      title: "Avg. Session",
                      count: "00:01:21",
                      color: "text-orange-500",
                    },
                    {
                      title: "Bounce Rate",
                      count: "33.50%",
                      color: "text-red-500",
                    },
                  ].map((metric, index) => (
                    <li
                      className="flex justify-between items-center mb-3"
                      key={index}
                    >
                      <span className={metric.color + " font-medium"}>
                        {metric.title}
                      </span>
                      <span>{metric.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
