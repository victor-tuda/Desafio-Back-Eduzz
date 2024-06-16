export interface Account {
  id: string;
  name: string;
  balance: string;
  email: string;
  password?: string;
}

export interface AccountDeposit {
  new_balance: {
    id: string;
    name: string;
    email: string;
    balance: string;
  };
}
