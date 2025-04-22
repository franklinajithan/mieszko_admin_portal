import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Types
export interface PermissionGroup {
  permissionGroup: {
    status: string;
    displayName: string;
    permissionGroupId: number;
  };
  permissions: Permission[];
}

export interface Permission {
  permissionId: number;
  permissionName: string;
  displayName: string;
  fields: Field[] | null;
  status: boolean;
}

export interface Field {
  fieldId: number;
  fieldName: string;
  displayName: string;
  status: boolean;
}

interface PermissionsCheckboxesProps {
  permissionData: PermissionGroup[];
  onSubmit: (updatedPermissions: PermissionGroup[]) => Promise<void>;
}

const PermissionsCheckboxes: React.FC<PermissionsCheckboxesProps> = ({
  permissionData,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: boolean;
  }>({});

  // Initialize selectedPermissions based on API data
  useEffect(() => {
    const initialPermissions: { [key: string]: boolean } = {};

    permissionData.forEach((group) => {
      group.permissions.forEach((permission) => {
        initialPermissions[`${permission.permissionId}-main`] = permission.status;

        if (permission.fields) {
          permission.fields.forEach((field) => {
            initialPermissions[`${permission.permissionId}-${field.fieldId}`] =
              field.status;
          });
        }
      });
    });

    setSelectedPermissions(initialPermissions);
  }, [permissionData]);

  const handleCheckboxChange = (permissionId: number, fieldId?: number) => {
    const key = fieldId !== undefined ? `${permissionId}-${fieldId}` : `${permissionId}-main`;
    setSelectedPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectAllChange = (permissionId: number, isChecked: boolean) => {
    const newSelectedPermissions = { ...selectedPermissions };

    permissionData.forEach((group) => {
      group.permissions.forEach((permission) => {
        if (permission.permissionId === permissionId && permission.fields) {
          permission.fields.forEach((field) => {
            newSelectedPermissions[`${permissionId}-${field.fieldId}`] = isChecked;
          });
        }
      });
    });

    newSelectedPermissions[`${permissionId}-main`] = isChecked;
    setSelectedPermissions(newSelectedPermissions);
  };

  const handleSelectAllGroupChange = (groupId: number, isChecked: boolean) => {
    const newSelectedPermissions = { ...selectedPermissions };

    permissionData.forEach((group) => {
      if (group.permissionGroup.permissionGroupId === groupId) {
        group.permissions.forEach((permission) => {
          newSelectedPermissions[`${permission.permissionId}-main`] = isChecked;
          if (permission.fields) {
            permission.fields.forEach((field) => {
              newSelectedPermissions[`${permission.permissionId}-${field.fieldId}`] =
                isChecked;
            });
          }
        });
      }
    });

    setSelectedPermissions(newSelectedPermissions);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const updatedPermissions: any = permissionData.map((group) => ({
      permissionGroup: {
        ...group.permissionGroup,
        status: group.permissions.every(
          (permission) => selectedPermissions[`${permission.permissionId}-main`]
        ),
      },
      permissions: group.permissions.map((permission) => ({
        ...permission,
        status: selectedPermissions[`${permission.permissionId}-main`] || false,
        fields: permission.fields
          ? permission.fields.map((field) => ({
              ...field,
              status: selectedPermissions[`${permission.permissionId}-${field.fieldId}`] || false,
            }))
          : null,
      })),
    }));

    try {
      await onSubmit(updatedPermissions);
    } catch (error) {
      console.error("Error updating permissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {permissionData.map((group) => (
        <div
          key={`group-${group.permissionGroup.permissionGroupId}`}
          className="p-4 border border-gray-300 rounded-lg"
        >
          <h2 className="text-lg font-semibold mb-2">
            {group.permissionGroup.displayName}
          </h2>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={group.permissions.every(
                (permission) => !!selectedPermissions[`${permission.permissionId}-main`]
              )}
              onChange={(e) =>
                handleSelectAllGroupChange(
                  group.permissionGroup.permissionGroupId,
                  e.target.checked
                )
              }
            />
            <span className="ml-2 text-md font-medium">Select All</span>
          </div>

          <div
            className={`grid ${
              group.permissions.every((permission) => !permission.fields)
                ? "grid-cols-4 gap-4"
                : "grid-cols-1"
            }`}
          >
            {group.permissions.map((permission) => (
              <div key={`permission-${permission.permissionId}`} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={!!selectedPermissions[`${permission.permissionId}-main`]}
                    onChange={(e) =>
                      handleSelectAllChange(permission.permissionId, e.target.checked)
                    }
                  />
                  <h6 className="ml-2 text-md font-bold  mb-1">{permission.displayName}</h6>
                </div>
                {permission.fields && permission.fields.length > 0 ? (
                  <div className="grid grid-cols-8 gap-2">
                    {permission.fields.map((field) => {
                      const key = `${permission.permissionId}-${field.fieldId}`;
                      return (
                        <label key={`field-${key}`} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600"
                            checked={!!selectedPermissions[key]}
                            onChange={() =>
                              handleCheckboxChange(permission.permissionId, field.fieldId)
                            }
                          />
                          <span className="text-gray-700">{field.displayName}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit} disabled={isLoading} className="btn-cyan">
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Updating...
            </>
          ) : (
            "Update Permissions"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PermissionsCheckboxes;
