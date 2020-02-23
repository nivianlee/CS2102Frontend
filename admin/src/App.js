import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./pages/users";
import Dashboard from "./Dashboard";
import { PostList, PostEdit, PostCreate } from "./pages/posts";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="users" icon={UserIcon} list={UserList} />
    <Resource
      name="posts"
      icon={PostIcon}
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
  </Admin>
);

export default App;
