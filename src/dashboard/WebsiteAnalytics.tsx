import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import { Button, Card, Col, Nav, OverlayTrigger, ProgressBar, Row, Table } from "react-bootstrap";
import { dp1, dp2 } from "../data/DashboardData";
import ReactApexChart from "react-apexcharts";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function WebsiteAnalytics({ title, icon }: any) {

  var data = [[0, 9], [1, 7], [2, 4], [3, 8], [4, 4], [5, 12], [6, 4], [7, 6], [8, 5], [9, 10], [10, 4], [11, 5], [12, 10], [13, 2], [14, 6]];
  const chartData = {
    labels: [
      "29-Oct-24", "25-Oct-24", "22-Oct-24", "18-Oct-24", "15-Oct-24",
      "11-Oct-24", "08-Oct-24", "04-Oct-24", "01-Oct-24", "27-Sep-24",
      "24-Sep-24", "20-Sep-24", "17-Sep-24", "13-Sep-24", "10-Sep-24",
      "06-Sep-24", "03-Sep-24", "30-Aug-24", "27-Aug-24", "23-Aug-24",
      "20-Aug-24", "16-Aug-24", "13-Aug-24", "09-Aug-24", "06-Aug-24",
      "02-Aug-24", "30-Jul-24", "26-Jul-24", "23-Jul-24", "19-Jul-24",
      "16-Jul-24", "12-Jul-24", "09-Jul-24", "05-Jul-24", "02-Jul-24",
      "28-Jun-24", "25-Jun-24", "21-Jun-24", "18-Jun-24", "14-Jun-24",
      "11-Jun-24", "07-Jun-24", "04-Jun-24", "31-May-24", "28-May-24",
      "24-May-24", "21-May-24", "17-May-24", "14-May-24", "10-May-24",
      "07-May-24", "03-May-24"
    ],
    datasets: [
      {
        label: "Ball 1",
        data: [1, 4, 3, 4, 2, 16, 7, 4, 8, 7, 18, 16, 20, 10, 6, 12, 7, 3, 1, 9, 7, 15, 15, 21, 1, 5, 9, 4, 4, 15, 2, 12, 6, 11, 2, 10, 14, 3, 3, 7, 15, 6, 4, 16, 9, 11, 18, 2, 13, 35],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Ball 2",
        data: [2, 17, 13, 15, 15, 23, 14, 8, 22, 20, 20, 25, 30, 15, 29, 14, 9, 24, 8, 15, 10, 17, 16, 23, 18, 7, 25, 19, 8, 22, 32, 18, 15, 13, 7, 16, 16, 4, 11, 15, 16, 7, 7, 18, 12, 13, 31, 8, 28, 36],
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Ball 3",
        data: [19, 20, 27, 23, 32, 32, 19, 16, 29, 21, 21, 29, 32, 17, 46, 34, 11, 27, 11, 24, 13, 29, 39, 25, 27, 12, 28, 23, 10, 35, 35, 24, 19, 29, 34, 18, 37, 7, 33, 34, 26, 9, 16, 35, 18, 14, 32, 17, 29, 41],
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Ball 4",
        data: [30, 25, 30, 30, 36, 46, 34, 17, 41, 27, 36, 34, 41, 31, 47, 41, 16, 33, 42, 47, 18, 45, 40, 33, 41, 33, 37, 35, 16, 44, 36, 25, 28, 31, 35, 22, 45, 11, 45, 45, 30, 14, 33, 36, 22, 34, 41, 28, 44, 42],
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Ball 5",
        data: [45, 45, 46, 39, 48, 49, 40, 20, 42, 38, 49, 37, 44, 42, 48, 47, 45, 42, 47, 50, 26, 49, 47, 44, 50, 46, 38, 37, 34, 48, 39, 39, 39, 47, 46, 35, 49, 17, 36, 48, 37, 43, 34, 41, 50, 48, 46, 35, 48, 45],
        borderColor: "rgba(255,206,86,1)",
        fill: false,
      },
      {
        label: "Lucky Star 1",
        data: [10, 8, 1, 1, 3, 4, 6, 1, 9, 5, 3, 3, 1, 4, 2, 3, 2, 4, 4, 8, 3, 1, 1, 4, 2, 3, 2, 4, 4, 6, 7, 8, 7, 1, 6, 1, 5, 3, 1, 7, 5, 3, 7, 6, 1, 7, 1, 7, 4, 6],
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
      {
        label: "Lucky Star 2",
        data: [12, 9, 2, 12, 9, 5, 8, 6, 11, 12, 5, 7, 10, 12, 9, 4, 5, 6, 11, 9, 12, 10, 6, 10, 12, 12, 8, 8, 8, 7, 8, 10, 11, 11, 8, 10, 7, 12, 12, 9, 8, 4, 8, 7, 3, 9, 10, 9, 12, 11],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };
  


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Lottery Balls and Lucky Stars",
      },
    },
  };

  const chart = {
    parentHeightOffset: 0,
    stacked: true,
    sparkline: {
      enabled: true
    }
  };

  const states = {
    hover: {
      filter: {
        type: 'none'
      }
    },
    active: {
      filter: {
        type: 'none'
      }
    }
  };

  const plotOptions = {
    bar: {
      columnWidth: '60%'
    },
  };

  const stroke = {
    curve: 'straight',
    lineCap: 'square'
  };

  const seriesOne = [{
    type: 'column',
    data: [[0, 0], [1, 0], [2, 5], [3, 10], [4, 6], [5, 10], [6, 15], [7, 18], [8, 7], [9, 11], [10, 13], [11, 15], [12, 13], [13, 7], [14, 5]]
  }, {
    type: 'column',
    data: data
  }];

  const optionOne = {
    chart: chart,
    states: states,
    colors: ['#506fd9', '#e5e9f2'],
    plotOptions: plotOptions,
    stroke: stroke,
    fill: { opacity: 1 },
    tooltip: { enabled: false }
  };

  const seriesTwo = [{
    type: 'column',
    data: [[0, 3], [1, 4], [2, 12], [3, 6], [4, 16], [5, 5], [6, 8], [7, 4], [8, 3], [9, 6], [10, 4], [11, 10], [12, 3], [13, 7], [14, 10]]
  }, {
    type: 'column',
    data: data
  }];

  const optionTwo = {
    chart: chart,
    states: states,
    colors: ['#85b6fe', '#e5e9f2'],
    plotOptions: plotOptions,
    stroke: stroke,
    fill: { opacity: 1 },
    tooltip: { enabled: false }
  };

  const seriesThree = [{
    type: 'column',
    data: [[0, 5], [1, 10], [2, 20], [3, 15], [4, 6], [5, 10], [6, 15], [7, 18], [8, 7], [9, 11], [10, 13], [11, 15], [12, 13], [13, 7], [14, 5]]
  }, {
    type: 'column',
    data: data
  }];

  const optionThree = {
    chart: chart,
    states: states,
    colors: ['#0dcaf0', '#e5e9f2'],
    plotOptions: plotOptions,
    stroke: stroke,
    fill: { opacity: 1 },
    tooltip: { enabled: false }
  };

  const seriesFour = [{
    data: [[0, 1000], [1, 600], [2, 500], [3, 400], [4, 600], [5, 500], [6, 800], [7, 1000], [8, 900], [9, 1100], [10, 1500], [11, 1700], [12, 1400], [13, 1300], [14, 1500], [15, 1300], [16, 1200], [17, 1000], [18, 1100], [19, 800], [20, 500], [21, 300], [22, 500], [23, 600], [24, 500], [25, 600], [26, 800], [27, 1000], [28, 900], [29, 800], [30, 500]]
  }, {
    data: [[0, 30], [1, 30], [2, 30], [3, 30], [4, 30], [5, 30], [6, 30], [7, 30], [8, 30], [9, 30], [10, 30], [11, 30], [12, 30], [13, 30], [14, 30], [15, 30], [16, 30], [17, 30], [18, 30], [19, 30], [20, 30], [21, 30], [22, 30], [23, 30], [24, 30], [25, 30], [26, 30], [27, 30], [28, 30], [29, 30], [30, 30]]
  }, {
    data: [[0, 800], [1, 600], [2, 500], [3, 400], [4, 600], [5, 500], [6, 800], [7, 1000], [8, 900], [9, 1100], [10, 1500], [11, 1700], [12, 1400], [13, 1300], [14, 1500], [15, 1300], [16, 1200], [17, 1000], [18, 1100], [19, 800], [20, 500], [21, 300], [22, 500], [23, 600], [24, 500], [25, 600], [26, 800], [27, 1000], [28, 900], [29, 800], [30, 500]]
  }];

  const optionFour = {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      toolbar: { show: false }
    },
    grid: {
      borderColor: 'rgba(72,94,144, 0.07)',
      padding: {
        top: -20,
        left: 5
      }
    },
    states: states,
    colors: ['#506fd9', '#fff', '#85b6fe'],
    plotOptions: {
      bar: { columnWidth: '35%' },
    },
    stroke: {
      curve: 'straight',
      lineCap: 'square',
      width: 0
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 6,
      decimalsInFloat: 0,
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      max: 4000,
      tickAmount: 8,
      labels: {
        style: {
          colors: ['#a2abb5'],
          fontSize: '11px'
        }
      }
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    fill: { opacity: 1 },
    legend: { show: false }
  };

  const seriesFive = [{
    name: 'Growth',
    data: dp1
  }, {
    name: 'Actual',
    data: dp2
  }];

  const optionFive = {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#9dc3fc', '#506fd9'],
    dataLabels: { enabled: false },
    grid: {
      borderColor: 'rgba(72,94,144, 0.07)',
      padding: {
        top: -20,
        bottom: 0,
        left: 20
      },
      yaxis: {
        lines: { show: false }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 1.5
    },
    fill: {
      colors: ['#fff', '#81adee'],
      type: ['solid', 'gradient'],
      opacity: 1,
      gradient: {
        opacityFrom: 0.35,
        opacityTo: 0.65,
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    yaxis: {
      max: 200,
      tickAmount: 6,
      show: false
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 11,
      labels: {
        style: {
          colors: '#6e7985',
          fontSize: '11px'
        }
      },
      axisBorder: { show: false }
    }
  };

  const regStyle = {
    selected: {
      fill: "#506fd9"
    },
    initial: {
      fill: "#d9dde7"
    }
  };

  const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
  const [skin, setSkin] = useState(currentSkin);

  const switchSkin = (skin:any) => {
    if (skin === 'dark') {
      const btnWhite = document.getElementsByClassName('btn-white');

    //   for (const btn of btnWhite) {
    //     btn.classList.add('btn-outline-primary');
    //     btn.classList.remove('btn-white');
    //   }
    // } else {
    //   const btnOutlinePrimary = document.getElementsByClassName('btn-outline-primary');

    //   for (const btn of btnOutlinePrimary) {
    //     btn.classList.remove('btn-outline-primary');
    //     btn.classList.add('btn-white');
    //   }
     }
  };

  switchSkin(skin);

  useEffect(() => {
    switchSkin(skin);
  }, [skin]);

  return (
    <React.Fragment>
 
      <div className="main main-app p-lg-1">

        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              {/* <li className="breadcrumb-item"><Link href="#">Dashboard</Link></li> */}
              <li className="breadcrumb-item active" aria-current="page">Website Analytics</li>
            </ol>
            <h4 className="main-title mb-0">Welcome to Dashboard</h4>
          </div>

          
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
                  <Col md="8" className="mt-5 mt-md-0">
                    {/* <VectorMap map={worldMill} backgroundColor={(skin === "dark") ? "#192030" : "#fff"} regionStyle={regStyle} selectedRegions={["US", "IN", "AU", "BR", "CN", "JP", "SA"]} className="vmap-one" /> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="card-one mt-3">
          <Card.Body>
          <Line data={chartData} options={options} />
          </Card.Body>
        </Card>

        <Footer />
      </div>
    </React.Fragment>
  )
}