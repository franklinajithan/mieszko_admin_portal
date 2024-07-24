import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button, Card, Col, Nav, OverlayTrigger, ProgressBar, Row, Table, Tooltip } from "react-bootstrap";

import ReactApexChart from "react-apexcharts";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import Header from "../../layouts/Header";
import "../../i18n";
import { useTranslation } from "react-i18next";
export default function ProductGrid() {
    const {t, i18n} =useTranslation("global");
    const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
    const [skin, setSkin] = useState(currentSkin);







  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">

        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">

              {/* <li className="breadcrumb-item"><Link href="#">Dashboard</Link></li> */}
              <li className="breadcrumb-item active" aria-current="page">Website Analytics</li>
            </ol>
            <h4 className="main-title mb-0">{t("header.message")}</h4>
          </div>

          <Nav as="nav" className="nav-icon nav-icon-lg">
            <OverlayTrigger overlay={<Tooltip>Share</Tooltip>}>
              <Nav.Link href=""><i className="ri-share-line"></i></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Print</Tooltip>}>
              <Nav.Link href=""><i className="ri-printer-line"></i></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Report</Tooltip>}>
              <Nav.Link href=""><i className="ri-bar-chart-2-line"></i></Nav.Link>
            </OverlayTrigger>
          </Nav>
        </div>

        <Row className="g-3 justify-content-center">
          <Col md="6" xl="4">
            <Card className="card-one">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <h3 className="card-value mb-1">4,608</h3>
                    <label className="card-title fw-medium text-dark mb-1">Click Through</label>
                    <span className="d-block text-muted fs-11 ff-secondary lh-4">No. of clicks to ad that consist of a single impression.</span>
                  </Col>
                  <Col xs="5">
                    {/* <ReactApexChart series={seriesOne} options={optionOne} type="bar" height={70} /> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" xl="4">
            <Card className="card-one">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <h3 className="card-value mb-1">4,868</h3>
                    <label className="card-title fw-medium text-dark mb-1">View Through</label>
                    <span className="d-block text-muted fs-11 ff-secondary lh-4">Estimated daily unique views per visitor on the ads.</span>
                  </Col>
                  <Col xs="5">
                    {/* <ReactApexChart series={seriesTwo} options={optionTwo} type="bar" height={70} /> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" xl="4">
            <Card className="card-one">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <h3 className="card-value mb-1">8,785</h3>
                    <label className="card-title fw-medium text-dark mb-1">Total Conversions</label>
                    <span className="d-block text-muted fs-11 ff-secondary lh-4">Estimated total conversions on ads per impressions.</span>
                  </Col>
                  <Col xs="5">
                    {/* <ReactApexChart series={seriesThree} options={optionThree} type="bar" height={70} /> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="7" xl="8">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Organic Visits &amp; Conversions</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                  <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body>
                {/* <ReactApexChart series={seriesFour} options={optionFour} type="bar" height={300} className="apex-chart-nine" /> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md="5" xl="4">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Analytics Performance</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                  <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body className="p-3">
                <h2 className="performance-value mb-0">9.8 <small className="text-success d-flex align-items-center"><i className="ri-arrow-up-line"></i> 2.8%</small></h2>

                <label className="card-title fs-sm fw-medium">Performance Score</label>

                <ProgressBar className="progress-one ht-8 mt-2 mb-4">
                  <ProgressBar now={50} />
                  <ProgressBar now={25} variant="success" />
                  <ProgressBar now={5} variant="orange" />
                  <ProgressBar now={5} variant="pink" />
                  <ProgressBar now={10} variant="info" />
                  <ProgressBar now={5} variant="indigo" />
                </ProgressBar>

                <Table className="table-three">
                  <tbody>
                    {[
                      {
                        "dot": "primary",
                        "label": "Excellent",
                        "count": "3,007",
                        "percent": "50"
                      }, {
                        "dot": "success",
                        "label": "Very Good",
                        "count": "1,674",
                        "percent": "25"
                      }, {
                        "dot": "orange",
                        "label": "Good",
                        "count": "125",
                        "percent": "6"
                      }, {
                        "dot": "pink",
                        "label": "Fair",
                        "count": "98",
                        "percent": "5"
                      }, {
                        "dot": "info",
                        "label": "Poor",
                        "count": "512",
                        "percent": "10"
                      }, {
                        "dot": "indigo",
                        "label": "Very Poor",
                        "count": "81",
                        "percent": "4"
                      }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td><div className={"badge-dot bg-" + item.dot}></div></td>
                        <td>{item.label}</td>
                        <td>{item.count}</td>
                        <td>{item.percent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Acquisition</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                  <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body>
                <p className="fs-sm mb-4">Tells you where your visitors originated from, such as search engines, social networks or website referrals. <Link to="">Learn more</Link></p>

                <Row className="mb-2">
                  <Col>
                    <div className="d-flex align-items-center">
                      <div className="card-icon bg-primary"><i className="ri-line-chart-fill"></i></div>
                      <div className="ms-2">
                        <h4 className="card-value mb-1">33.50%</h4>
                        <span className="d-block fs-sm fw-medium">Bounce Rate</span>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex align-items-center">
                      <div className="card-icon bg-ui-02"><i className="ri-line-chart-fill"></i></div>
                      <div className="ms-2">
                        <h4 className="card-value mb-1">9,065</h4>
                        <span className="d-block fs-sm fw-medium">Page Sessions</span>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* <ReactApexChart series={seriesFive} options={optionFive} type="area" height={140} className="apex-chart-nine" /> */}
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Browser Used By Users</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                  <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Table className="table-one" responsive>
                  <thead>
                    <tr>
                      <th>Browser</th>
                      <th>Bounce Rate</th>
                      <th>Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        "icon": "ri-chrome-line",
                        "name": "Google Chrome",
                        "bounce": "40.95%",
                        "conversion": "19.45%"
                      }, {
                        "icon": "ri-firefox-line",
                        "name": "Mozilla Firefox",
                        "bounce": "47.58%",
                        "conversion": "19.99%"
                      }, {
                        "icon": "ri-safari-line",
                        "name": "Apple Safari",
                        "bounce": "56.50%",
                        "conversion": "11.00%"
                      }, {
                        "icon": "ri-edge-line",
                        "name": "Microsoft Edge",
                        "bounce": "59.62%",
                        "conversion": "4.46%"
                      }, {
                        "icon": "ri-opera-line",
                        "name": "Opera",
                        "bounce": "52.50%",
                        "conversion": "8.75%"
                      }, {
                        "icon": "ri-ie-line",
                        "name": "Internet Explorer",
                        "bounce": "44.95%",
                        "conversion": "8.12%"
                      }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center fw-medium">
                            <i className={item.icon + " fs-24 lh-1 me-2"}></i> {item.name}
                          </div>
                        </td>
                        <td>{item.bounce}</td>
                        <td>{item.conversion}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12">
            <Card className="card-one">
              <Card.Header>
                <Card.Title as="h6">Sessions By Location</Card.Title>
                <Nav className="nav-icon nav-icon-sm ms-auto">
                  <Nav.Link href=""><i className="ri-refresh-line"></i></Nav.Link>
                  <Nav.Link href=""><i className="ri-more-2-fill"></i></Nav.Link>
                </Nav>
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="align-items-center g-3">
                  <Col md="4" className="d-flex flex-column justify-content-center">
                    <Table className="table-one mb-4">
                      <thead>
                        <tr>
                          <th className="wd-40 pt-0">Your Top Countries</th>
                          <th className="wd-60 pt-0">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            "bg": "twitter",
                            "country": "United States",
                            "amount": "$150,200.80"
                          }, {
                            "bg": "primary",
                            "country": "India",
                            "amount": "$138,910.20"
                          }, {
                            "bg": "teal",
                            "country": "Australia",
                            "amount": "$132,050.00"
                          }, {
                            "bg": "danger",
                            "country": "China",
                            "amount": "$127,762.10"
                          }, {
                            "bg": "orange",
                            "country": "Brazil",
                            "amount": "$117,087.50"
                          }, {
                            "bg": "info",
                            "country": "Japan",
                            "amount": "$102,994.27"
                          }, {
                            "bg": "warning",
                            "country": "Saudi Arabia",
                            "amount": "$99,687.21"
                          }
                        ].map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span className={"badge-dot me-2 bg-" + item.bg}></span> <span className="fw-medium">{item.country}</span>
                            </td>
                            <td>{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <Button variant="white" className="btn-sm">Show Full Report</Button>
                  </Col>
              
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="card-one mt-3">
          <Card.Body>
            <Table className="table-four table-bordered">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  {/* <th colSpan="3">Acquisition</th>
                  <th colSpan="3">Behavior</th>
                  <th colSpan="3">Conversions</th> */}
                </tr>
                <tr>
                  <th>Source</th>
                  <th>Users</th>
                  <th>New Users</th>
                  <th>Sessions</th>
                  <th>Bounce Rate</th>
                  <th>Pages/Session</th>
                  <th>Avg. Session</th>
                  <th>Transactions</th>
                  <th>Revenue</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    "source": "Organic search",
                    "users": "350",
                    "new": "22",
                    "sessions": "5,628",
                    "bounce": "25.60%",
                    "pages": "1.92",
                    "avg": "00:01:05",
                    "trans": "340,103",
                    "revenue": "$2.65M",
                    "rate": "4.50%"
                  }, {
                    "source": "Social media",
                    "users": "276",
                    "new": "18",
                    "sessions": "5,100",
                    "bounce": "23.66%",
                    "pages": "1.89",
                    "avg": "00:01:03",
                    "trans": "321,960",
                    "revenue": "$2.51M",
                    "rate": "4.36%"
                  }, {
                    "source": "Referral",
                    "users": "246",
                    "new": "17",
                    "sessions": "4,880",
                    "bounce": "26.22%",
                    "pages": "1.78",
                    "avg": "00:01:09",
                    "trans": "302,767",
                    "revenue": "$2.1M",
                    "rate": "4.34%"
                  }, {
                    "source": "Email",
                    "users": "187",
                    "new": "14",
                    "sessions": "4,450",
                    "bounce": "24.97%",
                    "pages": "1.35",
                    "avg": "00:02:07",
                    "trans": "279,300",
                    "revenue": "$1.86M",
                    "rate": "3.99%"
                  }, {
                    "source": "Other",
                    "users": "125",
                    "new": "13",
                    "sessions": "3,300",
                    "bounce": "21.67%",
                    "pages": "1.14",
                    "avg": "00:02:01",
                    "trans": "240,200",
                    "revenue": "$1.51M",
                    "rate": "2.84%"
                  }
                ].map((item, index) => (
                  <tr key={index}>
                    <td><Link to="">{item.source}</Link></td>
                    <td>350</td>
                    <td>22</td>
                    <td>5,628</td>
                    <td>25.60%</td>
                    <td>1.92</td>
                    <td>00:01:05</td>
                    <td>340,103</td>
                    <td>$2.65M</td>
                    <td>4.50%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

      
      </div>
    </React.Fragment>
  )
}