enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

interface User {
  username: string;
  role: UserRole;
  getPermissions(): string[];
}

class AdminUser implements User {
  username: string;
  role: UserRole = UserRole.Admin;

  constructor(username: string) {
    this.username = username;
  }

  getPermissions(): string[] {
    return ['READ', 'WRITE', 'DELETE'];
  }
}

class NormalUser implements User {
  username: string;
  role: UserRole = UserRole.User;

  constructor(username: string) {
    this.username = username;
  }

  getPermissions(): string[] {
    return ['READ'];
  }
}

class UserFactory {
  static createUser(role: UserRole, username: string): User {
    if (role === 'Admin') {
      return new AdminUser(username);
    } else if (role === 'User') {
      return new NormalUser(username);
    } else {
      throw new Error('Invalid user role');
    }
  }
}
