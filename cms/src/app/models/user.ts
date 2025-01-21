export enum Privlidges {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
}

interface UserInterface {
  username: string;
}

export class Admin {
  teamPrivlidges: Privlidges[];
  customerPrivlidges: Privlidges[];

  constructor(teamPrivlidges: Privlidges[], customerPrivlidges: Privlidges[]) {
    this.teamPrivlidges = teamPrivlidges;
    this.customerPrivlidges = customerPrivlidges;
  }
}

export class User implements UserInterface {
  username: string;
  admin?: Admin;

  constructor(username: string, admin?: Admin) {
    this.username = username;
    this.admin = admin;
  }
}
