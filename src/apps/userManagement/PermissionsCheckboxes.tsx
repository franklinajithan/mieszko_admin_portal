import React, { useState } from 'react';

export interface PermissionData {
    status: string;
    message: string;
    data: PermissionGroup[];
}

export interface PermissionGroup {
    permissionGroup: {
        groupName: string;
        labelName: string;
        permissionGroupId: number;
    };
    permissions: Permission[];
}

export interface Permission {
    permissionId: number;
    permissionName: string;
    labelName: string;
    fields: Field[] | null;
}

export interface Field {
    fieldId: number;
    fieldName: string;
    labelName: string;
}

const PermissionsCheckboxes: React.FC<{ permissionData: PermissionGroup[] }> = ({ permissionData }) => {
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (permissionId: number, fieldId?: number) => {
        const key = fieldId !== undefined ? `${permissionId}-${fieldId}` : `${permissionId}-main`;
        setSelectedPermissions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSelectAllChange = (permissionId: number, isChecked: boolean) => {
        const newSelectedPermissions = { ...selectedPermissions };

        // Select or deselect all fields for the given permission
        permissionData.forEach((group) => {
            group.permissions.forEach((permission) => {
                if (permission.permissionId === permissionId && permission.fields) {
                    permission.fields.forEach((field) => {
                        newSelectedPermissions[`${permissionId}-${field.fieldId}`] = isChecked;
                    });
                }
            });
        });

        // Also set the main permission checkbox state
        newSelectedPermissions[`${permissionId}-main`] = isChecked;
        setSelectedPermissions(newSelectedPermissions);
    };

    const handleSelectAllGroupChange = (groupId: number, isChecked: boolean) => {
        const newSelectedPermissions = { ...selectedPermissions };

        // Select or deselect all permissions in the given group
        permissionData.forEach((group) => {
            if (group.permissionGroup.permissionGroupId === groupId) {
                group.permissions.forEach((permission) => {
                    // Set main permission state
                    newSelectedPermissions[`${permission.permissionId}-main`] = isChecked;
                    if (permission.fields) {
                        permission.fields.forEach((field) => {
                            newSelectedPermissions[`${permission.permissionId}-${field.fieldId}`] = isChecked;
                        });
                    }
                });
            }
        });

        setSelectedPermissions(newSelectedPermissions);
    };

    return (
        <div className="space-y-4">
            {permissionData.map((group) => (
                <div key={group.permissionGroup.permissionGroupId} className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">{group.permissionGroup.labelName}</h2>
                    
                    {/* Select All checkbox for the permission group */}
                    <div className='flex items-center mb-4'>
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600"
                            checked={group.permissions.every(permission => !!selectedPermissions[`${permission.permissionId}-main`])}
                            onChange={(e) => handleSelectAllGroupChange(group.permissionGroup.permissionGroupId, e.target.checked)}
                        />
                        <span className="ml-2 text-md font-medium">Select All</span>
                    </div>
                    
                    {/* Display permissions in a single row if no fields are available */}
                    <div className={`grid ${group.permissions.every(permission => !permission.fields) ? 'grid-cols-4 gap-4' : 'grid-cols-1'}`}>
                        {group.permissions.map((permission) => (
                            <div key={permission.permissionId} className="mb-4">
                                <div className='flex items-center'>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                        checked={!!selectedPermissions[`${permission.permissionId}-main`]}
                                        onChange={(e) => handleSelectAllChange(permission.permissionId, e.target.checked)}
                                    />
                                    <h6 className="ml-2 text-md font-medium mb-2">{permission.labelName}</h6>
                                </div>
                                {permission.fields && permission.fields.length > 0 ? (
                                    <div className="grid grid-cols-8 gap-2">
                                        {permission.fields.map((field) => {
                                            const key = `${permission.permissionId}-${field.fieldId}`;
                                            return (
                                                <label key={field.fieldId} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600"
                                                        checked={!!selectedPermissions[key]}
                                                        onChange={() => handleCheckboxChange(permission.permissionId, field.fieldId)}
                                                    />
                                                    <span className="text-gray-700">{field.labelName}</span>
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
        </div>
    );
};

export default PermissionsCheckboxes;
