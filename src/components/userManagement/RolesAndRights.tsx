import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShield } from "react-icons/fi";
import { Card, Nav } from "react-bootstrap";
import Header from "../../layouts/Header";
import HeaderComponents from "@/elements/HeaderSection";

type PermissionActions = {
  add: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
};

type Permissions = {
  [key: string]: PermissionActions;
};

const PermissionSection: React.FC<{
  title: string;
  permissions: Permissions;
  onChange: (key: string, action: keyof PermissionActions) => void;
}> = ({ title, permissions, onChange }) => (
  <div>
    <h6 className="mb-2 mt-2 font-bold">{title}</h6>
    {Object.entries(permissions).map(([key, value]) => (
      <div key={key} className="flex items-center justify-between mb-2">
        <div className="w-1/4">{key}</div>
        <div className="flex w-3/4 space-x-4">
          {Object.keys(value).map((action) => (
            <label key={action} className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-red-600"
                checked={value[action as keyof PermissionActions]}
                onChange={() => onChange(key, action as keyof PermissionActions)}
              />
              <span className="ml-2 capitalize">{action}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
);

interface PermissionsPanelProps {
  permissions: { name: string; checked: boolean }[];
  onPermissionChange: (name: string) => void;
}

const PermissionsPanel: React.FC<PermissionsPanelProps> = ({
  permissions,
  onPermissionChange,
}) => (
  <div>
    <h6 className="mb-2 mt-2 font-bold">TILL - General</h6>
    <div className="grid grid-cols-2 gap-1 mt-1">
      {permissions.slice(0, 8).map((permission) => (
        <div key={permission.name}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={permission.checked}
              onChange={() => onPermissionChange(permission.name)}
              className="mr-2"
            />
            {permission.name}
          </label>
        </div>
      ))}
    </div>

    <h6 className="mb-2 mt-2 font-bold">Price Override</h6>
    <div className="grid grid-cols-2 gap-1 mt-1">
      {permissions.slice(8).map((permission) => (
        <div key={permission.name}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={permission.checked}
              onChange={() => onPermissionChange(permission.name)}
              className="mr-2"
            />
            {permission.name}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const RolesAndRights: React.FC = () => {
  const initialPermissions = [
    { name: "Testing Mode", checked: true },
    { name: "Training Mode", checked: true },
    { name: "Exit", checked: true },
    { name: "Shutdown", checked: false },
    { name: "Restart", checked: false },
    { name: "Restriction", checked: false },
    { name: "Quantity Restriction", checked: true },
    { name: "Override Auto Lock", checked: false },
    { name: "Void Tobacco Item", checked: false },
    { name: "Add Max Item", checked: false },
    { name: "Add Max Line Percentage", checked: false },
    { name: "Add Max Percentage", checked: false },
    { name: "Add Max Line Amount", checked: false },
    { name: "Add Max Amount", checked: false },
  ];

  const { t } = useTranslation("global");
  const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
  const [skin, setSkin] = useState(currentSkin);
  const [masterDataPermissions, setMasterDataPermissions] = useState<Permissions>({
    "Manage Store": { add: true, view: true, edit: true, delete: false },
    "Manage Supplier": { add: false, view: false, edit: false, delete: true },
    "Manage Item": { add: true, view: true, edit: false, delete: false },
    "Manage Customer": { add: true, view: true, edit: false, delete: false },
  });
  const [supplierItemPermissions, setSupplierItemPermissions] = useState<Permissions>({
    "Store Item Management": { add: true, view: true, edit: true, delete: false },
    "Supplier Item Management": { add: false, view: false, edit: false, delete: true },
    "Supplier Item Import": { add: true, view: true, edit: false, delete: false },
  });
  const [purchasePlanningPermissions, setPurchasePlanningPermissions] = useState<Permissions>({
    "Purchase Planning": { add: true, view: true, edit: true, delete: false },
    "Supplier Purchase Order": { add: false, view: false, edit: false, delete: true },
    "Managing Purchase Return": { add: true, view: true, edit: false, delete: false },
  });
  const [ediInvoicePermissions, setEDIInvoicePermissions] = useState<Permissions>({
    "Verify EDI Invoice": { add: true, view: true, edit: true, delete: false },
    "Create Delivery Load List": { add: false, view: false, edit: false, delete: true },
  });
  const [storeOperationPermissions, setStoreOperationPermissions] = useState<Permissions>({
    "Paid Out Request": { add: true, view: true, edit: true, delete: false },
    "Stock Take": { add: false, view: false, edit: false, delete: true },
    "Fill Scan List": { add: false, view: false, edit: false, delete: true },
    "Gap Scan List": { add: false, view: false, edit: false, delete: true },
    "Reduce to Clear List": { add: false, view: false, edit: false, delete: true },
    "Wastage List": { add: false, view: false, edit: false, delete: true },
    "Specail Order Creation": { add: false, view: false, edit: false, delete: true },
  });

  const [permissions, setPermissions] = useState(initialPermissions);

  // Generic handler for permission checkboxes
  const handlePermissionChange =
    (permissionsSetter: React.Dispatch<React.SetStateAction<Permissions>>) =>
    (key: string, action: keyof PermissionActions) => {
      permissionsSetter((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [action]: !prevState[key][action], // Toggle the value of the checkbox
        },
      }));
    };

  const handleFunctionalPermissionChange = (name: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.name === name
          ? { ...permission, checked: !permission.checked }
          : permission
      )
    );
  };

  const handleMasterDataChange = handlePermissionChange(setMasterDataPermissions);
  const handleSupplierItemChange = handlePermissionChange(setSupplierItemPermissions);
  const handlePurchasePlanningChange = handlePermissionChange(setPurchasePlanningPermissions);
  const handleEDIInvoiceChange = handlePermissionChange(setEDIInvoicePermissions);
  const handleStoreOperationChange = handlePermissionChange(setStoreOperationPermissions);

  const [showList, setShowList] = useState({
    title: "Roles and Rights",
    search: true,
    new: true,
    delete: true,
    download: true,
    bookmark: true,
    setting: true,
    filter: true,
  });

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-gray-50">
          <HeaderComponents showList={showList} icon={FiShield} />

          <Card className="card-one mt-2">
            <Card.Header>
              <Card.Title as="h6">Add New Roles</Card.Title>
              <Nav className="nav-icon nav-icon-sm ms-auto">
                <Nav.Link href="">
                  <i className="ri-refresh-line"></i>
                </Nav.Link>
                <Nav.Link href="">
                  <i className="ri-more-2-fill"></i>
                </Nav.Link>
              </Nav>
            </Card.Header>
            <Card.Body className="pb-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  "Role Name",
                  "Role Type",
                  "Reporting to Hierarchy",
                  "Module",
                  "Created Date",
                  "Active",
                  "Last Updated",
                  "User Name",
                  "Reporting Person",
                ].map((label, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select</option>
                    </select>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700">User Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter User Name"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="card-one mt-2">
            <Card.Header>
              <Card.Title as="h6">Role Rights</Card.Title>
              <Nav className="nav-icon nav-icon-sm ms-auto">
                <Nav.Link href="#">
                  <i className="ri-refresh-line text-black text-6xl"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="ri-more-2-fill text-black text-6xl"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="ri-arrow-down-s-line text-black text-6xl"></i>
                </Nav.Link>
              </Nav>
            </Card.Header>
            <Card.Body>
              <PermissionSection
                title="Master Data Management"
                permissions={masterDataPermissions}
                onChange={handleMasterDataChange}
              />
              <PermissionSection
                title="Supplier Item Management"
                permissions={supplierItemPermissions}
                onChange={handleSupplierItemChange}
              />
              <PermissionSection
                title="Purchase Planning"
                permissions={purchasePlanningPermissions}
                onChange={handlePurchasePlanningChange}
              />
              <PermissionSection
                title="EDI Invoice"
                permissions={ediInvoicePermissions}
                onChange={handleEDIInvoiceChange}
              />
              <PermissionSection
                title="Store Operation"
                permissions={storeOperationPermissions}
                onChange={handleStoreOperationChange}
              />
            </Card.Body>
          </Card>

          <Card className="card-one mt-2">
            <Card.Header>
              <Card.Title as="h6">Functional Rights</Card.Title>
              <Nav className="nav-icon nav-icon-sm ms-auto">
                <Nav.Link href="#">
                  <i className="ri-refresh-line text-black text-6xl"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="ri-more-2-fill text-black text-6xl"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="ri-arrow-down-s-line text-black text-6xl"></i>
                </Nav.Link>
              </Nav>
            </Card.Header>
            <Card.Body>
              <div>
                <PermissionsPanel
                  permissions={permissions}
                  onPermissionChange={handleFunctionalPermissionChange}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RolesAndRights;
