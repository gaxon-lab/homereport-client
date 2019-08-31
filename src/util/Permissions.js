class Permissions {
  static permissions = [];

  static setPermissions(userPermission) {
    this.permissions = userPermission;
  }

  static canManageStaff = () => {
      return this.permissions.filter((key) => key.name === "can manage staff").length > 0
  };

  static canManageRolesPermissions = () => {
      return this.permissions.filter((key) => key.name === "can manage roles & permissions").length > 0
  };

  static canAccessCustomers = () => {
    return this.permissions.filter((key) => key.name === "can access all customers").length > 0
  };

  static canAccessDashboard = () => {
    return this.permissions.filter((key) => key.name === "can access dashboard").length > 0
  };

  static canAccessAssignedProjects = () => {
    return this.permissions.filter((key) => key.name === "can access only assigned reports").length > 0
  };
}


export default Permissions;
