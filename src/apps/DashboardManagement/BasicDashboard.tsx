import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
const stats = [
  { title: "Total Sales", value: "$12,345", icon: <DollarSign className="w-6 h-6 text-blue-500" /> },
  { title: "Orders", value: "345", icon: <ShoppingCart className="w-6 h-6 text-green-500" /> },
  { title: "Customers", value: "1,234", icon: <Users className="w-6 h-6 text-red-500" /> },
  { title: "Products", value: "567", icon: <Package className="w-6 h-6 text-yellow-500" /> },
];

const data = [
  { name: "Jan", sales: 4000, profit: 1500, revenue: 5000 },
  { name: "Feb", sales: 3000, profit: 1200, revenue: 4500 },
  { name: "Mar", sales: 5000, profit: 2100, revenue: 6000 },
  { name: "Apr", sales: 7000, profit: 2800, revenue: 7500 },
];

const posData = [
  { status: "Till01", cashSales: "£0", cardSales: "£0", voidLines: 0, inDrawer: "£0", normalSales: "£0", totalSales: "£0" },
  { status: "Till02", cashSales: "£0", cardSales: "£0", voidLines: 0, inDrawer: "£0", normalSales: "£0", totalSales: "£0" },
  { status: "Till03", cashSales: "£0", cardSales: "£0", voidLines: 0, inDrawer: "£0", normalSales: "£0", totalSales: "£0" },
  { status: "Till04", cashSales: "£0", cardSales: "£0", voidLines: 0, inDrawer: "£0", normalSales: "£0", totalSales: "£0" },
];

const dailySalesData = [
  { day: "Mon", sales: 1500 },
  { day: "Tue", sales: 1800 },
  { day: "Wed", sales: 1200 },
  { day: "Thu", sales: 2200 },
  { day: "Fri", sales: 2600 },
  { day: "Sat", sales: 3000 },
  { day: "Sun", sales: 2800 },
];

const topSellingData = [
  { description: "12G PACZEK Z ROZA I LUKREM", ean: "60030", qty7: 653, profit7: "£437.51", qtyDaily: 653, profitDaily: "£437.51" },
  { description: "BIG HOT DOG", ean: "1755", qty7: 180, profit7: "£180.00", qtyDaily: 25.714, profitDaily: "£25.71" },
  { description: "KARKOWKA WIEPRZOWA", ean: "10000", qty7: 65.398, profit7: "£149.76", qtyDaily: 9.342, profitDaily: "£21.39" },
];

const worstSellingData = [
  { description: "Winiary Majonez 700ml", ean: "5900805011029", qty7: 13, profit7: "-£11.70", qtyDaily: 4.333, profitDaily: "-£3.90" },
  { description: "JACOBS KRONUNG MIEL. 500G", ean: "8711000517604", qty7: 2, profit7: "-£4.06", qtyDaily: 1, profitDaily: "-£2.03" },
  { description: "ANIEMX HAMBURGER DROBIOWY 250G", ean: "5900751002238", qty7: 1, profit7: "-£0.23", qtyDaily: 1, profitDaily: "-£0.23" },
];

const BasicDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold mb-5">Retail ERP Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">
              <Button variant="ghost">Dashboard</Button>
            </li>
            <li className="mb-3">
              <Button variant="ghost">Orders</Button>
            </li>
            <li className="mb-3">
              <Button variant="ghost">Customers</Button>
            </li>
            <li className="mb-3">
              <Button variant="ghost">Products</Button>
            </li>
            <li className="mb-3">
              <Button variant="ghost">Reports</Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Retail ERP Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg p-4">
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                {stat.icon}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3 text-white">
              <CardTitle>POS Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-3 font-semibold">Total Sales: £0.00 / Baskets: 0 | Avg. Basket Value: £0.00</div>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Cash Sales</th>
                      <th className="border px-4 py-2">Card Sales</th>
                      <th className="border px-4 py-2">Void Lines</th>
                      <th className="border px-4 py-2">In Drawer</th>
                      <th className="border px-4 py-2">Normal Sales</th>
                      <th className="border px-4 py-2">Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posData.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2 flex items-center justify-center gap-2">
                          <span className="w-3 h-3 bg-yellow-500 inline-block rounded-full"></span>
                          {item.status}
                        </td>
                        <td className="border px-4 py-2">{item.cashSales}</td>
                        <td className="border px-4 py-2">{item.cardSales}</td>
                        <td className="border px-4 py-2">{item.voidLines}</td>
                        <td className="border px-4 py-2">{item.inDrawer}</td>
                        <td className="border px-4 py-2">{item.normalSales}</td>
                        <td className="border px-4 py-2">{item.totalSales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Daily Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#4A90E2" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Sales vs Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#4A90E2" />
                  <Bar dataKey="profit" fill="#F5A623" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Worst Selling Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>EAN</TableHead>
                    <TableHead>Last 7 Days (Qty / Profit)</TableHead>
                    <TableHead>Avg Daily (Qty / Profit)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {worstSellingData.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-blue-600 underline cursor-pointer">{item.description}</TableCell>
                      <TableCell>{item.ean}</TableCell>
                      <TableCell>
                        {item.qty7} / {item.profit7}
                      </TableCell>
                      <TableCell>
                        {item.qtyDaily} / {item.profitDaily}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>EAN</TableHead>
                    <TableHead>Last 7 Days (Qty / Profit)</TableHead>
                    <TableHead>Avg Daily (Qty / Profit)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingData.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-blue-600 underline cursor-pointer">{item.description}</TableCell>
                      <TableCell>{item.ean}</TableCell>
                      <TableCell>
                        {item.qty7} / {item.profit7}
                      </TableCell>
                      <TableCell>
                        {item.qtyDaily} / {item.profitDaily}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#4A90E2" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Sales Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={data} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={100} data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar name="Sales" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-cyan-800 p-2 rounded mb-3">
              <CardTitle className="text-white">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BasicDashboard;
