import {
  BrowserRouter,
  Route,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../views/Home";
import { PublishersTable } from "../views/PublishingCompanies";
import { Rents } from "../views/Rents";
import { UsersTable } from "../views/Users";
import { Books } from "../views/Books";

import { BooksProvider } from '../contexts/BooksContext';
import { PublishersProvider } from '../contexts/PublishersContext';
import { RentsProvider } from '../contexts/RentsContext'
import { UserProvider } from '../contexts/UsersContext'

function Dashboard(){
    return (
      <>
        <Header />

        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<PublishersTable />} />
          <Route path="/books" element={<Books />} />
          <Route path="/rents" element={<Rents/>} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      </>
    );
}

export function Routes() {
  return (
    <UserProvider>
      <RentsProvider>
      <PublishersProvider>
      <BooksProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/*" element={<Dashboard />} />
          </Switch>
        </BrowserRouter>
      </BooksProvider>
    </PublishersProvider>
    </RentsProvider>
    </UserProvider>
    
    
  );
}
