import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./src/pages/Login";
import { CurrentUserProvider } from "./src/contexts/CurrentUserContext";
import { SocketProvider } from "./src/contexts/SocketContext";

const element = document.getElementById("chat");

const root = ReactDOM.createRoot(element);

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chats",
    element: <App />,
  },
]);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <SocketProvider>
      <CurrentUserProvider>
        <RouterProvider router={routerProvider} />
      </CurrentUserProvider>
    </SocketProvider>
  </QueryClientProvider>
);
